"use client";
import React, { useState } from "react";
import Image from "next/image";
import { initialValuesProducto as initialValues } from "./utils/initialValues";
import { validationSchemaProducto } from "./utils/validation.yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Bounce, toast, ToastContainer } from "react-toastify";


export default function agregarProducto() {

  const handleSubmit = async (values: any, { resetForm }: { resetForm: any }) => {
    try {
      const response = await fetch("http://localhost:8000/productos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      toast.success('Cargado con exito', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      resetForm()
    } catch (error) {
      toast.error("Hubo un error al agregar el producto. Inténtalo de nuevo.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.error("Error en la petición POST:", error);
    }
  };
  return (
    <main className="bg-[#ebc68e] flex justify-center items-center min-h-screen">

      <div className="flex w-full ml-12 mr-12 shadow">
        <div className="flex w-[32rem] items-center justify-center bg-center bg-cover brightness-50 rounded-lg shadow">
          <Image
            src="/logo-marron-elmana.png"
            alt="Logo Marron"
            width={500}
            height={500}
            className="rounded-lg shadow"
          />
        </div>

        <div className="flex w-full p-12 rounded-xl bg-amber-50">
          <div className="w-72">
            <h3 className="text-xl font-bold text-stone-500">
              Agregar un Producto
            </h3>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemaProducto}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col items-center justify-center w-full">
                <fieldset className="flex flex-col pt-8 text-amber-900">
                  <div className="flex flex-col mt-2 mb-2">
                    <label
                      className="font-bold text-amber-900"
                      htmlFor="nombre_producto"
                    >
                      Nombre del producto:
                    </label>
                    <Field
                      type="text"
                      className="w-full max-w-xs input input-bordered bg-amber-100 focus:outline-none"
                      name="nombre"
                    />
                    <ErrorMessage
                      name="nombre"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="flex flex-col mt-2 mb-2">
                    <label
                      className="font-bold text-amber-900"
                      htmlFor="descripcion_producto"
                    >
                      Descripción del producto:
                    </label>
                    <Field
                      type="text"
                      className="w-full max-w-xs input input-bordered bg-amber-100 focus:outline-none"
                      name="descripcion"
                    />
                    <ErrorMessage
                      name="descripcion"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="flex flex-col mt-2 mb-2">
                    <label
                      className="font-bold text-amber-900"
                      htmlFor="categoria_producto"
                    >
                      Seleccione la categoría del producto:
                    </label>
                    <Field
                      as="select"
                      className="w-full max-w-xs select select-ghost bg-amber-100 focus:outline-none"
                      name="categoria"
                    >
                      <option value="" disabled>
                        Seleccione una categoría
                      </option>
                      <option value="panificacion">Panificación</option>
                      <option value="pasteleria">Pastelería</option>
                    </Field>
                    <ErrorMessage
                      name="categoria"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="flex flex-col mt-2 mb-2">
                    <label
                      className="font-bold text-amber-900"
                      htmlFor="precio_producto"
                    >
                      Precio del producto:
                    </label>
                    <Field
                      className="w-full max-w-xs input input-bordered bg-amber-100 focus:outline-none"
                      type="number"
                      name="precio"
                      min="1"
                    />
                    <ErrorMessage
                      name="precio"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="flex flex-col mt-2 mb-2">
                    <label
                      className="font-bold text-amber-900"
                      htmlFor="cantidad_disponible"
                    >
                      Cantidad para la venta del producto:
                    </label>
                    <Field
                      className="w-full max-w-xs input input-bordered bg-amber-100 focus:outline-none"
                      type="number"
                      name="cantidad_disponible"
                      min="1"
                    />
                    <ErrorMessage
                      name="cantidad_disponible"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </fieldset>

                <div className="flex mt-4 mb-4">
                  <button
                    className="px-3 py-1 mr-3 text-[#5c3826] border border-[#5c3826] rounded hover:bg-[#5c3826] hover:text-white"
                    type="reset"
                  >
                    Cancelar
                  </button>
                  <button
                    className="px-3 py-1 text-[#5c3826] border-[#5c3826] rounded marron-principal hover:text-white hover:bg-[#5c3826]"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Enviar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      
    </main>
  );
}
