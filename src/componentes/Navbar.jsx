import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import {
  Home,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ShoppingCart,
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

  // Rutas activas
  const esInicio = location.pathname === "/";
  const esTienda = location.pathname.startsWith("/tienda");
  const esServicios = location.pathname.startsWith("/servicios");

  // Color salvia para enlace activo
  const colorActivo = "text-primario font-semibold";
  const colorInactivo = "text-texto-suave hover:text-primario";
  const bordeActivo = "bg-primario";

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="bg-blanco/95 backdrop-blur-md border-b border-borde shadow-suave">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="h-[72px] flex items-center justify-between">

            {/* LOGO */}
            <Link
              to="/"
              onClick={cerrarMenu}
              className="flex items-center shrink-0"
              aria-label="Inicio"
            >
              <img
                src="https://i.postimg.cc/vHBRjNV3/IMG-20260827-WA6620.jpg"
                alt="Servicios Holísticos"
                className="
                  h-14 w-14
                  sm:h-14 sm:w-14
                  rounded-full
                  object-cover
                "
              />
            </Link>

            {/* NAVEGACIÓN DESKTOP */}
            <div className="hidden md:flex items-center h-full gap-2">

              <Link
                to="/"
                className={`
                  relative h-full px-5
                  flex items-center justify-center gap-2
                  text-sm transition-colors duration-200
                  ${esInicio ? colorActivo : colorInactivo}
                `}
              >
                <Home size={18} strokeWidth={1.8} />
                <span>Inicio</span>
                {esInicio && (
                  <span className={`absolute bottom-0 left-5 right-5 h-[2px] ${bordeActivo} rounded-full`} />
                )}
              </Link>

              <Link
                to="/servicios"
                className={`
                  relative h-full px-5
                  flex items-center justify-center gap-2
                  text-sm transition-colors duration-200
                  ${esServicios ? colorActivo : colorInactivo}
                `}
              >
                <Heart size={18} strokeWidth={1.8} />
                <span>Servicios</span>
                {esServicios && (
                  <span className={`absolute bottom-0 left-5 right-5 h-[2px] ${bordeActivo} rounded-full`} />
                )}
              </Link>

              <Link
                to="/tienda"
                className={`
                  relative h-full px-5
                  flex items-center justify-center gap-2
                  text-sm transition-colors duration-200
                  ${esTienda ? colorActivo : colorInactivo}
                `}
              >
                <ShoppingBag size={18} strokeWidth={1.8} />
                <span>Tienda</span>
                {esTienda && (
                  <span className={`absolute bottom-0 left-5 right-5 h-[2px] ${bordeActivo} rounded-full`} />
                )}
              </Link>
            </div>

            {/* ACCIONES */}
            <div className="flex items-center gap-2">

              {/* ✅ CARRITO — BADGE SIEMPRE VISIBLE */}
              <Link
                to="/checkout"
                className="
                  relative
                  w-11 h-11
                  flex items-center justify-center
                  rounded-full
                  text-texto
                  hover:bg-primario-claro/30
                  hover:text-primario
                  transition-all duration-200
                "
                aria-label="Carrito"
              >
                <ShoppingCart
                  size={21}
                  strokeWidth={1.8}
                />

                {/* ✅ BADGE VISIBLE SIEMPRE — aunque sea 0 */}
                <span
                  className="
                    absolute
                    top-0
                    right-0
                    min-w-[18px]
                    h-[18px]
                    px-1
                    rounded-full
                    bg-primario
                    text-white
                    text-[10px]
                    font-semibold
                    flex items-center justify-center
                    border-2 border-blanco
                  "
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              </Link>

              {/* MENÚ MÓVIL */}
              <button
                type="button"
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="
                  md:hidden
                  w-11 h-11
                  flex items-center justify-center
                  rounded-full
                  text-texto
                  hover:bg-primario-claro/30
                  hover:text-primario
                  transition-all duration-200
                "
                aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuAbierto}
              >
                {menuAbierto ? (
                  <X size={23} strokeWidth={1.8} />
                ) : (
                  <Menu size={23} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MENÚ MÓVIL */}
        <div
          className={`
            md:hidden
            overflow-hidden
            transition-all duration-300
            ${menuAbierto ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="border-t border-borde bg-blanco px-6 py-3">
            <div className="flex flex-col">

              {/* INICIO — Salvia activo */}
              <Link
                to="/"
                onClick={cerrarMenu}
                className={`
                  min-h-[58px]
                  flex items-center justify-center
                  gap-3
                  text-sm
                  border-b border-borde
                  transition-colors duration-200
                  ${esInicio ? colorActivo : colorInactivo}
                `}
              >
                <Home size={19} strokeWidth={1.8} />
                <span>Inicio</span>
              </Link>

              {/* SERVICIOS — Salvia activo */}
              <Link
                to="/servicios"
                onClick={cerrarMenu}
                className={`
                  min-h-[58px]
                  flex items-center justify-center
                  gap-3
                  text-sm
                  border-b border-borde
                  transition-colors duration-200
                  ${esServicios ? colorActivo : colorInactivo}
                `}
              >
                <Heart size={19} strokeWidth={1.8} />
                <span>Servicios</span>
              </Link>

              {/* TIENDA — Salvia activo */}
              <Link
                to="/tienda"
                onClick={cerrarMenu}
                className={`
                  min-h-[58px]
                  flex items-center justify-center
                  gap-3
                  text-sm
                  transition-colors duration-200
                  ${esTienda ? colorActivo : colorInactivo}
                `}
              >
                <ShoppingBag size={19} strokeWidth={1.8} />
                <span>Tienda</span>
              </Link>

            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
