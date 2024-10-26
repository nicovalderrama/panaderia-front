"use client";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// Validación con Yup
const InsumoSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio"),
  descripcion: Yup.string().required("La descripción es obligatoria"),
  stock_actual: Yup.number().required("El stock actual es obligatorio"),
  punto_pedido: Yup.number().required("El punto de pedido es obligatorio"),
  precio_comprado: Yup.number().required("El precio es obligatorio"),
  proveedor_frecuente: Yup.string().required("Debe seleccionar un proveedor"),
});

const CrearInsumo = () => {
  const [proveedores, setProveedores] = useState([]);

  // Obtener los proveedores al montar el componente
  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/proveedor/");
        const data = await response.json();
        setProveedores(data);
      } catch (error) {
        console.error("Error al obtener los proveedores:", error);
      }
    };

    obtenerProveedores();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Crear Nuevo Insumo
      </h2>
      <Formik
        initialValues={{
          nombre: "",
          descripcion: "",
          stock_actual: "",
          punto_pedido: "",
          precio_comprado: "",
          proveedor_frecuente: "",
        }}
        validationSchema={InsumoSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const response = await fetch("http://localhost:8000/insumos/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });

            if (response.ok) {
              toast.success("Insumo creado con éxito");
              resetForm();
            } else {
              toast.error("Error al crear el insumo");
              console.error("Error en la respuesta:", response);
            }
          } catch (error) {
            console.error("Error al crear insumo:", error);
            toast.error("Error al crear el insumo");
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <Field
                name="nombre"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.nombre && touched.nombre ? (
                <div className="text-red-500 text-sm mt-1">{errors.nombre}</div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción
              </label>
              <Field
                name="descripcion"
                as="textarea"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.descripcion && touched.descripcion ? (
                <div className="text-red-500 text-sm mt-1">
                  {errors.descripcion}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="stock_actual"
                className="block text-sm font-medium text-gray-700"
              >
                Stock Actual
              </label>
              <Field
                name="stock_actual"
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.stock_actual && touched.stock_actual ? (
                <div className="text-red-500 text-sm mt-1">
                  {errors.stock_actual}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="punto_pedido"
                className="block text-sm font-medium text-gray-700"
              >
                Punto de Pedido
              </label>
              <Field
                name="punto_pedido"
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.punto_pedido && touched.punto_pedido ? (
                <div className="text-red-500 text-sm mt-1">
                  {errors.punto_pedido}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="precio_comprado"
                className="block text-sm font-medium text-gray-700"
              >
                Precio Comprado
              </label>
              <Field
                name="precio_comprado"
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.precio_comprado && touched.precio_comprado ? (
                <div className="text-red-500 text-sm mt-1">
                  {errors.precio_comprado}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="proveedor_frecuente"
                className="block text-sm font-medium text-gray-700"
              >
                Proveedor Frecuente
              </label>
              <Field
                as="select"
                name="proveedor_frecuente"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Seleccione un proveedor</option>
                {proveedores.map((proveedor: any) => (
                  <option key={proveedor.id} value={proveedor.id}>
                    {proveedor.nombre}
                  </option>
                ))}
              </Field>
              {errors.proveedor_frecuente && touched.proveedor_frecuente ? (
                <div className="text-red-500 text-sm mt-1">
                  {errors.proveedor_frecuente}
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Crear Insumo
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CrearInsumo;
