"use client";

import { useEffect, useState, useMemo } from "react";
import type { DatabaseMetadata, TableInfo } from "@/lib/types";
import { TableCard } from "./components/TableCard";
import { SearchBar } from "./components/SearchBar";
import { SchemaFilter } from "./components/SchemaFilter";

export default function Home() {
  const [metadata, setMetadata] = useState<DatabaseMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMetadata() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/metadata");
        if (!response.ok) {
          throw new Error("Failed to fetch database metadata");
        }
        const data = await response.json();
        setMetadata(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching metadata:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMetadata();
  }, []);

  const filteredTables = useMemo(() => {
    if (!metadata) return [];

    let filtered = metadata.tables;

    // Filter by schema
    if (selectedSchema) {
      filtered = filtered.filter((table) => table.schema === selectedSchema);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (table) =>
          table.name.toLowerCase().includes(query) ||
          table.schema.toLowerCase().includes(query) ||
          table.columns.some((col) =>
            col.COLUMN_NAME.toLowerCase().includes(query)
          )
      );
    }

    return filtered.sort((a, b) => {
      if (a.schema !== b.schema) {
        return a.schema.localeCompare(b.schema);
      }
      return a.name.localeCompare(b.name);
    });
  }, [metadata, searchQuery, selectedSchema]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading database metadata...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-900 dark:text-red-200 mb-2">
            Error Loading Database
          </h2>
          <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Database Schema Browser
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore your database tables, fields, and relationships
          </p>
        </header>

        {metadata && (
          <>
            <div className="mb-6 space-y-4">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by table name, schema, or column..."
              />
              <SchemaFilter
                schemas={metadata.schemas}
                selectedSchema={selectedSchema}
                onSelectSchema={setSelectedSchema}
              />
            </div>

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredTables.length} of {metadata.tables.length} table
              {metadata.tables.length !== 1 ? "s" : ""}
            </div>

            {filteredTables.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  No tables found matching your search criteria.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {filteredTables.map((table) => (
                  <TableCard key={`${table.schema}.${table.name}`} table={table} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
