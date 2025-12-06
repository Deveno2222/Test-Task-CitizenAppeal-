import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TableView({ data, setSelectedItem }) {
  const [currentPage, setCurrentPage] = useState(1);
  const PageLength = 10;
  const indexOfLastItem = currentPage * PageLength;
  const indexOfFirstItem = indexOfLastItem - PageLength;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / PageLength);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="px-4 py-2 text-left">ID</TableHead>
            <TableHead className="px-4 py-2 text-left">Категория</TableHead>
            <TableHead className="px-4 py-2 text-left">Адрес</TableHead>
            <TableHead className="px-4 py-2 text-left">Статус</TableHead>
            <TableHead className="px-4 py-2 text-center">
              Дата регистрации
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.map((appeal, index) => {
            const statusClass =
              appeal.status === "В работе"
                ? "text-yellow-800 bg-yellow-100 font-semibold"
                : "text-green-800 bg-green-100 font-semibold";

            return (
              <TableRow
                key={appeal.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors duration-200`}
                onClick={() => setSelectedItem(appeal)}
              >
                <TableCell className="px-4 py-2">{appeal.id}</TableCell>
                <TableCell className="px-4 py-2">{appeal.category}</TableCell>
                <TableCell className="px-4 py-2">{appeal.address}</TableCell>
                <TableCell
                  className={`px-4 py-2 rounded ${statusClass} text-center`}
                >
                  {appeal.status}
                </TableCell>
                <TableCell className="px-4 py-2 text-center">
                  {appeal.created_at}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="flex items-center justify-center gap-2 mt-4">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        {Array.from({ length: totalPages }, (_, idx) => (
          <Button
            key={idx + 1}
            size="sm"
            variant={currentPage === idx + 1 ? "default" : "outline"}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
