"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad_disponible: number;
  categoria: string;
  imagen: string;
}

export default function Home() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [productos, setProductos] = useState<Producto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href")?.slice(1);
    const targetSection = document.getElementById(targetId || "");

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 50,
        behavior: "smooth",
      });
    }
  };
  const handleVerMas = (id: number) => {
    router.push(`/productos/${id}`);
  };

  useEffect(() => {
    fetch(apiUrl + "/productos/")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error(error));
  }, [apiUrl]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  const startAutoPlay = useCallback(() => {
    return setInterval(() => {
      if (!isHovering && productos.length > 0) {
        const totalSlides = Math.ceil(productos.length / itemsPerPage);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }
    }, 5000);
  }, [isHovering, productos.length, itemsPerPage]);

  useEffect(() => {
    const timer = startAutoPlay();
    return () => clearInterval(timer);
  }, [startAutoPlay]);

  const paginate = (newDirection: number) => {
    const totalSlides = Math.ceil(productos.length / itemsPerPage);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex >= 0 && nextIndex < totalSlides) {
        return nextIndex;
      } else if (nextIndex < 0) {
        return totalSlides - 1;
      } else {
        return 0;
      }
    });
  };

  return (
    <main className="bg-marron-principal font-outfit">
      <article className="flex items-center bg-[#ebc68e] pl-3 pt-3 pr-3 min-h-[90vh] bg-[url('/patron-panaderia.png')] bg-repeat bg-[length:100px]">
        <div className="flex flex-col justify-between w-1/2 h-full px-10 py-[12vh] rounded bg-[#8b563b] bg-opacity-80">
          <h2 className="mb-5 text-4xl font-playwrite font-medium text-center text-white">
            Bienvenido a panadería El Maná
          </h2>
          <p className="text-white">
            Ofrecemos una amplia variedad de productos de panificación y
            pastelería, todos hechos con los mejores ingredientes y el amor de
            nuestros panaderos experimentados. Nuestro compromiso es brindarte
            siempre productos frescos y de la más alta calidad.
          </p>
          <ul className="mt-5 mb-4 text-white list-none list-inside">
            <li className="flex items-center">
              <ion-icon
                name="chevron-forward-outline"
                className="text-[#ebc68e]"
              ></ion-icon>
              Pan recién horneado todos los días
            </li>
            <li className="flex items-center">
              <ion-icon
                name="chevron-forward-outline"
                className="text-[#ebc68e]"
              ></ion-icon>
              Las mejores tartas de la ciudad
            </li>
            <li className="flex items-center">
              <ion-icon
                name="chevron-forward-outline"
                className="text-[#ebc68e]"
              ></ion-icon>
              Ingredientes naturales y frescos
            </li>
          </ul>
          <motion.a
            href="#productos"
            className="px-12 py-3 mt-10 text-sm text-center font-bold text-[#ebc68e] border bg-[#8b563b] border-[#ebc68e] rounded focus:outline-none bg-opacity-95"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#8b563b",
              color: "#fff",
            }}
            whileTap={{ scale: 0.95, backgroundColor: "#ab9680" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleScroll}
          >
            Conoce nuestros productos
          </motion.a>
        </div>
        <img
          src="/panaderia-horno.jpg"
          alt="Horno de panadería"
          className="w-1/2 rounded-lg"
        />
      </article>

      <h1 className="py-12 text-3xl text-center font-kindred" id="productos">
        La mejor panadería de Catamarca
      </h1>

      <h2 className="mt-3 ml-5 text-xl font-semibold">
        Nuestros exquisitos productos destacados
      </h2>
      <section
        className="w-full max-w-7xl mx-auto px-4 py-8"
        aria-label="Product Carousel"
      >
        <div className="relative overflow-hidden">
          <motion.ul
            className="flex list-none p-0 m-0"
            animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: `${100}%` }}
          >
            <AnimatePresence initial={false}>
              {productos.map((product) => (
                <motion.li
                  key={product.id}
                  className="w-full px-2 flex-shrink-0"
                  style={{ width: `${100 / itemsPerPage}%` }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <article className="bg-[#ebc68e] rounded-lg shadow-lg overflow-hidden h-full">
                    <motion.img
                      src={product.imagen}
                      alt={product.nombre}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                    <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
                      <h2 className="text-xl font-semibold mb-2 text-[#8b563b]">
                        {product.nombre}
                      </h2>
                      <p className="text-gray-600 mb-4 flex-grow">
                        {product.descripcion}
                      </p>
                      <motion.button
                        onClick={() => handleVerMas(product.id)}
                        className="bg-[#8b563b] text-white px-4 py-2 rounded"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#6a3f2d",
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        Ver más información
                      </motion.button>
                    </div>
                  </article>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          {productos.length > itemsPerPage && (
            <>
              <motion.button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 ml-2"
                onClick={() => paginate(-1)}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 mr-2"
                onClick={() => paginate(1)}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
