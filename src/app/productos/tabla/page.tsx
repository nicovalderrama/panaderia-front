'use client'

import { Cart } from "@/components/ui/cart/Cart";
import { ModalComponent } from "@/components/ui/modal/ModalComponent";
import { TableComponent } from "@/components/ui/table/TableComponent"
import { useEffect, useState } from "react"
import { ModalContent } from "./utils/ModalContent";

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad_disponible: number;
    categoria: string;
    imagen: string;
}
interface CartItem {
    producto: Producto,
    quantity: number;
}

export default function Page() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [productos, setProductos] = useState<Producto[]>([]);
    const [row, setRow] = useState<Producto>({
        id: 0,
        nombre: '',
        descripcion: '',
        precio: 0,
        cantidad_disponible: 0,
        categoria: '',
        imagen: '',
    });
    const [open, setOpen] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const actions = [
        {
            label: 'add_box',
            onClick: (item: Producto) => {
                setOpen(true)
                setRow(item)
            },
        }
    ]
    useEffect(() => {
        fetch(apiUrl + "/productos/")
            .then((response) => response.json())
            .then((data) => setProductos(data))
            .catch((error) => console.error(error));
    }, [])
    const handleAddToCart = (product: Producto|null, quantity: number) => {
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
    setOpen(false)
}

    return (
        <div className="container mx-auto p-4">
            <ModalComponent isOpen={open} onClose={() => console.log()}>
                <ModalContent setOpen={setOpen} row={row} onAddToCart={handleAddToCart}/>
            </ModalComponent>
            <div>
                <Cart itemsCart = {cartItems}/>
            </div>
            <div>
                <h1 className="text-2xl font-bold mb-4">Gestion de Venta</h1>
                {
                    productos.length ?
                        <TableComponent headers={productos.length ? Object.keys(productos[0]).filter(key => key !== 'imagen') : []} data={productos.length ? productos : []} actions={actions} />
                        : 'loading'
                }
            </div>
        </div>
    )
}