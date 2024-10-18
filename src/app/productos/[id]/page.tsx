"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad_disponible: number;
  categoria: string;
}

export default function ProductoPage() {
  const { id } = useParams();
  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/productos/${id}/`)
        .then((response) => {
          if (!response.ok) throw new Error("Error al cargar el producto");
          return response.json();
        })
        .then((data) => setProducto(data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  if (!producto) {
    return <div>Cargando...</div>; // Opcional: Puedes mostrar un loader aquí
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">{producto.nombre}</h1>
      <p className="text-gray-700">{producto.descripcion}</p>
      <p className="text-gray-500">Precio: ${producto.precio}</p>
      <p className="text-gray-500">
        Cantidad Disponible: {producto.cantidad_disponible}
      </p>
      <p className="text-gray-500">Categoría: {producto.categoria}</p>
    </div>
  );
}
