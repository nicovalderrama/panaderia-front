"use client";
import React, { useState } from "react";
import Image from "next/image";
import { initialValuesProducto as initialValues } from "./utils/initialValues";
import { validationSchemaProducto } from "./utils/validation.yup";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { Bounce, toast, ToastContainer } from "react-toastify";
import ImageUpload from "../../components/imageUploader";

interface ProductoValues {
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  cantidad_disponible: number;
  imagen?: string; // Cambiado a string para la URL de la imagen
}

export default function AgregarProducto() {
  const [image, setImage] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    values: ProductoValues,
    { resetForm }: FormikHelpers<ProductoValues>
  ) => {
    // Validación de imagen antes de proceder
    if (!image) {
      toast.error("Por favor, sube una imagen.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const formData = new FormData();
    formData.append("imagen", image);
    formData.append("nombre", values.nombre);
    formData.append("descripcion", values.descripcion);
    formData.append("precio", values.precio.toString());
    formData.append(
      "cantidad_disponible",
      values.cantidad_disponible.toString()
    );
    formData.append("categoria", values.categoria);

    setIsSubmitting(true); // Comenzar la solicitud
    setIsSuccess(false); // Restablecer el estado de éxito

    try {
      const response = await fetch("http://localhost:8000/productos/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      toast.success("Producto agregado con éxito", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setIsSuccess(true); // Cambiar a éxito
      resetForm(); // Reiniciar el formulario
      setImage(null); // Limpiar el estado de la imagen
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
      });
      console.error("Error en la petición:", error);
    } finally {
      setIsSubmitting(false); // Finalizar la solicitud
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.currentTarget.files;
    if (fileList && fileList.length > 0) {
      setImage(fileList[0]); // Guardar la imagen seleccionada
    } else {
      setImage(null); // Limpiar si no hay archivo
    }
  };

  return (
    <main className="bg-[#ebc68e] flex justify-center items-center min-h-screen">
      <div className="flex w-full ml-12 mr-12 shadow">
        <div className="flex w-[32rem] items-center justify-center bg-center bg-cover brightness-50 rounded-lg shadow bg-marron-oscuro">
          <Image
            src="/logo-marron-elmana.png"
            alt="Logo Marron"
            width={500}
            height={500}
            className="rounded-lg"
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
            {({ isSubmitting, resetForm }) => (
              <Form className="flex flex-col items-center justify-center w-full">
                <fieldset className="flex flex-col pt-8 text-amber-900">
                  {/* Nombre del producto */}
                  <div className="flex flex-col mt-2 mb-2">
                    <label className="font-bold text-amber-900">
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

                  {/* Descripción */}
                  <div className="flex flex-col mt-2 mb-2">
                    <label className="font-bold text-amber-900">
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

                  {/* Categoría */}
                  <div className="flex flex-col mt-2 mb-2">
                    <label className="font-bold text-amber-900">
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

                  {/* Precio */}
                  <div className="flex flex-col mt-2 mb-2">
                    <label className="font-bold text-amber-900">
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

                  {/* Imagen */}
                  <ImageUpload onImageChange={setImage} />

                  {/* Cantidad disponible */}
                  <div className="flex flex-col mt-2 mb-2">
                    <label className="font-bold text-amber-900">
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

                {/* Botones */}
                <div className="flex justify-center mt-8 space-x-4">
                  <button
                    type="reset"
                    className="w-48 px-4 py-2 rounded bg-[#5c3826] text-white hover:bg-[#4b2b1f] flex items-center justify-center"
                    onClick={() => resetForm()}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-48 px-4 py-2 rounded transition-colors duration-300 ${
                      isSubmitting
                        ? "bg-[#5c3826] text-white"
                        : isSuccess
                        ? "bg-green-700 text-white"
                        : "bg-[#ebc68e] text-[#5c3826]"
                    } hover:bg-[#5c3826] hover:text-white flex items-center justify-center`}
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" /> Agregando...
                      </>
                    ) : isSuccess ? (
                      <>
                        <FaCheckCircle className="mr-2" /> Agregado con éxito
                      </>
                    ) : (
                      "Agregar Producto"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <ToastContainer />
    </main>
  );
}