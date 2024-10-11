import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="flex items-center justify-around py-2 bg-marron-oscuro text-white">
      <section>
        <h2 className="text-lg font-semibold">Contacto</h2>
        <div className="flex items-center">
          <ion-icon name="call-outline" className="pr-2"></ion-icon>
          <p>3834-123123</p>
        </div>
        <div className="flex items-center">
          <ion-icon name="mail-outline" className="pr-2"></ion-icon>
          <p>contactopanaderiaelmana@gmail.com</p>
        </div>
        <div className="flex items-center">
          <ion-icon name="pin-outline" className="pr-2"></ion-icon>
          <p>Calle falsa 123, Catamarca, Argentina</p>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Seguinos en nuestras redes</h2>
        <ul>
          <li>
            <a href="#" target="_blank">
              Facebook
            </a>
            <ion-icon
              name="logo-facebook"
              className="p-2 align-middle"
            ></ion-icon>
          </li>
          <li>
            <a href="#" target="_blank">
              Instagram
            </a>
            <ion-icon
              name="logo-instagram"
              className="p-2 align-middle"
            ></ion-icon>
          </li>
        </ul>
      </section>

      <section className="flex flex-col items-center">
        <Image
          src="/logo-marron-elmana-sinfondo.png"
          alt=""
          width={150}
          height={150}
        />
        <p>&copy; 2024 Panadería El Maná. Todos los derechos reservados.</p>
      </section>
    </footer>
  );
}
