import { useEffect, useState } from "react";

import { TableView } from "./components/TableView/TableView";
import { SearchFilter } from "./components/SearchFilter/SearchFilter";
import { MapView } from "./components/MapView/MapView";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      });
  }, []);

  return (
    <div className="container mx-auto space-y-6 mt-10 p-4">
      <h1 className="text-4xl text-center">Обращения граждан</h1>
      <SearchFilter data={data} setFilteredData={setFilteredData} />
      <TableView data={filteredData} setSelectedItem={setSelectedItem} />
      <MapView data={filteredData} />
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-lg rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Обращение №{selectedItem?.id}
            </DialogTitle>
            <DialogDescription>
              Подробная информация по обращению гражданина
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4 mt-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-700">
                  {selectedItem.category}
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    selectedItem.status === "В работе"
                      ? "bg-yellow-200 text-yellow-800"
                      : selectedItem.status === "Решено"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {selectedItem.status}
                </span>
              </div>

              <div>
                <label className="text-sm text-gray-500">Адрес</label>
                <p className="font-medium">{selectedItem.address}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">Описание</label>
                <p className="text-gray-700 leading-snug">
                  {selectedItem.description}
                </p>
              </div>

              {selectedItem.photo && (
                <div>
                  <label className="text-sm text-gray-500">Фото</label>
                  <img
                    src={selectedItem.photo}
                    alt="Фото обращения"
                    className="rounded-lg border shadow-sm mt-1"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Широта</label>
                  <p className="font-mono">{selectedItem.latitude}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Долгота</label>
                  <p className="font-mono">{selectedItem.longitude}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
