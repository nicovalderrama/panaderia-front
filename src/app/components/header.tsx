import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <header>
      <nav className="flex items-center justify-between px-1 py-1 pl-4 pr-4 bg-marron-oscuro font-lora">
        <div className="flex-1">
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
          </ul>
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
            <li className="pr-3">
              <Link href="/login" className="hover:underline">
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link href="/registro" className="hover:underline">
                Registrarse
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
