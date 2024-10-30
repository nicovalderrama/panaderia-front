"use client";

import React, { useEffect, useState } from "react";
import { ModalComponent } from "../../../components/ui/modal/ModalComponent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardPage from "../page";

interface Proveedor {
  id: number;
  nombre: string;
  telefono: string;
  direccion: string;
}

const RealizarPedido = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [selectedProveedor, setSelectedProveedor] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  // Función para obtener proveedores de la API
  const fetchProveedores = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/proveedor/");
      const data = await response.json();
      setProveedores(data);
    } catch (error) {
      console.error("Error fetching proveedores:", error);
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  // Función para crear un nuevo proveedor
  const crearProveedor = async () => {
    if (nombre === "" || telefono === "" || direccion === "") {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    const newProveedor = {
      nombre,
      telefono,
      direccion,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/proveedor/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProveedor),
      });

      if (response.ok) {
        toast.success("Proveedor creado exitosamente");
        setIsModalOpen(false);
        setNombre("");
        setTelefono("");
        setDireccion("");
        fetchProveedores(); // Actualizar la lista de proveedores
      } else {
        toast.error("Error al crear proveedor");
      }
    } catch (error) {
      toast.error("Error al realizar la solicitud");
    }
  };

  return (
    <DashboardPage>
      <div className="p-6  min-h-screen flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Realizar Pedido</h1>
        <div className="mb-6">
          <label htmlFor="proveedor" className="block text-lg mb-2">
            Seleccionar Proveedor
          </label>
          <select
            id="proveedor"
            value={selectedProveedor || ""}
            onChange={(e) => setSelectedProveedor(parseInt(e.target.value))}
            className="p-3 w-full bg-[#ebc68e] text-gray-800 rounded-md focus:outline-none"
          >
            <option value="" disabled>
              Seleccionar un proveedor
            </option>
            {proveedores.map((proveedor) => (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.nombre}
              </option>
            ))}
          </select>
          <div>
       
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 p-3 bg-white text-gray-800 rounded-md hover:bg-[#d9b074] transition duration-300"
          >
            Crear Proveedor
          </button>
          </div>
        </div>

        <ModalComponent
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
         <div className="bg-white rounded-lg p-6 w-96 shadow-md">
  <h2 className="text-lg font-bold mb-4">Crear Proveedor</h2>
  <div className="mb-4">
    <label htmlFor="nombre" className="block mb-2">
      Nombre
    </label>
    <input
      type="text"
      id="nombre"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      className="w-full p-2 bg-[#f5f5f5] text-gray-800 rounded-md"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="telefono" className="block mb-2">
      Teléfono
    </label>
    <input
      type="text"
      id="telefono"
      value={telefono}
      onChange={(e) => setTelefono(e.target.value)}
      className="w-full p-2 bg-[#f5f5f5] text-gray-800 rounded-md"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="direccion" className="block mb-2">
      Dirección
    </label>
    <input
      type="text"
      id="direccion"
      value={direccion}
      onChange={(e) => setDireccion(e.target.value)}
      className="w-full p-2 bg-[#f5f5f5] text-gray-800 rounded-md"
    />
  </div>
  <div className="flex justify-end">
  <button
            onClick={() => setIsModalOpen(false)}
            className=" p-2 bg-[#ebc68e] text-gray-800 rounded-md hover:bg-[#d9b074] transition duration-300"
          >
            Cancelar
          </button>
    <button
      onClick={crearProveedor}
      className="p-2 bg-[#ebc68e] text-gray-800 rounded-md hover:bg-[#d9b074] transition duration-300"
    >
      Crear
    </button>
  </div>
</div>
        </ModalComponent>
      </div>
    </DashboardPage>
  );
};

export default RealizarPedido;
