import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchFilter({ data, setFilteredData }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    let filtered = data;

    if (status && status !== "all") {
      filtered = filtered.filter((item) => item.status === status);
    }

    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.address.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [search, status, data, setFilteredData]);

  return (
    <div className="flex justify-center space-x-4">
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Поиск по категории или адресу..."
      />
      <Select
        value={status}
        onValueChange={(value) => {
          setStatus(value);
        }}
      >
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Фильтр по статусу" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все</SelectItem>
          <SelectItem value="В работе">В работе</SelectItem>
          <SelectItem value="Решено">Завершено</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
