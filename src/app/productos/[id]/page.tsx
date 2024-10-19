"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad_disponible: number;
  categoria: string;
  imagen?: string;
}

export default function ProductoPage() {
  const { id } = useParams();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad seleccionada

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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedQuantity = Number(e.target.value);

    // Validar que la cantidad seleccionada no supere el stock disponible
    if (selectedQuantity <= (producto?.cantidad_disponible || 0)) {
      setQuantity(selectedQuantity);
    }
  };

  if (!producto) {
    return <div>Cargando...</div>; // Opcional: Puedes mostrar un loader aquí
  }

  return (
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {producto.nombre}
          </h1>
          <p className="text-gray-700 mb-4">{producto.descripcion}</p>
          <div className="mb-4">
            <span className="text-2xl font-semibold text-amber-600">
              Precio: ${producto.precio}
            </span>
          </div>
          <p className="text-gray-500 mb-2">
            Cantidad Disponible: {producto.cantidad_disponible}
          </p>
          <p className="text-gray-500 mb-6">Categoría: {producto.categoria}</p>

          {/* Sección de cantidad y agregar al carrito */}
          <div className="mt-6 flex items-center">
            <label htmlFor="quantity" className="sr-only">
              Cantidad
            </label>
            <select
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            >
              {[...Array(producto.cantidad_disponible)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>

            {/* Botón para añadir al carrito */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 flex-1 bg-amber-600 text-white font-semibold rounded-md py-3 px-8 flex items-center justify-center hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 ease-in-out"
            >
              <FaShoppingCart className="mr-2" />
              Añadir al carrito
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
