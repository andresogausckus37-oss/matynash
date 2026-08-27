import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { PRODUCTOS } from "../datos/productos";
import {
  COLECCIONES,
  TIPOS_PRODUCTO,
  RANGOS_PRECIO,
} from "../datos/colecciones";
import TarjetaProducto from "../componentes/TarjetaProducto";
import { Filter, ChevronDown, ShoppingCart } from "lucide-react";
import { useCarrito } from "../context/CarritoContext";

export default function Tienda() {
  const [coleccionActiva, setColeccionActiva] = useState("todos");
  const [tipoActivo, setTipoActivo] = useState("todos");
  const [rangoPrecioActivo, setRangoPrecioActivo] = useState("todos");
  const [mostrarFiltrosMovil, setMostrarFiltrosMovil] = useState(false);

  const { carrito } = useCarrito();

  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const productosFiltrados = useMemo(() => {
    return PRODUCTOS.filter((producto) => {
      const filtroColeccion =
        coleccionActiva === "todos" ||
        producto.coleccionId === coleccionActiva;

      const filtroTipo =
        tipoActivo === "todos" ||
        producto.categoria === tipoActivo;

      const rango = RANGOS_PRECIO.find(
        (r) => r.id === rangoPrecioActivo
      );

      const filtroPrecio =
        rangoPrecioActivo === "todos" ||
        (producto.precioARS >= rango.min &&
          producto.precioARS <= rango.max);

      return filtroColeccion && filtroTipo && filtroPrecio;
    });
  }, [coleccionActiva, tipoActivo, rangoPrecioActivo]);

  const limpiarFiltros = () => {
    setColeccionActiva("todos");
    setTipoActivo("todos");
    setRangoPrecioActivo("todos");
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pb-28">

      {/* COLECCIONES */}
      <section className="mb-12">

        <div className="text-center mb-7">
          <h1 className="text-2xl sm:text-3xl text-texto mb-2">
            Explorar colecciones
          </h1>

          <p className="text-texto-suave text-sm sm:text-base">
            Encontrá diseños inspirados en la energía, la espiritualidad y el bienestar.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {COLECCIONES.map((coleccion) => (
            <button
              key={coleccion.id}
              onClick={() => setColeccionActiva(coleccion.id)}
              className={`
                group
                relative
                rounded-2xl
                overflow-hidden
                h-24
                md:h-44
                transition-all
                duration-300
                hover:shadow-md
                focus:outline-none
                focus:ring-0
                active:ring-0
                ${coleccionActiva === coleccion.id 
                  ? 'ring-2 ring-primario scale-105 shadow-md' 
                  : ''
                }
              `}
            >
              <img
                src={coleccion.bannerUrl}
                alt={coleccion.titulo}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-110
                "
              />

              <div className="
                absolute
                inset-0
                bg-black/30
                group-hover:bg-black/20
                transition-colors
                flex
                items-center
                justify-center
                p-3
              ">
                <span className="text-white text-sm md:text-base text-center">
                  {coleccion.titulo}
                </span>
              </div>
            </button>
          ))}

        </div>
      </section>

      {/* FILTROS */}
      <section className="mb-10">

        <button
          onClick={() =>
            setMostrarFiltrosMovil(!mostrarFiltrosMovil)
          }
          className="
            md:hidden
            flex
            items-center
            justify-center
            gap-2
            w-full
            bg-primario-claro/30
            hover:bg-primario-claro/50
            text-texto
            py-3
            rounded-xl
            mb-4
            transition-colors
          "
        >
          <Filter size={18} />
          Filtros
          <ChevronDown
            size={18}
            className={`transition-transform ${
              mostrarFiltrosMovil ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`space-y-4 ${
            mostrarFiltrosMovil
              ? "block"
              : "hidden md:block"
          }`}
        >

          {/* TIPO DE PRODUCTO */}
          <div className="bg-fondo border border-borde rounded-2xl p-5">

            <h3 className="text-texto mb-4 font-medium">
              Tipo de producto
            </h3>

            <div className="flex flex-wrap gap-2">

              {TIPOS_PRODUCTO.map((tipo) => (
                <button
                  key={tipo.id}
                  onClick={() => setTipoActivo(tipo.id)}
                  className={`
                    px-4
                    py-2
                    rounded-xl
                    text-sm
                    transition-all
                    border
                    ${
                      tipoActivo === tipo.id
                        ? "bg-primario text-white border-primario"
                        : "bg-blanco text-texto border-borde hover:bg-primario-claro/30"
                    }
                  `}
                >
                  {tipo.etiqueta}
                </button>
              ))}

            </div>
          </div>

          {/* RANGO DE PRECIO */}
          <div className="bg-fondo border border-borde rounded-2xl p-5">

            <h3 className="text-texto mb-4 font-medium">
              Rango de precio
            </h3>

            <div className="flex flex-wrap gap-2">

              {RANGOS_PRECIO.map((rango) => (
                <button
                  key={rango.id}
                  onClick={() =>
                    setRangoPrecioActivo(rango.id)
                  }
                  className={`
                    px-4
                    py-2
                    rounded-xl
                    text-sm
                    transition-all
                    border
                    ${
                      rangoPrecioActivo === rango.id
                        ? "bg-primario text-white border-primario"
                        : "bg-blanco text-texto border-borde hover:bg-primario-claro/30"
                    }
                  `}
                >
                  {rango.etiqueta}
                </button>
              ))}

            </div>
          </div>

        </div>
      </section>

      {/* RESULTADOS */}
      <section>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">

          <div>
            <h2 className="text-xl sm:text-2xl text-texto">
              Productos
            </h2>

            <p className="text-sm text-texto-suave mt-1">
              {productosFiltrados.length} producto
              {productosFiltrados.length !== 1 ? "s" : ""}
            </p>
          </div>

          {(coleccionActiva !== "todos" ||
            tipoActivo !== "todos" ||
            rangoPrecioActivo !== "todos") && (
            <button
              onClick={limpiarFiltros}
              className="
                text-primario
                hover:text-primario-oscuro
                text-sm
                transition-colors
                text-left
                sm:text-right
              "
            >
              Limpiar filtros
            </button>
          )}

        </div>

        {/* PRODUCTOS — 2 COLUMNAS */}
        {productosFiltrados.length === 0 ? (

          <div className="text-center py-20 bg-fondo rounded-2xl border border-borde">

            <p className="text-texto-suave text-base">
              No hay productos que coincidan con los filtros.
            </p>

            <button
              onClick={limpiarFiltros}
              className="
                mt-5
                text-primario
                hover:text-primario-oscuro
                text-sm
                transition-colors
              "
            >
              Ver todos los productos
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-2 gap-4 sm:gap-6">

            {productosFiltrados.map((producto) => (
              <TarjetaProducto
                key={producto.id}
                producto={producto}
              />
            ))}

          </div>

        )}

      </section>

      {/* CARRITO FIJO — TODO con paleta Salvia */}
{cantidadTotal > 0 && (
  <div className="
    fixed
    bottom-0
    left-0
    right-0
    bg-primario-claro/200
    backdrop-blur-md
    border-t
    border-primario-claro
    p-3 sm:p-4
    shadow-lg
    z-40
  ">
    <div className="
      max-w-7xl
      mx-auto
      flex
      items-center
      justify-between
      gap-4
    ">

      <p className="text-texto text-sm sm:text-base font-medium">
        {cantidadTotal} producto
        {cantidadTotal !== 1 ? "s" : ""}
      </p>

      <Link  
        to="/checkout"  
        className="  
          bg-primario-claro/200  
          hover:bg-primario-oscuro  
          text-white  
          px-5 sm:px-7  
          py-3  
          rounded-xl  
          text-sm
          font-medium
          transition-colors
        "  
      >  
        Ir a pagar →  
      </Link>

    </div>
  </div>
)}
      

    </main>
  );
}
