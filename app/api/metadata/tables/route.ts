import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Column } from "@/lib/types";

export async function GET() {
  try {
    const columns = await prisma.$queryRaw<Column[]>`
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
    `;

    return NextResponse.json({ columns }, { status: 200 });
  } catch (error) {
    console.error("Error fetching table metadata:", error);
    return NextResponse.json(
      { error: "Failed to fetch table metadata" },
      { status: 500 }
    );
  }
}
