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

export default function Page() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [productos, setProductos] = useState<Producto[]>([]);
    const [row, setRow] = useState<Producto | null>(null);
    const [open, setOpen] = useState<boolean>(false);
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


    return (
        <div className="container mx-auto p-4">
            <ModalComponent isOpen={open} onClose={() => console.log()}>
                <ModalContent setOpen={setOpen} row={row} />
            </ModalComponent>
            <div>
                <Cart />
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