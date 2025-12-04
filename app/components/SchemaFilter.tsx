"use client";

interface SchemaFilterProps {
  schemas: string[];
  selectedSchema: string | null;
  onSelectSchema: (schema: string | null) => void;
}

export function SchemaFilter({ schemas, selectedSchema, onSelectSchema }: SchemaFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectSchema(null)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          selectedSchema === null
            ? "bg-blue-600 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
        }`}
      >
        All Schemas
      </button>
      {schemas.map((schema) => (
        <button
          key={schema}
          onClick={() => onSelectSchema(schema)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedSchema === schema
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {schema}
        </button>
      ))}
    </div>
  );
}
