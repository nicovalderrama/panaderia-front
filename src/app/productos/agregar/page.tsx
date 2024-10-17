"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function agregarProducto() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setdescripcionProducto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const productoData = {
      nombre: nombre,
      descripcion: descripcion,
      categoria: categoria,
      precio: precio,
      cantidad_disponible: stock,
    };

    try {
      console.log(productoData);
      const response = await fetch("http://localhost:8000/productos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      const data = await response.json();
      console.log("Producto enviado exitosamente:", data);
    } catch (error) {
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

          <form
            className="flex flex-col items-center justify-center w-full"
            onSubmit={handleSubmit}
          >
            <fieldset className="flex flex-col pt-8 text-amber-900">
              <div className="flex flex-col mt-2 mb-2">
                <label
                  className="font-bold text-amber-900"
                  htmlFor="nombre_producto"
                >
                  Nombre del producto:
                </label>
                <input
                  type="text"
                  className="w-full max-w-xs input input-bordered bg-amber-100"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="flex flex-col mt-2 mb-2">
                <label
                  className="font-bold text-amber-900"
                  htmlFor="id_producto"
                >
                  Descripción del producto:
                </label>
                <input
                  className="w-full max-w-xs input input-bordered bg-amber-100"
                  type="text"
                  name="descripcion_producto"
                  value={descripcion}
                  onChange={(e) => setdescripcionProducto(e.target.value)}
                />
              </div>

              <div className="flex flex-col mt-2 mb-2">
                <label
                  className="mb-2 font-bold text-amber-900"
                  htmlFor="categoria_producto"
                >
                  Seleccione la categoría del producto:
                </label>
                <select
                  className="w-full max-w-xs select select-ghost bg-amber-100"
                  name="categoria_producto"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="" disabled>
                    Seleccione una categoría
                  </option>
                  <option value="panificacion">Panificación</option>
                  <option value="pasteleria">Pastelería</option>
                </select>
              </div>

              <div className="flex flex-col mt-2 mb-2">
                <label
                  className="font-bold text-amber-900"
                  htmlFor="precio_producto"
                >
                  Precio del producto:
                </label>
                <input
                  className="w-full max-w-xs input input-bordered bg-amber-100"
                  type="number"
                  name="precio_producto"
                  min="1"
                  value={precio}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col mt-2 mb-2">
                <label
                  className="font-bold text-amber-900"
                  htmlFor="stock_producto"
                >
                  Cantidad para la venta del producto:
                </label>
                <input
                  className="w-full max-w-xs input input-bordered bg-amber-100"
                  type="number"
                  name="stock_producto"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
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
                className="px-3 py-1 text-white border rounded marron-principal hover:bg-[#5c3826]"
                type="submit"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
