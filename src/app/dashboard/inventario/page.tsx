"use client";
import React, { useEffect, useState } from "react";
import { TableInsumos } from "../../../components/ui/table/TableInsumos";
import { ModalComponent } from "../../../components/ui/modal/ModalComponent";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import DashboardPage from "../../dashboard/page";

interface Insumo {
  id: number;
  nombre: string;
  descripcion: string;
  stock_actual: number;
  punto_pedido: number;
  precio_comprado: string;
  proveedor_frecuente: string;
}

const GestionInventario = () => {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedInsumo, setSelectedInsumo] = useState<Insumo | null>(null);
  const router = useRouter();

  const fetchInsumos = async () => {
    try {
      const response = await fetch("http://localhost:8000/insumos/");
      const data = await response.json();
      setInsumos(data);
      console.log("data", data);
    } catch (error) {
      toast.error("Error al obtener los insumos");
    }
  };

  useEffect(() => {
    fetchInsumos();
  }, []);

  const handleEliminar = async () => {
    if (selectedInsumo) {
      try {
        const response = await fetch(
          `http://localhost:8000/insumos/${selectedInsumo.id}/`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          toast.success("Insumo eliminado correctamente");
          fetchInsumos();
          setDeleteModalOpen(false);
        } else {
          toast.error("Error al eliminar el insumo");
        }
      } catch (error) {
        toast.error("Error al realizar la solicitud");
      }
    }
  };

  const handleEditar = (insumo: any) => {
    router.push(`/dashboard/inventario/editar/${insumo.id}`); // Redirige a la página de edición
  };

  const handleEliminarClick = (insumo: Insumo) => {
    setSelectedInsumo(insumo);
    setDeleteModalOpen(true);
  };

  const handleAgregarInsumo = () => {
    router.push("/dashboard/inventario/crear/");
  };

  return (
    <DashboardPage>
      <div className="p-6 text-white min-h-screen flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-marron-oscuro">
            Gestión de Inventario
          </h1>
          <button
            onClick={handleAgregarInsumo}
            className="bg-marron-oscuro text-white py-2 px-4 rounded hover:bg-[#7a5640] transition duration-300"
          >
            Agregar Insumo
          </button>
        </div>

        <TableInsumos
          headers={[
            "ID",
            "Nombre",
            "Descripción",
            "Stock Actual",
            "Punto de Pedido",
            "Proveedor Frecuente",
            "Precio Comprado",
          ]}
          data={insumos}
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
              ¿Estás seguro de que deseas eliminar el insumo?
            </h2>
            <p className="mb-4">{selectedInsumo?.nombre}</p>
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

export default GestionInventario;
