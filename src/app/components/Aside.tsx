"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/hooks/useAuth";

interface AsideProps {
  className?: string;
}

const Aside = ({ className }: AsideProps) => {
  const [isProductosOpen, setProductosOpen] = useState(false);
  const [isVentasOpen, setVentasOpen] = useState(false);
  const [isProveedoresOpen, setProveedoresOpen] = useState(false);
  const [isCuentaOpen, setCuentaOpen] = useState(false);
  const { logout } = useAuth()
  const activeStyle = "bg-[#ebc68e] text-gray-700";
  const inactiveStyle = "hover:bg-[#ebc68e] hover:text-gray-700";
  const router = useRouter()

  return (
    <aside className={`h-full bg-[#735945] text-white ${className}`}>
      <div className="flex flex-col justify-between h-full border-e">
        <div className=" px-4 py-6 h-full">
          <span className="grid w-32 h-10 mx-auto text-xs place-content-center">
            <img src="/logo-marron-elmana-sinfondo.png" alt="" />
          </span>

          <ul className="mt-6 space-y-1">
            <li>
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-sm font-medium bg-[#ebc68e] text-gray-700 rounded-lg"
              >
                General
              </Link>
            </li>

            <li>
              <div>
                <button
                  onClick={() => setProductosOpen(!isProductosOpen)}
                  className={`flex items-center justify-between px-4 py-2 w-full text-sm font-medium rounded-lg ${isProductosOpen ? activeStyle : inactiveStyle
                    }`}
                >
                  <span>Productos</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition duration-300 ${isProductosOpen ? "rotate-180" : ""
                      }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    width="20"
                    height="20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {isProductosOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 mt-2 space-y-1"
                    >
                      <li>
                        <Link
                          href="/dashboard/productos/gestionar"
                          replace
                          className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
                        >
                          Gestionar productos
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard/productos/agregar"
                          replace
                          className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
                        >
                          Agregar producto
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </li>

            <li>
              <div>
                <button
                  onClick={() => setVentasOpen(!isVentasOpen)}
                  className={`flex items-center justify-between px-4 py-2 w-full text-sm font-medium rounded-lg ${isVentasOpen ? activeStyle : inactiveStyle
                    }`}
                >
                  <span>Ventas</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition duration-300 ${isVentasOpen ? "rotate-180" : ""
                      }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    width="20"
                    height="20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {isVentasOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 mt-2 space-y-1"
                    >
                      <li>
                        <Link
                          href={'/dashboard/productos/tabla'}
                          replace
                          className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
                        >
                          Registrar venta
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </li>

            <li>
              <div>
                <button
                  onClick={() => setProveedoresOpen(!isProveedoresOpen)}
                  className={`flex items-center justify-between px-4 py-2 w-full text-sm font-medium rounded-lg ${isProveedoresOpen ? activeStyle : inactiveStyle
                    }`}
                >
                  <span>Proveedores</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition duration-300 ${isProveedoresOpen ? "rotate-180" : ""
                      }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    width="20"
                    height="20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {isProveedoresOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 mt-2 space-y-1"
                    >
                      <li>
                        <Link
                          href="/dashboard/proveedores"
                          replace
                          className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
                        >
                          Registrar Proveedor
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/dashboard/pedidos/realizar"}
                          replace
                          className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
                        >
                          Realizar pedido
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard/pedidos/recepcion"
                          replace
                          className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
                        >
                          Registrar recepción
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </li>

            <li>
              <Link
                href="/dashboard/inventario"
                replace
                className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
              >
                Inventario
              </Link>
            </li>

            <li>
              <div>
                <button
                  onClick={() => setCuentaOpen(!isCuentaOpen)}
                  className={`flex items-center justify-between px-4 py-2 w-full text-sm font-medium rounded-lg ${isCuentaOpen ? activeStyle : inactiveStyle
                    }`}
                >
                  <span>Cuenta</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition duration-300 ${isCuentaOpen ? "rotate-180" : ""
                      }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    width="20"
                    height="20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {isCuentaOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 mt-2 space-y-1"
                    >
                      <li>
                        <button
                          onClick={() => logout()}
                          className="w-full text-left px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
                        >
                          Cerrar sesión
                        </button>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
