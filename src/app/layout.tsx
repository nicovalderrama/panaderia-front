"use client";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { ReactNode, useEffect } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.type = "module";
    script1.src =
      "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.noModule = true;
    script2.src = "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js";
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <Header />

        <main className="flex-grow">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
