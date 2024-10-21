import { useState } from "react"
import { Producto } from "../page"

interface iProps {
    setOpen: any,
    row: Producto
    onAddToCart: (product: Producto, quantity: number) => void
}

export const ModalContent = ({ setOpen, row, onAddToCart}:iProps) => {
  const [quantity, setQuantity] = useState(1)
  const handleCart = (e: React.FormEvent) => {
    e.preventDefault()
    onAddToCart(row, quantity)
  }
    return (
        <>
             <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Agregar al carrito</h2>
                <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
                  x
                </button>
              </div>
              <div className="mb-4">
                <p className="font-semibold mb-2">Producto: {row?.nombre}</p>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad disponible: {row?.cantidad_disponible}
                </label>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad:
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="0"
                  max={row?.cantidad_disponible}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                onClick={() =>setOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancelar
                </button>
                <button
                onClick={handleCart}
                  className="px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Agregar
                </button>
              </div>
            </div>
        </>
    )
}