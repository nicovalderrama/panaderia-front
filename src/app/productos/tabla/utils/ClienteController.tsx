import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Producto } from '../page'

interface Client {
  id: number
  nombre_completo: string
  telefono: string
  direccion: string
  tipo_cliente: 'Minorista' | 'Mayorista'
}
interface IProps {
  setSelectedClient: Dispatch<SetStateAction<Client|null>>
  selectedClient: Client|null
}


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ClienteController = ({setSelectedClient, selectedClient}: IProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [clients, setClient] = useState<Client[] | null>(null)
  const [registerValidation, setRegisterValidation] = useState<boolean>(false);

  const [showNewClientForm, setShowNewClientForm] = useState(false)

  const toggleCollapse = () => {
    setIsOpen(!isOpen)

  }

  const handleClientSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const clientId = event.target.value
    const client = clients?.find(c => c.id === +clientId) || null
    setSelectedClient(client)
    setShowNewClientForm(false)
  }

  const handleNewClientClick = () => {
    setRegisterValidation(true)
    setSelectedClient(null)
    setShowNewClientForm(true)
  }

  useEffect(() => {
    fetch(apiUrl + "/cliente/")
            .then((response) => response.json())
            .then((data) => setClient(data))
            .catch((error) => console.error(error));
  },[selectedClient])
  const validationSchema = Yup.object({
    nombre_completo: Yup.string().required('Nombre completo es requerido'),
    telefono: Yup.string().required('Teléfono es requerido'),
    direccion: Yup.string().required('Dirección es requerida'),
    tipo_cliente: Yup.string().oneOf(['Minorista', 'Mayorista'], 'Tipo de cliente inválido').required('Tipo de cliente es requerido'),
  })
 
  return (
    <div className="flex flex-col m-4">
      <motion.a
        onClick={toggleCollapse}
        className="w-full bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? 'Cerrar búsqueda de cliente' : 'Registrar cliente'}
      </motion.a>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-white rounded-md shadow-md overflow-hidden"
          >
            <div className="p-4">
             {!registerValidation && (
               <div> 
                 <h2 className="text-lg font-semibold mb-4">Seleccionar Cliente</h2>
               <select
                 onChange={handleClientSelect}
                 className="w-full p-2 border rounded-md mb-4"
               >
                 <option value="">Seleccione un cliente</option>
                 {clients?.map(client => (
                   <option key={client.id} value={client.id}>
                     {client.nombre_completo}
                   </option>
                 ))}
               </select></div>
             )}

              {selectedClient && (
                <div className="mb-4">
                  <h3 className="font-semibold">Detalles del Cliente:</h3>
                  <p>Nombre: {selectedClient.nombre_completo}</p>
                  <p>Teléfono: {selectedClient.telefono}</p>
                  <p>Dirección: {selectedClient.direccion}</p>
                  <p>Tipo: {selectedClient.tipo_cliente}</p>
                </div>
              )}

              {!selectedClient && !showNewClientForm && (
                <motion.button
                  onClick={handleNewClientClick}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Registrar Nuevo Cliente
                </motion.button>
              )}

              {showNewClientForm && (
                <Formik
                  initialValues={{
                    nombre_completo: '',
                    telefono: '',
                    direccion: '',
                    tipo_cliente: 'Minorista' as 'Minorista' | 'Mayorista',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={() =>{}}
                >
                  {({ isSubmitting }) => (
                    <Form className='w-full m-4'>
                      <div className="mb-4">
                        <label htmlFor="nombre_completo" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                        <Field name="nombre_completo" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        <ErrorMessage name="nombre_completo" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <Field name="telefono" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        <ErrorMessage name="telefono" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección</label>
                        <Field name="direccion" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        <ErrorMessage name="direccion" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="tipo_cliente" className="block text-sm font-medium text-gray-700">Tipo de Cliente</label>
                        <Field name="tipo_cliente" as="select" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                          <option value="Minorista">Minorista</option>
                          <option value="Mayorista">Mayorista</option>
                        </Field>
                        <ErrorMessage name="tipo_cliente" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isSubmitting ? 'Enviando...' : 'Registrar Cliente'}
                      </motion.button>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ClienteController