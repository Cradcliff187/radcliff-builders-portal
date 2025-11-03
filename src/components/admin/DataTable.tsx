import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

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

export default function DataTable<T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  isLoading = false,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-none shadow-md p-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-light-grey rounded-none"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-none shadow-md p-12 text-center">
        <p className="text-charcoal text-lg">No items found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-none shadow-md overflow-hidden">
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
          {data.map((item) => (
            <TableRow key={item.id} className="hover:bg-light-grey transition-colors">
              {columns.map((column) => (
                <TableCell key={String(column.key)} className="text-charcoal">
                  {column.render
                    ? column.render(item)
                    : String(item[column.key as keyof T] || "")}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(item)}
                    className="border-navy text-navy hover:bg-navy hover:text-white uppercase tracking-wider"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(item)}
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white uppercase tracking-wider"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
