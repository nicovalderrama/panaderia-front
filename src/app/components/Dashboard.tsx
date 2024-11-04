import Link from "next/link";

const Dashboard = () => {
  return (
    <main className="flex-grow">
      <h1 className="px-6 py-4 text-xl font-bold text-[#ebc68e]">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 text-white">
        <Link
          href="/gestion_productos"
          className="block p-4 bg-marron-principal rounded-lg shadow-md hover:bg-[#d9b074] transition duration-300"
        >
          <h2 className="text-lg font-semibold">Gestionar Productos</h2>
          <p className="text-sm">Administra todos tus productos aquí.</p>
        </Link>
       
        <Link
          href="/inventario"
          className="block p-4 bg-marron-principal rounded-lg shadow-md hover:bg-[#d9b074] transition duration-300"
        >
          <h2 className="text-lg font-semibold">Inventario</h2>
          <p className="text-sm">Verifica el estado de tu inventario.</p>
        </Link>

        <Link
          href="/realizar_pedido"
          className="block p-4 bg-marron-principal rounded-lg shadow-md hover:bg-[#d9b074] transition duration-300"
        >
          <h2 className="text-lg font-semibold">Realizar Pedido</h2>
          <p className="text-sm">Haz un nuevo pedido a los proveedores.</p>
        </Link>

        <Link
          href="/registrar_pedido"
          className="block p-4 bg-marron-principal rounded-lg shadow-md hover:bg-[#d9b074] transition duration-300"
        >
          <h2 className="text-lg font-semibold">Registrar Pedido</h2>
          <p className="text-sm">Registra un pedido realizado previamente.</p>
        </Link>

        <Link
          href="/mi_informacion"
          className="block p-4 bg-marron-principal rounded-lg shadow-md hover:bg-[#d9b074] transition duration-300"
        >
          <h2 className="text-lg font-semibold">Mi Información</h2>
          <p className="text-sm">Actualiza tu información personal.</p>
        </Link>

        <Link
          href="/seguridad"
          className="block p-4 bg-marron-principal rounded-lg shadow-md hover:bg-[#d9b074] transition duration-300"
        >
          <h2 className="text-lg font-semibold">Seguridad</h2>
          <p className="text-sm">Configura la seguridad de tu cuenta.</p>
        </Link>
      </div>
    </main>
  );
};

export default Dashboard;
