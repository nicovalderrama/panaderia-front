'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // logout();
    toast.success("Sesión cerrada exitosamente");
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-500 text-white ${
        isScrolled
          ? isHovered
            ? "bg-opacity-100"
            : "backdrop-blur-md bg-opacity-70"
          : isHovered
          ? "bg-opacity-100"
          : "bg-opacity-100"
      } bg-marron-oscuro`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className="flex items-center justify-between px-1 py-1 pl-4 pr-4">
        <div className="flex-1">
          {false ? 
          <ul className="flex justify-start">
          <li className="pr-3">
            <Link href="/productos" className="hover:underline">
              Productos
            </Link>
          </li>
          <li className="pr-3">
            <Link href="/sobre-nosotros" className="hover:underline">
              Sobre nosotros
            </Link>
          </li>
          <li className="pr-3">
            <Link href="/contacto" className="hover:underline">
              Contacto
            </Link>
          </li>
        </ul> : ''}
        </div>
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/logo-claro-elmana.png"
              alt="logo de panadería el maná"
              width={80}
              height={80}
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="flex-1">
          <ul className="flex justify-end">
            {false ? (
              <li className="pr-3">
                <span className="mr-2">
                  {/* {userData?.username} ({userData?.role}) */}
                </span>
                <button
                  onClick={handleLogout}
                  className="hover:underline text-red-500"
                >
                  Cerrar Sesión
                </button>
              </li>
            ) : (
              <li className="pr-3">
                <Link href="/login" className="hover:underline">
                  Iniciar sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </motion.header>
  );
}
