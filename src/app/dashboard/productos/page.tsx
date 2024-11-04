"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DashboardPage from "../page";
import { Producto } from "./tabla/page";

export default function Productos() {
  // Cambia la función a Productos
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState<string>("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("todos");
  // const [precioFiltro, setPrecioFiltro] = useState<number>(0);

  const productosFiltrados = productos.filter((producto) => {
    return (
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (categoriaFiltro === "todos" || producto.categoria === categoriaFiltro)
    );
  });

  const handleVerMas = (id: number) => {
    router.push(`/dashboard/productos/${id}`);
  };

  useEffect(() => {
    fetch(apiUrl + "/productos/")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <DashboardPage>
      <div className="bg-base-100 rounded ">
        <h1 className="text-2xl font-bold mb-6">Lista de productos</h1>

        <div className="flex flex-col sm:flex-row items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="border p-2 rounded-md"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select
            className="border p-2 rounded-md"
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            <option value="todos">Todas las categorías</option>
            <option value="panificacion">Panificación</option>
            <option value="pasteleria">Pastelería</option>
          </select>

          {/* <input
          type="number"
          placeholder="Filtrar por precio"
          className="border p-2 rounded-md"
          value={precioFiltro === 0 ? "" : precioFiltro}
          min="0"
          onChange={(e) => setPrecioFiltro(Number(e.target.value))}
        /> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productosFiltrados.map((producto) => (
            <div
              key={producto.id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg"
            >
              <img
                src={producto.imagen} // URL de la imagen del producto
                alt={producto.nombre} // Texto alternativo
                className="w-full h-48 object-cover rounded-md mb-4" // Clase para el estilo
              />
              <h2 className="text-lg font-bold mb-2">{producto.nombre}</h2>
              <p className="text-gray-700">{producto.descripcion}</p>
              <p className="text-gray-500">Precio: ${producto.precio_lista}</p>
              <motion.button
                className="px-12 py-3 mt-10 text-sm text-center font-bold text-[#ebc68e] border bg-[#8b563b] border-[#ebc68e] rounded focus:outline-none bg-opacity-95"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#8b563b",
                  color: "#fff",
                }}
                whileTap={{ scale: 0.95, backgroundColor: "#ab9680" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleVerMas(producto.id)}
              >
                Ver más información
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </DashboardPage>
  );
}
