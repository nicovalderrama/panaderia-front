"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import DashboardPage from "../../page";
import Image from "next/image";
import { useAuth } from "@/app/context/hooks/useAuth";

interface Insumo {
  id: number;
  nombre: string;
  stock_actual: number;
  proveedor_frecuente: number;
}

interface SelectedInsumo {
  id: number;
  cantidad: string;
}

const CrearPedido: React.FC = () => {
  const router = useRouter();
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [proveedores, setProveedores] = useState<any[]>([]);
  const [selectedInsumos, setSelectedInsumos] = useState<SelectedInsumo[]>([]);
  const [parsedUserData, setParsedUserData] = useState<any | null>(null);
  const [filteredInsumos, setFilteredInsumos] = useState<Insumo[]>([]);
  const [noInsumosMessage, setNoInsumosMessage] = useState<string | null>(null);
  const {user} = useAuth()
  useEffect(() => {
    if (user) {
      if (user.role !== 'gerente') {
        router.push('/dashboard');
      }
    }
  }, [user, router]);

  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    const parsedData = userData ? JSON.parse(userData) : null;
    setParsedUserData(parsedData);
  }, []);

  useEffect(() => {
    const fetchInsumos = async () => {
      const response = await axios.get("http://localhost:8000/insumos/");
      setInsumos(response.data);
    };

    const fetchProveedores = async () => {
      const response = await axios.get("http://localhost:8000/proveedor/");
      setProveedores(response.data);
    };

    fetchInsumos();
    fetchProveedores();
  }, []);

  const formik = useFormik({
    initialValues: {
      proveedorId: "",
      observaciones: "",
    },
    validationSchema: Yup.object({
      proveedorId: Yup.string().required("Requerido"),
      observaciones: Yup.string(),
    }),
    onSubmit: async (values) => {
      const itemsData = selectedInsumos
        .map((insumo) => ({
          insumo_id: insumo.id,
          cantidad: insumo.cantidad,
        }))
        .filter((insumo) => +insumo.cantidad > 0); // Filtra los que tienen cantidad mayor a 0

      try {
        const pedidoData = {
          observaciones: values.observaciones,
          proveedor: values.proveedorId,
          usuario: user?.id,
          items: itemsData,
        };
        const response = await fetch("http://localhost:8000/pedido/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pedidoData),
        });
        if (!response.ok) {
          throw new Error("Error al registrar la venta");
        }

        const result = await response.json();
        toast.success("Pedido creado con éxito");
        formik.resetForm();
        setSelectedInsumos([]);
        setFilteredInsumos([]);
        setNoInsumosMessage(null);
        router.push(`/dashboard/pedidos/realizar/${result.id}`);
      } catch (error) {
        console.error("Error al crear el pedido", error);
        toast.error("Error al crear el pedido");
      }
    },
  });

  const handleInsumoChange = (insumoId: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedInsumos((prev) => [...prev, { id: insumoId, cantidad: "" }]);
    } else {
      setSelectedInsumos((prev) => prev.filter((item) => item.id !== insumoId));
    }
  };

  const handleCantidadChange = (insumoId: number, cantidad: string) => {
    setSelectedInsumos((prev) =>
      prev.map((item) => (item.id === insumoId ? { ...item, cantidad } : item))
    );
  };

  const handleProveedorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedProveedorId = parseInt(event.target.value);
    formik.setFieldValue("proveedorId", selectedProveedorId);

    const insumosFiltrados = insumos.filter(
      (insumo) => insumo.proveedor_frecuente === selectedProveedorId
    );
    setFilteredInsumos(insumosFiltrados);
    setSelectedInsumos([]);

    if (insumosFiltrados.length === 0) {
      setNoInsumosMessage("Este proveedor no tiene insumos disponibles.");
    } else {
      setNoInsumosMessage(null);
    }
  };

  return (
    <DashboardPage>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-screen bg-marron-oscuro"
      >
        <div className="flex justify-center mb-4">
          <Image
            src="/logo-marron-elmana-sinfondo.png"
            alt="Logo"
            width={200}
            height={200}
          />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="p-4 border rounded-lg bg-marron-oscuro shadow-md text-trigo w-[80%]"
        >
          <h2 className="text-lg font-bold mb-4 text-trigo">Crear Pedido</h2>

          <div className="mb-4">
            <label className="block">Proveedor:</label>
            <select
              {...formik.getFieldProps("proveedorId")}
              onChange={handleProveedorChange}
              className={`mt-1 block w-full border bg-marron-principal ${
                formik.touched.proveedorId && formik.errors.proveedorId
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md p-2`}
            >
              <option value="">Seleccionar proveedor</option>
              {proveedores.map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.nombre}
                </option>
              ))}
            </select>
            {formik.touched.proveedorId && formik.errors.proveedorId && (
              <div className="text-red-500">{formik.errors.proveedorId}</div>
            )}
          </div>

          {noInsumosMessage && (
            <div className="text-red-500 mb-4">{noInsumosMessage}</div>
          )}

          {filteredInsumos.length > 0 && (
            <div className="mb-4">
              <label className="block">Insumos:</label>
              {filteredInsumos.map((insumo) => {
                const selectedInsumo = selectedInsumos.find(
                  (item) => item.id === insumo.id
                );
                return (
                  <div key={insumo.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={!!selectedInsumo}
                      onChange={(e) =>
                        handleInsumoChange(insumo.id, e.target.checked)
                      }
                      className="mr-2"
                    />
                    <span className="mr-2">{insumo.nombre}</span>
                    <input
                      type="text"
                      placeholder="0"
                      value={selectedInsumo?.cantidad || ""}
                      onChange={(e) =>
                        handleCantidadChange(insumo.id, e.target.value)
                      }
                      className="border  bg-marron-principal border-gray-300 rounded-md p-1 w-16"
                      disabled={!selectedInsumo}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div className="mb-4">
            <label className="block">Observaciones:</label>
            <textarea
              {...formik.getFieldProps("observaciones")}
              className="mt-1 block w-full bg-marron-principal border border-gray-300 rounded-md p-2"
            />
          </div>

          <button
            type="submit"
            className="flex items-center bg-marron-principal text-white p-2 rounded"
          >
            <FaPlus className="mr-2" /> Crear Pedido
          </button>
        </form>
      </motion.div>
    </DashboardPage>
  );
};

export default CrearPedido;
