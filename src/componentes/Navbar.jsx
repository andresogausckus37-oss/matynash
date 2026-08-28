import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import {
  Menu,
  X,
  ShoppingCart,
  Home,
  Heart,
  UserRound,
  MessageCircle,
} from "lucide-react";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const location = useLocation();
  const { carrito } = useCarrito();

  const totalItems = carrito.reduce(
    (sum, item) => sum + item.cantidad,
    0
  );

  const cerrarMenu = () => setMenuAbierto(false);

  const esInicio = location.pathname === "/";
  const esServicios = location.pathname.startsWith("/servicios");

  const enlaces = [
    {
      nombre: "Inicio",
      ruta: "/",
      icono: Home,
      activo: esInicio,
    },
    {
      nombre: "Servicios",
      ruta: "/servicios",
      icono: Heart,
      activo: esServicios,
    },

    // FUTUROS ENLACES
    // {
    //   nombre: "Quién soy",
    //   ruta: "/quien-soy",
    //   icono: UserRound,
    //   activo: location.pathname === "/quien-soy",
    // },
    // {
    //   nombre: "Contacto",
    //   ruta: "/contacto",
    //   icono: MessageCircle,
    //   activo: location.pathname === "/contacto",
    // },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        className="
          relative
          w-full
          bg-white
          border-b
          border-borde
          shadow-sm
        "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[68px] sm:h-[72px] flex items-center justify-between">

            {/* =========================
                LOGO
            ========================== */}
            <Link
              to="/"
              onClick={cerrarMenu}
              aria-label="Ir al inicio"
              className="
                relative
                z-10
                flex
                items-center
                shrink-0
                group
              "
            >
              <img
                src="https://i.postimg.cc/wj8FgMBt/IMG-20260827-WA0021.jpg"
                alt="Maty Nash"
                className="
                  w-12
                  h-12
                  sm:w-12
                  sm:h-12
                  rounded-full
                  object-cover
                  transition-transform
                  duration-300
                  ease-out
                  group-hover:scale-105
                  group-active:scale-95
                "
              />
            </Link>

            {/* =========================
                FRASE CENTRAL
            ========================== */}
            <Link
              to="/"
              onClick={cerrarMenu}
              className="
                absolute
                left-2/5
                -translate-x-1/2
                whitespace-nowrap
                text-center
                text-texto
                text-[13px]
                sm:text-sm
                md:text-base
                tracking-wide
                transition-all
                duration-300
                hover:text-primario
              "
            >
              Tu coach de la energía
            </Link>

            {/* =========================
                ACCIONES
            ========================== */}
            <div className="relative z-10 flex items-center gap-1 sm:gap-2">

              {/* CARRITO */}
              <Link
                to="/checkout"
                aria-label={`Carrito (${totalItems} productos)`}
                className="
                  relative
                  flex
                  items-center
                  justify-center
                  w-10
                  h-10
                  sm:w-11
                  sm:h-11
                  rounded-full
                  text-texto
                  transition-all
                  duration-200
                  hover:bg-primario-claro/30
                  hover:text-primario
                  active:scale-90
                "
              >
                <ShoppingCart
                  size={20}
                  strokeWidth={1.7}
                  className="transition-transform duration-200"
                />

                {/* BADGE */}
                {totalItems > 0 && (
                  <span
                    className="
                      absolute
                      -top-0.5
                      -right-0.5
                      min-w-[17px]
                      h-[17px]
                      px-1
                      rounded-full
                      bg-primario
                      text-white
                      text-[9px]
                      font-medium
                      flex
                      items-center
                      justify-center
                      border-2
                      border-white
                      animate-[pulse_2s_ease-in-out_infinite]
                    "
                  >
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Link>

              {/* HAMBURGUESA */}
              <button
                type="button"
                onClick={() => setMenuAbierto((estado) => !estado)}
                aria-label={
                  menuAbierto ? "Cerrar menú" : "Abrir menú"
                }
                aria-expanded={menuAbierto}
                className="
                  flex
                  items-center
                  justify-center
                  w-10
                  h-10
                  sm:w-11
                  sm:h-11
                  rounded-full
                  text-texto
                  transition-all
                  duration-200
                  hover:bg-primario-claro/30
                  hover:text-primario
                  active:scale-90
                "
              >
                <span
                  className="
                    transition-all
                    duration-300
                    ease-out
                  "
                >
                  {menuAbierto ? (
                    <X
                      size={23}
                      strokeWidth={1.7}
                      className="rotate-0"
                    />
                  ) : (
                    <Menu
                      size={23}
                      strokeWidth={1.7}
                    />
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================
            MENÚ DESPLEGABLE
        ========================== */}
        <div
          className={`
            absolute
            top-full
            left-0
            right-0
            overflow-hidden
            bg-white
            border-b
            border-borde
            shadow-lg
            transition-all
            duration-300
            ease-out
            ${
              menuAbierto
                ? "max-h-[500px] opacity-100 visible"
                : "max-h-0 opacity-0 invisible"
            }
          `}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">

            <div className="max-w-md ml-auto">

              {enlaces.map((enlace, index) => {
                const Icono = enlace.icono;

                return (
                  <Link
                    key={enlace.ruta}
                    to={enlace.ruta}
                    onClick={cerrarMenu}
                    className={`
                      group
                      flex
                      items-center
                      gap-4
                      w-full
                      min-h-[56px]
                      sm:min-h-[60px]
                      px-4
                      rounded-xl
                      transition-all
                      duration-200
                      ${
                        enlace.activo
                          ? "bg-primario-claro/20 text-primario"
                          : "text-texto-suave hover:bg-primario-claro/10 hover:text-primario"
                      }
                    `}
                    style={{
                      transitionDelay: menuAbierto
                        ? `${index * 40}ms`
                        : "0ms",
                    }}
                  >
                    <span
                      className="
                        flex
                        items-center
                        justify-center
                        w-9
                        h-9
                        rounded-full
                        transition-all
                        duration-200
                        group-hover:scale-105
                      "
                    >
                      <Icono
                        size={20}
                        strokeWidth={1.7}
                      />
                    </span>

                    <span className="text-sm sm:text-base">
                      {enlace.nombre}
                    </span>

                    <span
                      className="
                        ml-auto
                        text-lg
                        opacity-40
                        transition-all
                        duration-200
                        group-hover:translate-x-1
                        group-hover:opacity-100
                      "
                    >
                      →
                    </span>
                  </Link>
                );
              })}

            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}