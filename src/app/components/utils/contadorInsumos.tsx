import React, { useEffect, useState } from "react";

const ContadorInsumos = () => {
  const [cantidadInsumos, setCantidadInsumos] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/contador-insumos/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        const data = await response.json();
        setCantidadInsumos(data.cantidad_insumos);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="block p-4 bg-marron-principal rounded-lg shadow-md transition duration-300">
      <h2 className="text-lg font-semibold text-[#f3c176]">
        Cantidad de Insumos
      </h2>
      <p className="text-2xl">{cantidadInsumos}</p>
    </div>
  );
};

export default ContadorInsumos;
