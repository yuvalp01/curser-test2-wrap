import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Relationship } from "@/lib/types";

export async function GET() {
  try {
    const relationships = await prisma.$queryRaw<Relationship[]>`
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
    `;

    return NextResponse.json({ relationships }, { status: 200 });
  } catch (error) {
    console.error("Error fetching relationship metadata:", error);
    return NextResponse.json(
      { error: "Failed to fetch relationship metadata" },
      { status: 500 }
    );
  }
}
