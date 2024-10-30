"use client";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { setToken, setUser } from "../context/utils/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { setIsLoggedIn, setUserData } = useContext(AuthContext)!;
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

      // if (response.ok) {
      //   const data = await response.json();
      //   localStorage.setItem("access_token", data.access);
      //   localStorage.setItem("refresh_token", data.refresh);

      //   // Obtener información del usuario

      if (response.ok) {
        const data = await response.json()
        const userId = data.user_id;
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
          setToken(data.access)
          setUser({
            username: userData.username,
            role: userData.role,
            email: userData.email,
            id: userData.id
          })
          router.push('/dashboard')
          toast.success("Inicio de sesión exitoso");
          router.push("/dashboard"); // Redirigir después de iniciar sesión
        } else {
          toast.error("No se pudo obtener información del usuario");
        }

      } else {
        const errorData = await response.json()
        toast.error("No se pudo obtener información del usuario");
      }
    } catch (error) {
      console.error('Error durante el login', error)
      toast.error("Error en el inicio de sesión");
    }
    // } catch (error) {
    //   console.error("Error:", error);
    //   toast.error("Hubo un error en la solicitud");
    // }
  };

  return (
    <div
      className="flex items-center justify-center w-screen h-screen bg-[#ebc68e]"
      style={{
        backgroundImage: `url('/trigo-patron.png')`,
        backgroundRepeat: "repeat",
        backgroundSize: "300px 300px", // Ajusta este valor según el tamaño de tu patrón
      }}
    >
      <div className="flex max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Lado izquierdo con imagen */}
        <div className="w-1/2 bg-[#735945] flex items-center justify-center p-8">
          <Image
            src="/logo-claro-elmana.png"
            alt="El Maná Logo"
            width={300}
            height={300}
            objectFit="contain"
          />
        </div>

        {/* Lado derecho con formulario */}
        <div className="w-1/2 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md w-full mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-[#735945]">
              Iniciar sesión
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-[#735945]"
                >
                  Usuario
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-[#735945]" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-[#ebc68e] rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8b563b] focus:border-[#8b563b] sm:text-sm"
                    placeholder="Ingrese su usuario"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#735945]"
                >
                  Contraseña
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-[#735945]" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-[#ebc68e] rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8b563b] focus:border-[#8b563b] sm:text-sm"
                    placeholder="Ingrese su contraseña"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8b563b] hover:bg-[#735945] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ebc68e] transition duration-150 ease-in-out"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
