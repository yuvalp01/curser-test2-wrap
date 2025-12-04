"use client";

import type { Relationship } from "@/lib/types";

interface RelationshipListProps {
  outgoing: Relationship[];
  incoming: Relationship[];
  tableName: string;
  schema: string;
}

export function RelationshipList({
  outgoing,
  incoming,
  tableName,
  schema,
}: RelationshipListProps) {
  if (outgoing.length === 0 && incoming.length === 0) {
    return (
      <div>
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Relationships
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No relationships found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {outgoing.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Foreign Keys (Outgoing)
          </h4>
          <div className="space-y-2">
            {outgoing.map((rel, index) => (
              <div
                key={index}
                className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3"
              >
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                      {rel.ForeignKeyName}
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                      <span className="font-medium">{tableName}.{rel.ParentColumn}</span>
                      {" → "}
                      <span className="font-medium">
                        {rel.ReferencedTable}.{rel.ReferencedColumn}
                      </span>
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      References: {rel.ReferencedSchema}.{rel.ReferencedTable}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {incoming.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Referenced By (Incoming)
          </h4>
          <div className="space-y-2">
            {incoming.map((rel, index) => (
              <div
                key={index}
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3"
              >
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0 rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-900 dark:text-green-200">
                      {rel.ForeignKeyName}
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                      <span className="font-medium">
                        {rel.ParentTable}.{rel.ParentColumn}
                      </span>
                      {" → "}
                      <span className="font-medium">{tableName}.{rel.ReferencedColumn}</span>
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      Referenced by: {rel.ParentSchema}.{rel.ParentTable}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
