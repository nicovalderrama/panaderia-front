import React, { useEffect, useState } from "react";

const ContadorVentas = () => {
  const [cantidadVentas, setCantidadVentas] = useState(0);
  const [mes, setMes] = useState("Enero");
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/contador-ventas/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        const data = await response.json();
        setCantidadVentas(data.total_ventas);
        setTotal(data.total_recaudado);
        setMes(data.mes);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="block p-4 bg-marron-principal rounded-lg shadow-md transition duration-300">
      <h2 className="text-lg font-semibold text-[#f3c176]">Ventas en {mes}</h2>
      <p className="text-2xl">{cantidadVentas}</p>
      <h2>
        Total recaudado:{" "}
        <span className="font-bold text-[#f8b95a]">${total}</span>
      </h2>
    </div>
  );
};

export default ContadorVentas;
