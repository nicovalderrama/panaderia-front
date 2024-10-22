"use client";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext"; // Asegúrate de que la ruta sea correcta

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setUserData } = useContext(AuthContext)!; // Asegúrate de manejar el contexto correctamente
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        // Obtener información del usuario
        const userId = data.user_id; // Asegúrate de que tu backend devuelva el ID del usuario
        const userResponse = await fetch(
          `http://127.0.0.1:8000/api/usuarios/${userId}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.access}`,
            },
          }
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          localStorage.setItem("user_data", JSON.stringify(userData));
          setIsLoggedIn(true);
          setUserData(userData);
          console.log("Información del usuario:", userData);
          toast.success("Inicio de sesión exitoso");
          router.push("/dashboard"); // Redirigir después de iniciar sesión
        } else {
          toast.error("No se pudo obtener información del usuario");
        }
      } else {
        toast.error("Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Hubo un error en la solicitud");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Usuario
          </label>
          <div className="flex items-center border border-gray-300 rounded">
            <FaUser className="ml-2" />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border-0 focus:outline-none flex-1 px-2"
              placeholder="Ingrese su usuario"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <div className="flex items-center border border-gray-300 rounded">
            <FaLock className="ml-2" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-0 focus:outline-none flex-1 px-2"
              placeholder="Ingrese su contraseña"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Iniciar sesión
        </button>
      </form>
    </motion.div>
  );
}
