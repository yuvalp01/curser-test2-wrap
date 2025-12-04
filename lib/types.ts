export interface Column {
  TABLE_SCHEMA: string;
  TABLE_NAME: string;
  COLUMN_NAME: string;
  DATA_TYPE: string;
  IS_NULLABLE: string;
  CHARACTER_MAXIMUM_LENGTH: number | null;
}

export interface Relationship {
  ForeignKeyName: string;
  ParentSchema: string;
  ParentTable: string;
  ParentColumn: string;
  ReferencedSchema: string;
  ReferencedTable: string;
  ReferencedColumn: string;
}

export interface TableInfo {
  schema: string;
  name: string;
  columns: Column[];
  relationships: {
    outgoing: Relationship[]; // Foreign keys this table references
    incoming: Relationship[]; // Foreign keys that reference this table
  };
}

export interface DatabaseMetadata {
  tables: TableInfo[];
  schemas: string[];
}
