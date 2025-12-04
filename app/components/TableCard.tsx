"use client";

import { useState } from "react";
import type { TableInfo } from "@/lib/types";
import { ColumnList } from "./ColumnList";
import { RelationshipList } from "./RelationshipList";

interface TableCardProps {
  table: TableInfo;
}

export function TableCard({ table }: TableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {table.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {table.schema}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {table.columns.length} column{table.columns.length !== 1 ? "s" : ""}
          </span>
          <svg
            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
              isExpanded ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 space-y-6">
          <ColumnList columns={table.columns} />
          <RelationshipList
            outgoing={table.relationships.outgoing}
            incoming={table.relationships.incoming}
            tableName={table.name}
            schema={table.schema}
          />
        </div>
      )}
    </div>
  );
}
