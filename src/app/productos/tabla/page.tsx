'use client'

import { ModalComponent } from "@/components/ui/modal/ModalComponent";
import { FaCartArrowDown } from "react-icons/fa";

import { useEffect, useState } from "react"
import { ModalContent } from "./utils/ModalContent";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, ShoppingCart } from "lucide-react";
import ProductCard from "./utils/ProductCart";
import { PagoContent } from "./utils/pagoContent";

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad_disponible: number;
    categoria: string;
    imagen: string;
}
export interface CartItem {
    producto: Producto,
    quantity: number;
}

export default function Page() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [productos, setProductos] = useState<Producto[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [total, setTotal] = useState<number>(0);
    const [modalPago, setModalPago] = useState<boolean>(false);
    // const [row, setRow] = useState<Producto>({
    //     id: 0,
    //     nombre: '',
    //     descripcion: '',
    //     precio: 0,
    //     cantidad_disponible: 0,
    //     categoria: '',
    //     imagen: '',
    // });

    // const actions = [
    //     {
    //         label: 'add_box',
    //         onClick: (item: Producto) => {
    //             setOpen(true)
    //             setRow(item)
    //         },
    //     }
    // ]
    useEffect(() => {
        fetch(apiUrl + "/productos/")
            .then((response) => response.json())
            .then((data) => setProductos(data))
            .catch((error) => console.error(error));
        
    }, [])
    useEffect(() =>{
        getTotal();
    },[cartItems])
    const handleAddToCart = (product: Producto | null, quantity: number) => {
        product ?
            setCartItems(prevItems => {
                const existingItem = prevItems.find(item => item.producto.id === product?.id)
                if (existingItem) {
                    return prevItems.map(item =>
                        item.producto.id === product?.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    )
                } else {
                    return [...prevItems, { producto: product, quantity }]
                }
            }) : setOpen(false)

    }
    const removeItem = (id: number) => setCartItems(cartItems.filter(item => item.producto.id !== id))
    const getTotal = () => setTotal(cartItems.reduce((total, item) => total + item.producto.precio * item.quantity, 0))



    return (
        <div className="container mx-auto p-4">
            <ModalComponent isOpen={open} onClose={() => console.log()}>
                <ModalContent setOpen={setOpen} onAddToCart={handleAddToCart} productos={productos} />
            </ModalComponent>
            <ModalComponent isOpen={modalPago} onClose={() => console.log()}>
                <PagoContent setModalPago={setModalPago} cartItems={cartItems} total={ total}/>
            </ModalComponent>
            <div>
                {/* <Cart itemsCart = {cartItems}/> */}
            </div>
            <div>
                <div className="flex justify-between mb-4">
                    <div className="flex items-center ">
                        <h1 className="text-2xl font-bold mr-8">Gestion de Venta</h1>
                        <div className="flex">
                            <motion.button
                                onClick={() => setOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center mr-2 justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                <Plus size={20} className="mr-2" />
                                Agregar Producto
                            </motion.button>
                            <motion.button
                                disabled={cartItems.length ? false : true}
                                onClick={() => setModalPago(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                <FaCartArrowDown />
                                <p className="ml-2">
                                    Procesar el pago
                                </p>
                            </motion.button>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Total: ${total}</h2>
                    </div>
                </div>
                {/* {
                    productos.length ?
                        <TableComponent headers={productos.length ? Object.keys(productos[0]).filter(key => key !== 'imagen') : []} data={productos.length ? productos : []} actions={actions} />
                        : 'loading'
                } */}
                <AnimatePresence mode="wait">
                    {!cartItems.length ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md"
                        >
                            <ShoppingCart size={64} className="text-gray-400 mb-4" />
                            <h2 className="text-2xl font-bold text-gray-700 mb-4">Tu carrito está vacío</h2>

                        </motion.div>
                    ) : cartItems.map((product, i) => (
                        <ProductCard key={i} product={product.producto} quantity={product.quantity} removeItems={removeItem} />
                    ))

                    }
                </AnimatePresence>
            </div>
        </div>
    )
}