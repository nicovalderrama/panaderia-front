"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import jsPDF from "jspdf";
import { useParams, useRouter } from "next/navigation";
import DashboardPage from "@/app/dashboard/page";
import { useAuth } from "@/app/context/hooks/useAuth";

interface IPedido {
  id: number;
  numero_pedido: string;
  fecha_solicitud: string;
  usuario: string;
  proveedor: number;
  total: number;
  items: IItemPedido[]; // Añadido aquí para reflejar los items anidados
}

interface IItemPedido {
  id: number;
  insumo: { nombre: string };
  cantidad: number;
  precio: number;
  pedido_id: number;
}

export default function PedidoDetailPage() {
  const { id } = useParams();
  const [pedidoData, setPedidoData] = useState<IPedido | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const {user} = useAuth()
  const {push} = useRouter()
  useEffect(() => {
    if (user) {
      if (user.role !== 'gerente') {
        push('/dashboard');
      }
    }
  }, [user, push]);

  useEffect(() => {
    // Obtener datos del pedido con los items anidados
    fetch(apiUrl + `/pedido/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setPedidoData(data); // Los items ahora vienen dentro de 'data'
      })
      .catch((error) => console.error("Error fetching order data:", error));
  }, [id]);

  const generarPDF = () => {
    if (!pedidoData || !pedidoData.items || pedidoData.items.length === 0)
      return;

    const doc = new jsPDF();

    // Añadir logo
    doc.addImage("/logo-claro-elmana.png", "PNG", 10, 10, 50, 50);

    // Título
    doc.setFontSize(22);
    doc.setTextColor(139, 69, 19);
    doc.text("Detalles del Pedido", 105, 40, { align: "center" });

    // Información del pedido
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Nº de Pedido: ${pedidoData.numero_pedido}`, 20, 60);
    doc.text(`Fecha: ${pedidoData.fecha_solicitud}`, 20, 70);
    doc.text(`Usuario: ${pedidoData.usuario}`, 20, 80);

    // Tabla de items
    let y = 100;
    doc.line(20, y, 190, y);
    y += 10;
    doc.text("Producto", 30, y);
    doc.text("Cantidad", 100, y);
    doc.text("Precio", 150, y);
    y += 10;
    doc.line(20, y, 190, y);

    pedidoData.items.forEach((item) => {
      // Cambiar items a pedidoData.items
      y += 10;
      doc.text(item.insumo.nombre, 30, y);
      doc.text(String(item.cantidad), 100, y);
      doc.text(`$${item.precio}`, 150, y);
    });

    y += 20;
    doc.setFontSize(14);
    doc.text(`Total: $${pedidoData.total}`, 150, y);

    doc.setFontSize(10);
    doc.text("Gracias por su compra en El Maná", 105, 280, { align: "center" });

    doc.save(`pedido-${pedidoData.id}.pdf`);
  };


  if (!pedidoData) return <div>Cargando...</div>;

  return (
    <DashboardPage>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="flex flex-col justify-center bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-[#8B4513] mb-6">
            Detalles del Pedido
          </h1>
          <div className="mb-4">
            <p className="text-lg">
              <span className="font-semibold">Nº de Pedido:</span>{" "}
              {pedidoData.numero_pedido}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Fecha:</span>{" "}
              {pedidoData.fecha_solicitud}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Usuario:</span>{" "}
              {pedidoData.usuario}
            </p>
          </div>
          <table className="mb-4 w-full">
            <thead>
              <tr>
                <th className="text-left">Producto</th>
                <th className="text-left">Cantidad</th>
                <th className="text-left">Precio</th>
              </tr>
            </thead>
            <tbody>
              {pedidoData.items.map(
                (
                  item // Cambiar items a pedidoData.items
                ) => (
                  <tr key={item.id}>
                    <td>{item.insumo.nombre}</td>
                    <td>{item.cantidad}</td>
                    <td>${item.precio}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <p className="text-xl font-bold text-right mb-6">
            Total: ${pedidoData.total}
          </p>
          <button
            onClick={generarPDF}
            className="w-full bg-[#8B4513] text-white font-bold py-2 px-4 rounded hover:bg-[#A0522D] transition duration-300"
          >
            Descargar PDF
          </button>
        </div>
      </div>
    </DashboardPage>
  );
}
