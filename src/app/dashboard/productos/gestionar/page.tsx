"use client";

import React, { useEffect, useState } from "react";
import { TableProducts } from "../../../../components/ui/table/TableProducts";
import { ModalComponent } from "../../../../components/ui/modal/ModalComponent";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import DashboardPage from "../../page";

interface Producto {
  id: number;
  nombre: string;
  precio_lista: string;
  precio_mayorista: string;
  cantidad_disponible: number;
}

const GestionProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(
    null
  );
  const router = useRouter();

  const fetchProductos = async () => {
    try {
      const response = await fetch("http://localhost:8000/productos/");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      toast.error("Error al obtener los productos");
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleEliminar = async () => {
    if (selectedProducto) {
      try {
        const response = await fetch(
          `http://localhost:8000/productos/${selectedProducto.id}/`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          toast.success("Producto eliminado correctamente");
          fetchProductos();
          setDeleteModalOpen(false);
        } else {
          toast.error("Error al eliminar el producto");
        }
      } catch (error) {
        toast.error("Error al realizar la solicitud");
      }
    }
  };

  const handleEditar = (producto: any) => {
    router.push(`/dashboard/productos/editar/${producto.id}`); // Redirige a la página de edición
  };

  const handleEliminarClick = (producto: Producto) => {
    setSelectedProducto(producto);
    setDeleteModalOpen(true);
  };

  const handleAgregarProducto = () => {
    router.push("/dashboard/productos/agregar/");
  };

  return (
 <DashboardPage>
     <div className="p-6  text-white min-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <button
          onClick={handleAgregarProducto}
          className="bg-[#5a3e2b] text-white py-2 px-4 rounded hover:bg-[#7a5640] transition duration-300"
        >
          Agregar Producto
        </button>
      </div>

      <TableProducts
        headers={["ID", "Nombre", "Precio lista", "Precio mayorista", "Cantidad Disponible"]}
        data={productos}
        actions={[
          {
            label: "Editar",
            onClick: handleEditar,
            icon: <AiFillEdit className="text-blue-500" />,
          },
          {
            label: "Eliminar",
            onClick: handleEliminarClick,
            icon: <AiFillDelete className="text-red-500" />,
          },
        ]}
      />

      <ModalComponent
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <div className="bg-marron-principal p-6 rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">
            ¿Estás seguro de que deseas eliminar el producto?
          </h2>
          <p className="mb-4">{selectedProducto?.nombre}</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={handleEliminar}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      </ModalComponent>
    </div>
 </DashboardPage>
  );
};

export default GestionProductos;
