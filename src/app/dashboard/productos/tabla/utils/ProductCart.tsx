import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Producto } from '../page'
import { FaTrash } from 'react-icons/fa'



interface ProductCardProps {
  product: Producto
  quantity: number
  removeItems: (id: number) => void

}

export default function ProductCard({ product, quantity, removeItems }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="flex">
        <div className="w-56 relative p-4">
          <motion.img
            src={product.imagen || '/placeholder.png'}
            alt={product.nombre}
            className="w-full h-full shadow-md object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="w-2/3 p-4">
          <h3 className="text-lg font-semibold mb-2">{product.nombre}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.descripcion}</p>
          <p className="text-sm text-gray-500 mb-2">Categoría: {product.categoria}</p>

          <div className="flex justify-between items-center">
            {
              quantity > 3 ?
                <div>
                  <p className="text-lg font-bold text-blue-600">precio mayorista: </p>

                  <p className="text-lg font-bold text-blue-600">${product.precio_mayorista}</p>
                </div>
                :
                <div>
                  <p className="text-lg font-bold text-blue-600">precio lista:</p>

                  <p className="text-lg font-bold text-blue-600">${product.precio_lista}</p>
                </div>
            }
            <div className="flex items-center">
              <button
                className="text-gray-500 hover:text-gray-700"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                className="w-12 text-center mx-2 border rounded"
              />
              <button
                className="text-gray-500 hover:text-gray-700"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            {/* <p className="text-sm text-gray-500">Disponibles: {product.cantidad_disponible}</p> */}
            <button
              onClick={() => removeItems(product.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}