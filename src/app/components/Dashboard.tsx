"use client";
import Link from "next/link";
import { useAuth } from "../context/hooks/useAuth";
import ContadorInsumos from "./utils/contadorInsumos";
import ContadorProductos from "./utils/contadorProductos";
import ContadorVentas from "./utils/contadorVentas";
import InsumosBajoStock from "./utils/insumosBajoStock";
import ProductosMasVendidos from "./utils/prodMasVendidos";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <main className="flex-grow">
      <h1 className="px-6 py-4 text-3xl font-bold text-marron-oscuro font-kindred">
        Bienvenido a tu panel, {user?.username}
      </h1>
      <p className="px-6 font-outline text-marron-principal">
        Podes realizar acciones como: {user?.role}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 text-white">
        <ContadorVentas />
        <ContadorInsumos />
        <ContadorProductos />
        <Link
          href="/dashboard/productos/gestionar"
          className="block p-4 bg-marron-oscuro rounded-lg shadow-md hover:bg-marron-principal transition duration-300"
        >
          <h2 className="text-lg font-semibold text-[#f3c176]">
            Gestionar Productos
          </h2>
          <p className="text-sm">Administra todos tus productos aquí.</p>
        </Link>
        <Link
          href="/dashboard/reportes"
          className="block p-4 bg-marron-oscuro rounded-lg shadow-md hover:bg-marron-principal transition duration-300"
        >
          <h2 className="text-lg font-semibold text-[#f3c176]">Reportes</h2>
          <p className="text-sm ">Genera reportes de ventas y inventario.</p>
        </Link>
        <Link
          href="/dashboard/inventario"
          className="block p-4 bg-marron-oscuro rounded-lg shadow-md hover:bg-marron-principal transition duration-300"
        >
          <h2 className="text-lg font-semibold text-[#f3c176]">Inventario</h2>
          <p className="text-sm ">Verifica el estado de tu inventario.</p>
        </Link>

        <Link
          href="/dashboard/pedidos/realizar"
          className="block p-4 bg-marron-oscuro rounded-lg shadow-md hover:bg-marron-principal transition duration-300"
        >
          <h2 className="text-lg font-semibold text-[#f3c176]">
            Realizar Pedido
          </h2>
          <p className="text-sm ">Haz un nuevo pedido a los proveedores.</p>
        </Link>

        <Link
          href="/dashboard/pedidos/recepcion"
          className="block p-4 bg-marron-oscuro rounded-lg shadow-md hover:bg-marron-principal transition duration-300"
        >
          <h2 className="text-lg font-semibold text-[#f3c176]">
            Registrar Recepcion de Pedido
          </h2>
          <p className="text-sm ">
            Registra la recepcion de un pedido realizado.
          </p>
        </Link>

        <Link
          href="/dashboard/productos/tabla"
          className="block p-4 bg-marron-oscuro rounded-lg shadow-md hover:bg-marron-principal transition duration-300"
        >
          <h2 className="text-lg font-semibold text-[#f3c176]">
            Registra una Venta
          </h2>
          <p className="text-sm ">Registra los datos de una nueva venta.</p>
        </Link>

        <ProductosMasVendidos />
        <InsumosBajoStock />
      </div>
    </main>
  );
};

export default Dashboard;
