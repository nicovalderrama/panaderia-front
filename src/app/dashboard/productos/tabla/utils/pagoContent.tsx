import React, { Dispatch, SetStateAction, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import ClienteController from './ClienteController'
import { CartItem } from '../page'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/hooks/useAuth'

interface SaleFormData {
    fecha_venta: string
    tipo_venta: string
    forma_pago: string
    tipo_comprobante: string
    numero_comprobante: string
    cliente: number
}

const initialValues: SaleFormData = {
    fecha_venta: new Date().toISOString().split('T')[0],
    tipo_venta: "Online",
    forma_pago: "Tarjeta",
    tipo_comprobante: "Factura",
    numero_comprobante: "001-00012345",
    cliente: 1,
}

const validationSchema = Yup.object({
    fecha_venta: Yup.date().required('La fecha es requerida'),
    tipo_venta: Yup.string().required('El tipo de venta es requerido'),
    forma_pago: Yup.string().required('La forma de pago es requerida'),
    tipo_comprobante: Yup.string().required('El tipo de comprobante es requerido'),
    numero_comprobante: Yup.string().required('El número de comprobante es requerido'),
    cliente: Yup.number().required('El ID del cliente es requerido'),
})
interface Client {
    id: number
    nombre_completo: string
    telefono: string
    direccion: string
    tipo_cliente: 'Minorista' | 'Mayorista'
  }
interface IProps {
    setModalPago: Dispatch<SetStateAction<boolean>>;
    cartItems: CartItem[];
    total: number;

}

export const PagoContent = ({ setModalPago, cartItems, total }: IProps) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const {user} = useAuth()
  const router = useRouter()
    const handleSubmit = async (values: SaleFormData, { setSubmitting }: any) => {
            const {fecha_venta, tipo_venta, tipo_comprobante, forma_pago, numero_comprobante} = values
            const productTotal = cartItems.map(data => {
                return {
                    cantidad: data.quantity,
                    producto_id: data.producto.id,
                    producto_precio_unidad: data.quantity > 3 ? data.producto.precio_mayorista: data.producto.precio_lista,
                    tipo_precio: data.quantity > 3 ? 'mayorista' : 'lista',
                    monto_total: (data.quantity > 3 ? data.producto.precio_mayorista: data.producto.precio_lista) * data.quantity,
                }
            })
            try {
              const ventaData = {
                fecha_venta,  
                tipo_venta,
                forma_pago,
                tipo_comprobante,
                numero_comprobante,
                cliente: selectedClient?.id,
                items: productTotal,
                user_name_venta: user?.username,
                total_monto_venta: total,
              };
              const response = await fetch('http://localhost:8000/venta/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(ventaData),
              });
          
              if (!response.ok) {
                throw new Error('Error al registrar la venta');
              }
          
              const result = await response.json();
              router.push(`/dashboard/productos/venta/${result.id}`)
              toast.success('Venta registrada exitosamente')
            } catch (error) {
              console.error(error);
              toast.warn('no se pudo registrar la venta')
            }
          
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-3/4 overflow-y-auto max-h-96  p-6 bg-white rounded-lg shadow-xl"
        >
            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold mb-6 text-center">Completar Venta</h2>
                <button onClick={() => setModalPago(false)} className="text-gray-500 hover:text-gray-700">
                    x
                </button>
            </div>
            <ClienteController  setSelectedClient = {setSelectedClient} selectedClient={selectedClient}/>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="mb-4">
                                <label htmlFor="fecha_venta" className="block text-sm font-medium text-gray-700">Fecha de Venta</label>
                                <Field name="fecha_venta" type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                <ErrorMessage name="fecha_venta" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="mb-4">
                                <label htmlFor="tipo_venta" className="block text-sm font-medium text-gray-700">Tipo de Venta</label>
                                <Field name="tipo_venta" as="select" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    <option value="Online">Online</option>
                                    <option value="Presencial">Presencial</option>
                                </Field>
                                <ErrorMessage name="tipo_venta" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="mb-4">
                                <label htmlFor="forma_pago" className="block text-sm font-medium text-gray-700">Forma de Pago</label>
                                <Field name="forma_pago" as="select" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    <option value="Tarjeta">Tarjeta</option>
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="Transferencia">Transferencia</option>
                                </Field>
                                <ErrorMessage name="forma_pago" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="mb-4">
                                <label htmlFor="tipo_comprobante" className="block text-sm font-medium text-gray-700">Tipo de Comprobante</label>
                                <Field name="tipo_comprobante" as="select" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    <option value="Factura">Factura</option>
                                    <option value="Boleta">Boleta</option>
                                    <option value="Ticket">Ticket</option>
                                </Field>
                                <ErrorMessage name="tipo_comprobante" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="mb-4">
                                <label htmlFor="numero_comprobante" className="block text-sm font-medium text-gray-700">Número de Comprobante</label>
                                <Field name="numero_comprobante" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                <ErrorMessage name="numero_comprobante" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300"
                            >
                                {isSubmitting ? 'Enviando...' : 'Completar Venta'}
                            </button>
                        </motion.div>
                    </Form>
                )}
            </Formik>
        </motion.div>
    )
}
