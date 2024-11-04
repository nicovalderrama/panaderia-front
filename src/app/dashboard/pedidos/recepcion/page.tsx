"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import DashboardPage from "../../page";
import Image from "next/image";

interface Pedido {
  id: number;
  numero_pedido: string;
  estado: string;
}

interface Empleado {
  id: number;
  nombre: string;
}

interface ItemPedido {
  insumo: number;
  cantidad: number;
}

const RecepcionPedido: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [itemsPedido, setItemsPedido] = useState<ItemPedido[]>([]);

  const fetchPedidos = async () => {
    const response = await axios.get("http://localhost:8000/pedido/");
    const pedidosNoRecibidos = response.data.filter(
      (pedido: Pedido) => pedido.estado !== "recibido"
    );
    setPedidos(pedidosNoRecibidos);
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const formik = useFormik({
    initialValues: {
      pedidoId: "",
      recibidoPorId: "",
      observaciones: "",
    },
    validationSchema: Yup.object({
      pedidoId: Yup.string().required("Requerido"),
      recibidoPorId: Yup.string().required("Requerido"),
      observaciones: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        await axios.patch(`http://localhost:8000/pedido/${values.pedidoId}/`, {
          estado: "recibido",
        });

        await axios.post("http://localhost:8000/recepcion-pedido/", {
          pedido: values.pedidoId,
          recibido_por: values.recibidoPorId,
          observaciones: values.observaciones,
        });
        await Promise.all(
          itemsPedido.map(async (item) => {
            if (item.cantidad > 0) {
              const insumoResponse = await axios.get(
                `http://localhost:8000/insumos/${item.insumo}/`
              );
              const nuevoStock =
                insumoResponse.data.stock_actual + item.cantidad;

              await axios.patch(
                `http://localhost:8000/insumos/${item.insumo}/`,
                {
                  stock_actual: nuevoStock,
                }
              );
            }
          })
        );

        toast.success(
          "Recepción de pedido registrada y stock actualizado con éxito"
        );
        formik.resetForm();
        await fetchPedidos();
      } catch (error) {
        console.error("Error al registrar la recepción del pedido", error);
        toast.error("Error al registrar la recepción del pedido");
      }
    },
  });

  useEffect(() => {
    if (formik.values.pedidoId) {
      const fetchEmpleados = async () => {
        const response = await axios.get("http://localhost:8000/empleado/");
        setEmpleados(response.data);
      };
      fetchEmpleados();

      const fetchItemsPedido = async () => {
        const response = await axios.get(
          `http://localhost:8000/item-pedido/?pedido=${formik.values.pedidoId}`
        );
        setItemsPedido(response.data);
      };
      fetchItemsPedido();
    }
  }, [formik.values.pedidoId]);

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
          <h2 className="text-lg font-bold mb-4">Recepción de Pedido</h2>

          <div className="mb-4">
            <label className="block">Pedido:</label>
            <select
              {...formik.getFieldProps("pedidoId")}
              className="mt-1 bg-marron-principal block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Seleccionar pedido</option>
              {pedidos.map((pedido) => (
                <option key={pedido.id} value={pedido.id}>
                  {pedido.numero_pedido}
                </option>
              ))}
            </select>
          </div>

          {formik.values.pedidoId && (
            <div className="mb-4">
              <label className="block ">Empleado que recibe:</label>
              <select
                {...formik.getFieldProps("recibidoPorId")}
                className="mt-1 bg-marron-principal block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Seleccionar empleado</option>
                {empleados.map((empleado) => (
                  <option key={empleado.id} value={empleado.id}>
                    {empleado.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="block">Observaciones:</label>
            <textarea
              {...formik.getFieldProps("observaciones")}
              className="mt-1 bg-marron-principal block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <button
            type="submit"
            className="flex items-center bg-green-900 hover:bg-green-600 text-white p-2 rounded"
          >
            <FaCheck className="mr-2" /> Registrar Recepción
          </button>
        </form>
      </motion.div>
    </DashboardPage>
  );
};

export default RecepcionPedido;
