"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillEdit } from "react-icons/ai";
import { motion } from "framer-motion";
import DashboardPage from "../../page";
import { useRouter } from "next/navigation";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio_lista: number;
  precio_mayorista: number;
  unidad: string;
  cantidad_disponible: number;
  categoria: string;
  imagen?: string;
}

export default function ProductoPage() {
  const router = useRouter();
  const { id } = useParams();
  const [producto, setProducto] = useState<Producto | null>(null);

  const handleEditar = () => {
    router.push(`/dashboard/productos/editar/${id}`);
  };
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
    return <div>Cargando...</div>;
  }

  return (
    <DashboardPage>
      {" "}
      {/* Asegúrate de que esto envuelva correctamente el contenido */}
      <div className="p-8 max-w-6xl mx-auto">
        <div className="border border-gray-200 p-6 rounded-lg shadow-lg bg-white flex flex-col md:flex-row gap-8">
          {/* Imagen del producto */}
          <div className="md:w-1/2">
            <Image
              src={producto.imagen || "/images/placeholder.png"}
              alt={producto.nombre || "Producto sin imagen"}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          {/* Información del producto */}
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold text-marron-oscuro mb-4">
              {producto.nombre}
            </h1>
            <p className="text-gray-700 mb-4">{producto.descripcion}</p>
            <div className="mb-4">
              <span className="text-2xl font-semibold text-marron-principal">
                Precio de lista: ${producto.precio_lista}
              </span>
            </div>
            <div className="mb-4">
              <span className="text-2xl font-semibold text-marron-principal">
                Precio mayorista: ${producto.precio_mayorista}
              </span>
            </div>
            <p className="text-gray-500 mb-2">
              Cantidad Disponible: {producto.cantidad_disponible}
            </p>
            <p className="text-gray-500 mb-6">
              Categoría: {producto.categoria}
            </p>
            <div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-marron-principal text-white font-bold py-2 px-4 rounded-full"
                onClick={handleEditar}
              >
                <AiFillEdit className="inline-block mr-2" />
                Editar Producto
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  );
}
