"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import DashboardPage from "../../page";

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
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [proveedores, setProveedores] = useState<any[]>([]);
  const [selectedInsumos, setSelectedInsumos] = useState<SelectedInsumo[]>([]);
  const [parsedUserData, setParsedUserData] = useState<any | null>(null);
  const [filteredInsumos, setFilteredInsumos] = useState<Insumo[]>([]);
  const [noInsumosMessage, setNoInsumosMessage] = useState<string | null>(null);

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
      try {
        const pedidoData = {
          observaciones: values.observaciones,
          proveedor: values.proveedorId,
          usuario: parsedUserData?.id,
        };

        const response = await axios.post(
          "http://localhost:8000/pedido/",
          pedidoData
        );
        const pedidoId = response.data.id;

        await Promise.all(
          selectedInsumos.map(async (insumo) => {
            if (insumo.cantidad && parseFloat(insumo.cantidad) > 0) {
              const itemData = {
                insumo: insumo.id,
                cantidad: parseFloat(insumo.cantidad),
                pedido: pedidoId,
              };
              await axios.post("http://localhost:8000/item-pedido/", itemData);
            }
          })
        );

        toast.success("Pedido creado con éxito");
        formik.resetForm();
        setSelectedInsumos([]);
        setFilteredInsumos([]);
        setNoInsumosMessage(null);
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
        className="shadow-none p-4"
      >
        <form onSubmit={formik.handleSubmit} className="p-4 border rounded">
          <h2 className="text-lg font-bold mb-4">Crear Pedido</h2>

          <div className="mb-4">
            <label className="block">Proveedor:</label>
            <select
              {...formik.getFieldProps("proveedorId")}
              onChange={handleProveedorChange}
              className={`mt-1 block w-full border ${formik.touched.proveedorId && formik.errors.proveedorId
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
                      className="border border-gray-300 rounded-md p-1 w-16"
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <button
            type="submit"
            className="flex items-center bg-blue-500 text-white p-2 rounded"
          >
            <FaPlus className="mr-2" /> Crear Pedido
          </button>
        </form>
      </motion.div>
    </DashboardPage>
  );
};

export default CrearPedido;
