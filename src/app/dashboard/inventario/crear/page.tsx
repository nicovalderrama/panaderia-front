"use client";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import DashboardPage from "../../page";

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
    <DashboardPage>
      <main className="flex justify-center items-center min-h-screen">
        <div className="flex w-full max-w-5xl">
          <div className="w-1/3 flex justify-center items-center bg-marron-oscuro rounded-lg">
            <img
              src="/logo-marron-elmana-sinfondo.png"
              alt="Logo el mana"
              className="rounded-lg"
            />
          </div>

          <div className="flex w-2/3 shadow-lg bg-[#f5efe6] rounded-xl p-8">
            <div className="w-full">
              <h2 className="text-2xl font-bold text-[#5c4033] mb-6">
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
                    const response = await fetch(
                      "http://localhost:8000/insumos/",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                      }
                    );

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
                  <Form className="space-y-6">
                    {/* Código de los campos del formulario */}
                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="nombre"
                        className="text-lg font-medium text-[#4b2e23]"
                      >
                        Nombre
                      </label>
                      <Field
                        name="nombre"
                        className="border bg-amber-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#b68d6e] shadow-sm"
                      />
                      {errors.nombre && touched.nombre ? (
                        <div className="text-red-500 text-sm">
                          {errors.nombre}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="descripcion"
                        className="text-lg font-medium text-[#4b2e23]"
                      >
                        Descripción
                      </label>
                      <Field
                        name="descripcion"
                        as="textarea"
                        className="border  bg-amber-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#b68d6e] shadow-sm"
                      />
                      {errors.descripcion && touched.descripcion ? (
                        <div className="text-red-500 text-sm">
                          {errors.descripcion}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="stock_actual"
                        className="text-lg font-medium text-[#4b2e23]"
                      >
                        Stock Actual
                      </label>
                      <Field
                        name="stock_actual"
                        type="number"
                        className="border bg-amber-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#b68d6e] shadow-sm"
                      />
                      {errors.stock_actual && touched.stock_actual ? (
                        <div className="text-red-500 text-sm">
                          {errors.stock_actual}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="punto_pedido"
                        className="text-lg font-medium text-[#4b2e23]"
                      >
                        Punto de Pedido
                      </label>
                      <Field
                        name="punto_pedido"
                        type="number"
                        className="border bg-amber-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#b68d6e] shadow-sm"
                      />
                      {errors.punto_pedido && touched.punto_pedido ? (
                        <div className="text-red-500 text-sm">
                          {errors.punto_pedido}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="precio_comprado"
                        className="text-lg font-medium text-[#4b2e23]"
                      >
                        Precio Comprado
                      </label>
                      <Field
                        name="precio_comprado"
                        type="number"
                        className="border bg-amber-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#b68d6e] shadow-sm"
                      />
                      {errors.precio_comprado && touched.precio_comprado ? (
                        <div className="text-red-500 text-sm">
                          {errors.precio_comprado}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="proveedor_frecuente"
                        className="text-lg font-medium text-[#4b2e23]"
                      >
                        Proveedor Frecuente
                      </label>
                      <Field
                        as="select"
                        name="proveedor_frecuente"
                        className="mt-1 block w-full bg-amber-200 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b68d6e] shadow-sm"
                      >
                        <option value="">Seleccione un proveedor</option>
                        {proveedores.map((proveedor: any) => (
                          <option key={proveedor.id} value={proveedor.id}>
                            {proveedor.nombre}
                          </option>
                        ))}
                      </Field>
                      {errors.proveedor_frecuente &&
                      touched.proveedor_frecuente ? (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.proveedor_frecuente}
                        </div>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 px-4 rounded-lg bg-marron-oscuro text-white font-medium hover:bg-[#714e36] focus:outline-none focus:ring-2 focus:ring-[#b68d6e]"
                    >
                      Crear Insumo
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </main>
    </DashboardPage>
  );
};

export default CrearInsumo;
