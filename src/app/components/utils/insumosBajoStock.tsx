import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

type Insumo = {
  id: number;
  nombre: string;
  stock_actual: number;
};

const InsumosBajoStock = () => {
  const [insumos, setInsumos] = useState<Insumo[]>([]);

  useEffect(() => {
    const fetchInsumos = async () => {
      const response = await axios.get(
        "http://localhost:8000/insumos-bajo-stock/"
      );
      setInsumos(response.data);
    };

    fetchInsumos();
  }, []);

  return (
      <div
        className={`block p-4 rounded-lg bg-marron-oscuro shadow-md transition duration-300 ${
          insumos.length > 0 ? "bg-red-500" : "bg-brown-800"
        }`}
      >
        <h2 className="text-lg font-semibold text-[#f3c176]">
          {insumos.length 
            ? "Insumos con bajo stock !!"
            : "Por el momento no hay insumos con poco stock."}
        </h2>
        <div className="flex flex-col">
          {insumos.length > 0 ? (
            <ul>
              {insumos.map((insumo) => (
                <li key={insumo.id}>
                  {insumo.nombre} | Stock: {insumo.stock_actual}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[#f3c176]">No hay insumos disponibles.</p>
          )}
          {insumos.length > 0 && (
            <a
              href="/dashboard/pedidos/realizar"
              className="p-2 my-2 bg-red-600 text-white rounded-lg hover:bg-red-400 hover:text-white border border-red-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              Realizar pedido
            </a>
          )}
        </div>
      </div>
  );
};

export default InsumosBajoStock;
