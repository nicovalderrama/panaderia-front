"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface AsideProps {
  className?: string;
}

const Aside = ({ className }: AsideProps) => {
  const [isProductosOpen, setProductosOpen] = useState(false);
  const [isProveedoresOpen, setProveedoresOpen] = useState(false);
  const [isCuentaOpen, setCuentaOpen] = useState(false);

  return (
    <aside className={`h-full bg-[#735945] text-white ${className}`}>
      <div className="flex flex-col justify-between h-full border-e">
        <div className="flex-grow px-4 py-6">
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
                  className="flex items-center justify-between px-4 py-2 w-full text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
                >
                  <span> Productos </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition duration-300 ${
                      isProductosOpen ? "rotate-180" : ""
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
                          href="/gestion_productos"
                          className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
                        >
                          Gestionar productos
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/productos/agregar"
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
              <Link
                href="/inventario"
                className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
              >
                Inventario
              </Link>
            </li>

            <li>
              <div>
                <button
                  onClick={() => setProveedoresOpen(!isProveedoresOpen)}
                  className="flex items-center justify-between px-4 py-2 w-full text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
                >
                  <span> Proveedores </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition duration-300 ${
                      isProveedoresOpen ? "rotate-180" : ""
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
                          href="/realizar_pedido"
                          className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
                        >
                          Realizar pedido
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/registrar_pedido"
                          className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
                        >
                          Registrar pedido
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
                  onClick={() => setCuentaOpen(!isCuentaOpen)}
                  className="flex items-center justify-between px-4 py-2 w-full text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
                >
                  <span> Cuenta </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition duration-300 ${
                      isCuentaOpen ? "rotate-180" : ""
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
                        <Link
                          href="/mi_informacion"
                          className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
                        >
                          Mi información
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/seguridad"
                          className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#ebc68e] hover:text-gray-700"
                        >
                          Seguridad
                        </Link>
                      </li>
                      <li>
                        <form action="#" method="POST">
                          <button
                            type="submit"
                            className="w-full rounded-lg px-4 py-2 text-sm font-medium text-left hover:bg-[#ebc68e] hover:text-gray-700"
                          >
                            Cerrar sesión
                          </button>
                        </form>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-black-500">
          <Link href="#" className="flex items-center gap-2 p-4 bg-[#8b563b]">
            <img
              alt=""
              src="/user.png"
              className="object-cover rounded-full size-10"
            />
            <div>
              <p className="text-xs">
                <strong className="block font-medium">
                  Nicolás Valderrama
                </strong>
                <span> nico@elmana.com </span>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
