"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardPage from "../page";
import Image from "next/image";

interface Proveedor {
  id: number;
  nombre: string;
  telefono: string;
  direccion: string;
}

const RegistrarProveedor = () => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

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
        setNombre("");
        setTelefono("");
        setDireccion("");
      } else {
        toast.error("Error al crear proveedor");
      }
    } catch (error) {
      toast.error("Error al realizar la solicitud");
    }
  };

  return (
    <DashboardPage>
      <div className="p-6 min-h-screen flex items-center">
        <div className="flex flex-col items-center w-full bg-marron-oscuro rounded-lg border border-marron-oscuro p-6">
          <div className="mb-4 flex justify-center">
            <Image
              src="/logo-marron-elmana-sinfondo.png"
              alt="Logo"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          <div className="bg-marron-oscuro p-6 rounded-lg w-full">
            <h1 className="text-2xl font-bold mb-4 text-trigo">
              Registrar Proveedor
            </h1>

            <div className="mb-6 text-trigo">
              <div className="mb-4">
                <label htmlFor="nombre" className="block mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full p-2 bg-marron-principal text-gray-800 rounded-md"
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
                  className="w-full p-2 bg-marron-principal text-gray-800 rounded-md"
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
                  className="w-full p-2 bg-marron-principal text-gray-800 rounded-md"
                />
              </div>
              <button
                onClick={crearProveedor}
                className="p-3 bg-[#ebc68e] text-gray-800 rounded-md hover:bg-[#d9b074] transition duration-300"
              >
                Crear Proveedor
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  );
};

export default RegistrarProveedor;
