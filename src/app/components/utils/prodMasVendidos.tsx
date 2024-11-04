import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, registerables, Ticks } from "chart.js";
import { color } from "framer-motion";

Chart.register(...registerables);

interface ProductoMasVendido {
  producto__nombre: string;
  total_cantidad: number;
}

const ProductosMasVendidos: React.FC = () => {
  const [productos, setProductos] = useState<ProductoMasVendido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductosMasVendidos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/mas-vendidos/");
        setProductos(response.data);
      } catch (err) {
        setError("Error al cargar los productos más vendidos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductosMasVendidos();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  // Extraer nombres y cantidades para el gráfico
  const labels = productos.map((producto) => producto.producto__nombre);
  const data = productos.map((producto) => producto.total_cantidad);

  // Configuración del gráfico
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Cantidad Vendida",
        data: data,
        backgroundColor: "rgba(212, 179, 74, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="p-4 bg-marron-oscuro rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-trigo">
        Productos Más Vendidos
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ProductosMasVendidos;
