"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { validationSchemaProducto } from "./utils/validation.yup";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { Bounce, toast, ToastContainer } from "react-toastify";
import ImageUpload from "../../../../components/imageUploader";
import { useParams, useRouter } from "next/navigation";
import DashboardPage from "@/app/dashboard/page";

interface ProductoValues {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  unidad: string;
  precio_lista: number;
  precio_mayorista: number;
  cantidad_disponible: number;
  imagen?: string;
}
const units = [
  { value: 'kilo', label: 'Kilo' },
  { value: 'unidad', label: 'Unidad' },
]
export default function EditarProducto() {
  const [image, setImage] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [producto, setProducto] = useState<ProductoValues | null>(null);
  const { id: productId } = useParams();
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `http://localhost:8000/productos/${productId}/`
      );
      const data = await response.json();
      setProducto(data);
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (
    values: ProductoValues,
    { resetForm }: FormikHelpers<ProductoValues>
  ) => {
    const formData = new FormData();
    if (image) {
      formData.append("imagen", image);
    }
    formData.append("nombre", values.nombre);
    formData.append("descripcion", values.descripcion);
    formData.append("unidad", values.unidad);
    formData.append("precio_lista", values.precio_lista.toString());
    formData.append("precio_mayorista", values.precio_mayorista.toString());
    formData.append(
      "cantidad_disponible",
      values.cantidad_disponible.toString()
    );
    formData.append("categoria", values.categoria);

    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const response = await fetch(
        `http://localhost:8000/productos/${values.id}/`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      toast.success("Producto editado con éxito", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setIsSuccess(true);
      resetForm();
      setImage(null);
     setTimeout(() => {
      router.push('/dashboard/productos/gestionar')
     }, 2000)
    } catch (error) {
      toast.error("Hubo un error al editar el producto. Inténtalo de nuevo.", {
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
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.currentTarget.files;
    if (fileList && fileList.length > 0) {
      setImage(fileList[0]);
    } else {
      setImage(null);
    }
  };

  if (!producto) return <div>Cargando...</div>;

  return (
    <DashboardPage>
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
                Editar Producto
              </h3>
            </div>

            <Formik
              initialValues={{
                id: producto.id,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                unidad: producto.unidad,
                categoria: producto.categoria,
                precio_lista: producto.precio_lista,
                precio_mayorista: producto.precio_mayorista,
                cantidad_disponible: producto.cantidad_disponible,
              }}
              validationSchema={validationSchemaProducto}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, resetForm }) => (
                <Form className="flex flex-col items-center justify-center w-full">
                  <fieldset className="flex flex-col pt-8 text-amber-900">
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

                    <div className="flex flex-col mt-2 mb-2">
                      <label className="font-bold text-amber-900">
                        Precio de lista del producto:
                      </label>
                      <Field
                        className="w-full max-w-xs input input-bordered bg-amber-100 focus:outline-none"
                        type="number"
                        name="precio_lista"
                        min="1"
                      />
                      <ErrorMessage
                        name="precio_lista"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="flex flex-col mt-2 mb-2">
                      <label className="font-bold text-amber-900">
                        Precio mayorista del producto:
                      </label>
                      <Field
                        className="w-full max-w-xs input input-bordered bg-amber-100 focus:outline-none"
                        type="number"
                        name="precio_mayorista"
                        min="1"
                      />
                      <ErrorMessage
                        name="precio_mayorista"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="flex flex-col mt-2 mb-2">
                      <label className="font-bold text-amber-900">
                        Seleccione unidad:
                      </label>
                      <Field
                        as="select"
                        className="w-full max-w-xs select select-ghost bg-amber-100 focus:outline-none"
                        name="unidad"
                      >
                        <option value="" disabled>Seleccione una unidad</option>
                        {units.map((unit) => (
                          <option key={unit.value} value={unit.value}>
                            {unit.label}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <ImageUpload onImageChange={setImage} />

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
                      className={`w-48 px-4 py-2 rounded transition-colors duration-300 ${isSubmitting
                          ? "bg-[#5c3826] text-white"
                          : isSuccess
                            ? "bg-green-700 text-white"
                            : "bg-[#ebc68e] text-[#5c3826] hover:bg-[#d6b765]"
                        } flex items-center justify-center`}
                    >
                      {isSubmitting ? (
                        <FaSpinner className="animate-spin" />
                      ) : isSuccess ? (
                        <FaCheckCircle />
                      ) : (
                        "Editar"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <ToastContainer transition={Bounce} />
          </div>
        </div>
      </main>
    </DashboardPage>
  );
}
