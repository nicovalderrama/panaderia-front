"use client";
import { useEffect, useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad_disponible: number;
  categoria: string;
}
export default function productos() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/productos/")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <h1>Lista de productos</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Descripción</th>
            <th className="border border-gray-300 px-4 py-2">Precio</th>
            <th className="border border-gray-300 px-4 py-2">
              Cantidad Disponible
            </th>
            <th className="border border-gray-300 px-4 py-2">Categoría</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td className="border border-gray-300 px-4 py-2">
                {producto.id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {producto.nombre}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {producto.descripcion}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {producto.precio}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {producto.cantidad_disponible}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {producto.categoria}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
