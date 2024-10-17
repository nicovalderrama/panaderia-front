"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const products = [
  {
    id: 1,
    title: "Smart Watch",
    description:
      "Stay connected with our latest smartwatch. Track your fitness, receive notifications, and more.",
    image: "/placeholder.svg?height=200&width=200&text=Smart+Watch",
  },
  {
    id: 2,
    title: "Wireless Earbuds",
    description:
      "Experience crystal-clear sound with our comfortable wireless earbuds. Perfect for music and calls.",
    image: "/placeholder.svg?height=200&width=200&text=Wireless+Earbuds",
  },
  {
    id: 3,
    title: "Laptop",
    description:
      "Powerful and portable, our laptop is perfect for work and entertainment on-the-go.",
    image: "/placeholder.svg?height=200&width=200&text=Laptop",
  },
  {
    id: 4,
    title: "Smartphone",
    description:
      "Stay connected with our latest smartphone. Featuring a high-resolution camera and long-lasting battery.",
    image: "/placeholder.svg?height=200&width=200&text=Smartphone",
  },
  {
    id: 5,
    title: "Bluetooth Speaker",
    description:
      "Enjoy your music anywhere with our portable Bluetooth speaker. Waterproof and long battery life.",
    image: "/placeholder.svg?height=200&width=200&text=Bluetooth+Speaker",
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const startAutoPlay = useCallback(() => {
    return setInterval(() => {
      if (!isHovering) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      }
    }, 5000);
  }, [isHovering]);

  useEffect(() => {
    const timer = startAutoPlay();
    return () => clearInterval(timer);
  }, [startAutoPlay]);

  const paginate = (newDirection: number) => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      return nextIndex >= 0 ? nextIndex % products.length : products.length - 1;
    });
  };
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
  return (
    <main className="bg-marron-principal">
      <article className="flex items-center bg-[#ebc68e] pl-3 pt-3 pr-3 min-h-[90vh] bg-[url('/patron-panaderia.png')] bg-repeat bg-[length:100px]">
        <div className="flex flex-col justify-between w-1/2 h-full px-10 py-[12vh] rounded bg-[#8b563b] bg-opacity-80">
          <h2 className="mb-5 text-4xl font-lora font-medium text-center text-white">
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
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <AnimatePresence initial={false}>
              {products.map((product) => (
                <motion.li
                  key={product.id}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <article className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                    <motion.img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                    <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
                      <h2 className="text-xl font-semibold mb-2">
                        {product.title}
                      </h2>
                      <p className="text-gray-600 mb-4 flex-grow">
                        {product.description}
                      </p>
                      <motion.button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </article>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          <motion.button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 ml-2"
            onClick={() => paginate(-1)}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous product"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </motion.button>
          <motion.button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 mr-2"
            onClick={() => paginate(1)}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next product"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </motion.button>
        </div>
        <nav
          className="mt-4 flex justify-center"
          aria-label="Product navigation"
        >
          {products.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              aria-label={`Go to product ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </nav>
      </section>

      <section className="flex text-black">
        <article className="shadow-2xl card">
          <img src="/medialunas.jpg" alt="Medialunas" className="w-50" />
          <h3 className="m-4 text-xl text-center font-kindred">
            Medialunas de manteca
          </h3>
          <p>
            Las medialunas de manteca son uno de nuestros clásicos favoritos.
            Están horneadas a la perfección con la mejor manteca. Son ideales
            para acompañar un café o té, y siempre están frescas y listas para
            disfrutar en cualquier momento del día.
          </p>
          <a href="#" className="underline">
            Más información
          </a>
        </article>

        <article className="shadow-2xl card">
          <img src="/baguette.jpg" alt="Baguette" className="w-50" />
          <h3 className="m-4 text-xl text-center font-kindred">Baguette</h3>
          <p>
            Nuestra baguette es una delicia crujiente por fuera y tierna por
            dentro. Con una corteza dorada y un sabor auténtico, es perfecta
            para acompañar cualquier comida o para disfrutar sola. Hecha con
            ingredientes de la mejor calidad, es un clásico de la panadería que
            nunca pasa de moda.
          </p>
          <a href="#" className="underline">
            Más información
          </a>
        </article>

        <article className="shadow-2xl card">
          <img src="/budin.jpg" alt="Budín de chocolate" className="w-50" />
          <h3 className="m-4 text-xl text-center font-kindred">
            Budín de chocolate
          </h3>
          <p>
            Nuestro budín de chocolate es una delicia irresistible, con una
            textura suave y esponjosa que se deshace en la boca. Hecho con cacao
            de alta calidad y trozos de chocolate, ofrece un sabor profundo y
            rico que complace a los amantes del chocolate.
          </p>
          <a href="#" className="underline">
            Más información
          </a>
        </article>
      </section>
    </main>
  );
}
