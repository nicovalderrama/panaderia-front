
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup'
const apiUrl = "http://localhost:8000"; // URL base de tu API
interface Client {
    id: number
    nombre_completo: string
    telefono: string
    direccion: string
    tipo_cliente: 'Minorista' | 'Mayorista'
  }
interface IProps {
    setSelectedClient: Dispatch<SetStateAction<Client|null>>
    setShowNewClientForm: Dispatch<SetStateAction<boolean>>

  }
export const RegisterClient = ({setSelectedClient, setShowNewClientForm}:IProps) => {
    const validationSchema = Yup.object({
        nombre_completo: Yup.string().required('Nombre completo es requerido'),
        telefono: Yup.string().required('Teléfono es requerido'),
        direccion: Yup.string().required('Dirección es requerida'),
        tipo_cliente: Yup.string().oneOf(['Minorista', 'Mayorista'], 'Tipo de cliente inválido').required('Tipo de cliente es requerido'),
    })
    const handleSubmit = async (values: any, { setSubmitting, resetForm }: { setSubmitting: any, resetForm: any }) => {
        try {
            const response = await fetch(`${apiUrl}/cliente/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Ocurrió un error al registrar el cliente.");
            }

            const data = await response.json();
            setSelectedClient(data)
            setShowNewClientForm(false)
            toast.success('cliente registrado exitosamente')
            // Reiniciar el formulario después de la confirmación
            resetForm();
        } catch (error) {
            console.error("Error en el registro:", error);
        } finally {
            setSubmitting(false); // Para finalizar el estado de carga
        }
    };

    return (
        <>
            <Formik
                initialValues={{
                    nombre_completo: '',
                    telefono: '',
                    direccion: '',
                    tipo_cliente: 'Minorista' as 'Minorista' | 'Mayorista',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className='w-full m-4' >
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

                        <button
                            disabled={isSubmitting}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300"
                        >
                            {isSubmitting ? 'Enviando...' : 'Registrar Cliente'}
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    )
}