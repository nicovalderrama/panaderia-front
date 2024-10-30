'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import jsPDF from 'jspdf'
import { useParams } from 'next/navigation'
import * as XLSX from 'xlsx'
import DashboardPage from '@/app/dashboard/page'
interface IVenta {
    id: number,
    fecha_venta: string,
    tipo_venta: string,
    forma_pago: string,
    tipo_comprobante: string,
    numero_comprobante: string,
    cliente_nombre_completo: string,
    total_monto_venta: number,
    user_name_venta: string,
    items: IItems[]
}
interface IItems {
  cantidad: number,
  monto_total: string,
  producto_nombre: string,
  producto_precio: number 
}
export default function ComprobantePage() {
  const { id } = useParams();

  const [ventaData, setVentaData] = useState<IVenta | null>(null)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(apiUrl + `/venta/${id}/`)
        .then((response) => response.json())
        .then((data) => setVentaData(data))
        .catch((error) => console.error(error));
    
}, [])

const generarPDF = () => {
  if (!ventaData) return;

  const doc = new jsPDF()

  // Añadir logo
  doc.addImage('/logo-claro-elmana.png', 'PNG', 10, 10, 50, 50)

  // Título
  doc.setFontSize(22)
  doc.setTextColor(139, 69, 19) // Color marrón
  doc.text('Comprobante de Venta', 105, 40, { align: 'center' })

  // Información de la venta
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text(`Nº de Venta: ${ventaData.id}`, 20, 60)
  doc.text(`Fecha: ${ventaData.fecha_venta}`, 20, 70)
  doc.text(`Cliente: ${ventaData.cliente_nombre_completo}`, 20, 80)
  doc.text(`Forma de pago: ${ventaData.forma_pago}`, 20, 90)
  doc.text(`Tipo de comprobante: ${ventaData.tipo_comprobante}`, 20, 100)
  doc.text(`Número de comprobante: ${ventaData.numero_comprobante}`, 20, 110)

  // Tabla de items
  let y = 130
  doc.line(20, y, 190, y)
  y += 10
  doc.text('Producto', 30, y)
  doc.text('Cantidad', 100, y)
  doc.text('Precio', 150, y)
  y += 10
  doc.line(20, y, 190, y)

  ventaData.items.forEach(item => {
    y += 10
    doc.text(item.producto_nombre, 30, y)
    doc.text(item.cantidad.toString(), 110, y)
    doc.text(`$${item.producto_precio}`, 150, y)
  })

  y += 10
  doc.line(20, y, 190, y)
  y += 10
  doc.setFontSize(14)
  doc.text(`Total: $${ventaData.total_monto_venta}`, 150, y)

  doc.setFontSize(10)
  doc.text('Gracias por su compra en El Maná', 105, 280, { align: 'center' })

  doc.save(`comprobante-${ventaData.id}.pdf`)
}

const generarExcel = () => {
  if (!ventaData) return;

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet([
    {
      'Nº de Venta': ventaData.id,
      'Fecha': ventaData.fecha_venta,
      'Cliente': ventaData.cliente_nombre_completo,
      'Forma de pago': ventaData.forma_pago,
      'Tipo de comprobante': ventaData.tipo_comprobante,
      'Número de comprobante': ventaData.numero_comprobante,
      'Total': ventaData.total_monto_venta
    }
  ]);

  XLSX.utils.sheet_add_json(worksheet, ventaData.items.map(item => ({
    'Producto': item.producto_nombre,
    'Cantidad': item.cantidad,
    'Precio': item.producto_precio,
    'Total': item.monto_total
  })), { origin: 'A3' });

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Comprobante');
  XLSX.writeFile(workbook, `comprobante-${ventaData.id}.xlsx`);
}

  if (!ventaData) return <div>Cargando...</div>

  return (
    <DashboardPage>
      <div className="min-h-screen  flex flex-col items-center justify-center p-4">
      <div className="flex flex-col justify-center bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <Image
          src="/logo-claro-elmana.png"
          alt="logo de panadería el maná"
          width={80}
          height={80}
          className="rounded-full flex place-items-center"
        />
        <h1 className="text-3xl font-bold text-center text-[#8B4513] mb-6">Comprobante de Venta</h1>
        <div className="mb-4">
          <p className="text-lg"><span className="font-semibold">Nº de Venta:</span> {ventaData.id}</p>
          <p className="text-lg"><span className="font-semibold">Fecha:</span> {ventaData.fecha_venta}</p>
          <p className="text-lg"><span className="font-semibold">forma pago:</span> {ventaData.forma_pago}</p>
          <p className="text-lg"><span className="font-semibold">numero comprobante:</span> {ventaData.numero_comprobante}</p>
          <p className="text-lg"><span className="font-semibold">tipo comprobante:</span> {ventaData.tipo_comprobante}</p>
          <p className="text-lg"><span className="font-semibold">tipo venta:</span> {ventaData.tipo_venta}</p>
          <p className="text-lg"><span className="font-semibold">user name venta:</span> {ventaData.user_name_venta}</p>
          <p className="text-lg"><span className="font-semibold">Cliente:</span> {ventaData.cliente_nombre_completo}</p>
        </div>
        <div className="border-t border-b border-[#8B4513] py-4 mb-4">
          {ventaData.items.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{item.producto_nombre} x{item.cantidad}</span>
              <span>${item.producto_precio}</span>
            </div>
          ))}
        </div>
        <p className="text-xl font-bold text-right mb-6">Total: ${ventaData.total_monto_venta}</p>
        <button
          onClick={generarPDF}
          className="w-full bg-[#8B4513] text-white font-bold py-2 px-4 rounded hover:bg-[#A0522D] transition duration-300"
        >
          Descargar PDF
        </button>
      </div>
    </div>
    </DashboardPage>
  )
}