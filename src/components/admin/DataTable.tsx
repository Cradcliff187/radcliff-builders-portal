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
                  <TableCell key={String(column.key)} className="text-charcoal">
                    {column.render
                      ? column.render(row)
                      : String(row[column.key as keyof T] || "")}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(row)}
                      className="border-navy text-navy hover:bg-navy hover:text-white uppercase tracking-wider rounded-none"
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(row)}
                      className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white uppercase tracking-wider rounded-none"
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
  );
}
