import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  isLoading?: boolean;
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onEdit,
  onDelete,
  isLoading,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter data based on search query (searches in title, name, or first string column)
  const filteredData = data.filter((row) => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return columns.some((col) => {
      const value = row[col.key as keyof T];
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchLower);
      }
      return false;
    });
  });

  return (
    <div className="bg-white rounded-none shadow-md overflow-hidden">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-none"
          />
        </div>
      </div>

      {/* Desktop Table View (hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-navy hover:bg-navy">
              {columns.map((column) => (
                <TableHead key={String(column.key)} className="text-white uppercase tracking-wide font-montserrat font-semibold">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-white uppercase tracking-wide font-montserrat font-semibold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Skeleton className="h-8 w-20" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center py-8 text-gray-500">
                  {searchQuery ? "No results found" : "No data available"}
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, index) => (
                <TableRow key={row.id || index} className="hover:bg-light-grey transition-colors">
                  {columns.map((column) => (
                    <TableCell key={String(column.key)} className="text-charcoal align-middle">
                      {column.render
                        ? column.render(row)
                        : String(row[column.key as keyof T] || "")}
                    </TableCell>
                  ))}
                  <TableCell className="text-right align-middle">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="admin"
                        size="sm"
                        onClick={() => onEdit(row)}
                        className="rounded-none"
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(row)}
                        className="rounded-none"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View (visible only on mobile) */}
      <div className="md:hidden">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-none">
                <Skeleton className="h-20 w-full mb-3" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredData.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchQuery ? "No results found" : "No data available"}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredData.map((row, index) => (
              <div key={row.id || index} className="p-4">
                {/* Render first two columns prominently */}
                {columns.slice(0, 2).map((column) => (
                  <div key={String(column.key)} className="mb-3">
                    {column.render ? column.render(row) : (
                      <div className="text-base font-semibold text-charcoal">
                        {String(row[column.key as keyof T] || "")}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Render remaining columns as key-value pairs */}
                {columns.slice(2).map((column) => (
                  <div key={String(column.key)} className="flex justify-between items-center py-2 border-t border-gray-100">
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                      {column.label}
                    </span>
                    <span className="text-sm text-charcoal">
                      {column.render
                        ? column.render(row)
                        : String(row[column.key as keyof T] || "")}
                    </span>
                  </div>
                ))}
                
                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                  <Button
                    variant="admin"
                    size="sm"
                    onClick={() => onEdit(row)}
                    className="rounded-none flex-1"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(row)}
                    className="rounded-none flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
