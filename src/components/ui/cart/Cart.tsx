'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X } from 'lucide-react'

interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
}
export const Cart = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [items, setItems] = useState<CartItem[]>([
        { id: 1, name: "Producto 1", price: 19.99, quantity: 2 },
        { id: 2, name: "Producto 2", price: 29.99, quantity: 1 },
    ])

    const toggleCart = () => setIsOpen(!isOpen)

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id))
    }

    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)
    return (
        <>
            <button
                onClick={toggleCart}
                className="fixed top-1/4 right-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            >
                <ShoppingCart size={24} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto"
                    >
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Carrito</h2>
                                <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
                                    <X size={24} />
                                </button>
                            </div>

                            {items.length === 0 ? (
                                <p className="text-gray-500">Tu carrito está vacío</p>
                            ) : (
                                <>
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex justify-between items-center border-b py-2"
                                        >
                                            <div>
                                                <p className="font-semibold">{item.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    {item.quantity} x ${item.price.toFixed(2)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <X size={18} />
                                            </button>
                                        </motion.div>
                                    ))}

                                    <div className="mt-4">
                                        <p className="font-bold text-lg">
                                            Total: ${totalPrice.toFixed(2)}
                                        </p>
                                        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600 transition-colors">
                                            Proceder al pago
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleCart}
                />
            )}
        </>
    )
}


