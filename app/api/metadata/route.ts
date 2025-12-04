import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Column, Relationship, TableInfo, DatabaseMetadata } from "@/lib/types";

export async function GET() {
  try {
    // Fetch columns and relationships in parallel
    const [columnsResult, relationshipsResult] = await Promise.all([
      prisma.$queryRaw<Column[]>`
        SELECT
          TABLE_SCHEMA,
          TABLE_NAME,
          COLUMN_NAME,
          DATA_TYPE,
          IS_NULLABLE,
          CHARACTER_MAXIMUM_LENGTH
        FROM
          INFORMATION_SCHEMA.COLUMNS
        WHERE
          TABLE_SCHEMA NOT IN ('sys')
          AND TABLE_NAME NOT IN ('accountTypes')
        ORDER BY
          TABLE_SCHEMA, TABLE_NAME, ORDINAL_POSITION
      `,
      prisma.$queryRaw<Relationship[]>`
        SELECT
          fk.name AS ForeignKeyName,
          s1.name AS ParentSchema,
          tp.name AS ParentTable,
          cp.name AS ParentColumn,
          s2.name AS ReferencedSchema,
          tr.name AS ReferencedTable,
          cr.name AS ReferencedColumn
        FROM
          sys.foreign_keys fk
        INNER JOIN
          sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
        INNER JOIN
          sys.tables tp ON fkc.parent_object_id = tp.object_id
        INNER JOIN
          sys.schemas s1 ON tp.schema_id = s1.schema_id
        INNER JOIN
          sys.columns cp ON fkc.parent_object_id = cp.object_id AND fkc.parent_column_id = cp.column_id
        INNER JOIN
          sys.tables tr ON fkc.referenced_object_id = tr.object_id
        INNER JOIN
          sys.schemas s2 ON tr.schema_id = s2.schema_id
        INNER JOIN
          sys.columns cr ON fkc.referenced_object_id = cr.object_id AND fkc.referenced_column_id = cr.column_id
        ORDER BY
          s1.name, tp.name, fk.name
      `,
    ]);

    // Group columns by table
    const tablesMap = new Map<string, TableInfo>();
    const schemasSet = new Set<string>();

    columnsResult.forEach((column) => {
      const key = `${column.TABLE_SCHEMA}.${column.TABLE_NAME}`;
      schemasSet.add(column.TABLE_SCHEMA);

      if (!tablesMap.has(key)) {
        tablesMap.set(key, {
          schema: column.TABLE_SCHEMA,
          name: column.TABLE_NAME,
          columns: [],
          relationships: {
            outgoing: [],
            incoming: [],
          },
        });
      }

      tablesMap.get(key)!.columns.push(column);
    });

    // Add relationships
    relationshipsResult.forEach((rel) => {
      const parentKey = `${rel.ParentSchema}.${rel.ParentTable}`;
      const referencedKey = `${rel.ReferencedSchema}.${rel.ReferencedTable}`;

      if (tablesMap.has(parentKey)) {
        tablesMap.get(parentKey)!.relationships.outgoing.push(rel);
      }

      if (tablesMap.has(referencedKey)) {
        tablesMap.get(referencedKey)!.relationships.incoming.push(rel);
      }
    });

    const metadata: DatabaseMetadata = {
      tables: Array.from(tablesMap.values()),
      schemas: Array.from(schemasSet).sort(),
    };

    return NextResponse.json(metadata, { status: 200 });
  } catch (error) {
    console.error("Error fetching database metadata:", error);
    return NextResponse.json(
      { error: "Failed to fetch database metadata" },
      { status: 500 }
    );
  }
}
