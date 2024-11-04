"use client";

import { useEffect, useState } from "react";
import DashboardPage from "../page";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
interface IVenta {
  id: number;
  fecha_venta: string;
  tipo_venta: string;
  forma_pago: string;
  tipo_comprobante: string;
  numero_comprobante: string;
  cliente_nombre_completo: string;
  total_monto_venta: number;
  user_name_venta: string;
  items: IItems[];
}

interface IItems {
  cantidad: number;
  monto_total: string;
  producto_nombre: string;
  producto_precio: number;
  producto_precio_unidad: string;
  tipo_precio: string;
  producto_categoria: string;
}

export default function Reportes() {
  const [ventas, setVentas] = useState<IVenta[]>([]);
  const [filteredVentas, setFilteredVentas] = useState<IVenta[]>([]);
  const [productFilter, setProductFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const headers = [
    "ID",
    "Fecha de venta",
    "Cliente",
    "Forma de pago",
    "Usuario",
    "Monto total",
  ];
  const clearFilter = () => {
    setCategoryFilter("");
    setProductFilter("");
    setStartDate("");
    setEndDate("");
    setSortBy("date");
  };
  useEffect(() => {
    fetchVentas();
  }, []);

  useEffect(() => {
    filterVentas();
  }, [ventas, productFilter, categoryFilter, startDate, endDate, sortBy]);

  const fetchVentas = async () => {
    try {
      const response = await fetch(`http://localhost:8000/venta/`);
      const data = await response.json();
      setVentas(data);
    } catch (error) {
      console.error("Error fetching ventas:", error);
    }
  };

  const filterVentas = () => {
    let filtered = ventas;

    if (productFilter) {
      filtered = filtered.filter((venta) =>
        venta.items?.some((item) =>
          item.producto_nombre
            .toLowerCase()
            .includes(productFilter.toLowerCase())
        )
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((venta) =>
        venta.items?.some((item) =>
          item.producto_categoria
            .toLowerCase()
            .includes(categoryFilter.toLowerCase())
        )
      );
    }

    if (startDate) {
      filtered = filtered.filter(
        (venta) => new Date(venta.fecha_venta) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (venta) => new Date(venta.fecha_venta) <= new Date(endDate)
      );
    }

    if (sortBy === "most_sold") {
      // This is a simplified version. For accurate results, you should implement this sorting on the backend.
      filtered.sort((a, b) => b.total_monto_venta - a.total_monto_venta);
    } else {
      filtered.sort(
        (a, b) =>
          new Date(b.fecha_venta).getTime() - new Date(a.fecha_venta).getTime()
      );
    }

    setFilteredVentas(filtered);
  };

  const exportToExcel = () => {
    console.log(filterVentas);
    const worksheet = XLSX.utils.json_to_sheet(filteredVentas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ventas");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "reporte_ventas.xlsx");
  };

  return (
    <DashboardPage>
      <div className="flex flex-col p-4 bg-base-100 rounded">
        <h1 className="text-2xl font-bold m-8 text-marron-oscuro">
          Reportes ventas
        </h1>

        <div className="flex flex-wrap p-4 rounded-xl shadow gap-4 mb-4 bg-gray-50">
          <input
            type="text"
            placeholder="Filtrar por producto"
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Filtrar por categoría"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="date">Ordenar por fecha</option>
            <option value="most_sold">Ordenar por más vendidos</option>
          </select>
          <button
            onClick={clearFilter}
            className="bg-amber-800 text-white font-bold py-2 px-4 rounded hover:bg-amber-600 transition duration-300"
          >
            {" "}
            Limpiar filtros
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="w-full text-sm text-left text-gray-500  ">
            <thead className="text-xs text-trigo uppercase bg-marron-principal">
              <tr>
                {headers.map((header, index) => (
                  <th key={index} scope="col" className="px-6 py-3">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredVentas.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{row.id}</td>
                  <td className="px-6 py-4">{row.fecha_venta}</td>
                  <td className="px-6 py-4">{row.cliente_nombre_completo}</td>
                  <td className="px-6 py-4">{row.forma_pago}</td>
                  <td className="px-6 py-4">{row.user_name_venta}</td>
                  <td className="px-6 py-4">{row.total_monto_venta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-start mt-4">
          <button
            onClick={exportToExcel}
            className="bg-[#006400] text-white font-bold py-2 px-4 rounded hover:bg-[#008000] transition duration-300"
          >
            Descargar Excel
          </button>
        </div>
      </div>
    </DashboardPage>
  );
}
