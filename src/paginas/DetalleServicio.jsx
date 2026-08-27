import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { SERVICIOS, CONFIG } from "../datos/servicios";
import ProductosRelacionados from "../componentes/ProductosRelacionados";
import { ChevronLeft, ChevronRight, CreditCard, ShoppingCart } from "lucide-react";

export default function DetalleServicio() {
  const [descripcionAbierta, setDescripcionAbierta] = useState(false);
  
  const { id } = useParams();

  const servicio = SERVICIOS.find(
    (s) => s.id === Number(id) || s.id === id
  );

  const { terapeuta } = CONFIG;

  if (!servicio) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-white border border-borde rounded-md p-8 shadow-suave">
          <h2 className="text-2xl text-texto mb-4">
            Servicio no encontrado
          </h2>
          <Link
            to="/servicios"
            className="
              inline-flex
              items-center
              gap-1.5
              text-primario
              hover:text-primario-oscuro
              text-sm
              transition-colors
            "
          >
            <ChevronLeft size={17} />
            Volver a servicios
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

      {/* VOLVER */}
      <Link
        to="/servicios"
        className="
          inline-flex
          items-center
          gap-1.5
          text-primario
          hover:text-primario-oscuro
          text-sm
          mb-7
          transition-colors
        "
      >
        <ChevronLeft size={17} />
        Volver a servicios
      </Link>

      {/* CONTENIDO PRINCIPAL */}
      <section className="
        bg-white
        border
        border-borde
        rounded-md
        overflow-hidden
        shadow-suave
        mb-14
      ">
        <div className="grid md:grid-cols-2">

          {/* ========== IMAGEN / VIDEO ========== */}
          <div className="h-72 sm:h-96 md:h-full min-h-[300px] overflow-hidden bg-fondo">
            {/* ✅ Si tenés videoUrl en el servicio, muestra video; si no, imagen */}
            {servicio.videoUrl ? (
              <video
                src={servicio.videoUrl}
                controls
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={servicio.imagenes[0]}
                alt={servicio.titulo}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-500
                  hover:scale-105
                "
              />
            )}
          </div>

          {/* ========== INFORMACIÓN ========== */}
          <div className="p-6 sm:p-8 md:p-10 flex flex-col">

            {/* SKU */}
            <p className="text-xs text-texto-suave font-mono mb-3">
              SKU: {servicio.sku}
            </p>

            {/* TÍTULO */}
            <h1 className="text-xl sm:text-3xl text-texto leading-snug mb-5">
              {servicio.titulo}
            </h1>

            {/* DESCRIPCIÓN */}
            <div className="mb-7">
              <p
                className={`
                  text-sm
                  sm:text-base
                  text-texto-suave
                  leading-relaxed
                  transition-all
                  duration-300
                  ${descripcionAbierta ? "" : "line-clamp-3"}
                `}
              >
                {servicio.descripcion}
              </p>

              {servicio.descripcion?.length > 180 && (
                <button
                  onClick={() => setDescripcionAbierta(!descripcionAbierta)}
                  className="
                    mt-2
                    inline-flex
                    items-center
                    gap-1
                    text-primario
                    hover:text-primario-oscuro
                    text-sm
                    transition-colors
                  "
                >
                  {descripcionAbierta ? "Ver menos" : "Ver más"}
                  <ChevronRight
                    size={15}
                    className={`transition-transform duration-200 ${
                      descripcionAbierta ? "-rotate-90" : "rotate-90"
                    }`}
                  />
                </button>
              )}
            </div>

            {/* SEPARADOR */}
            <div className="border-t border-borde mb-6" />

            {/* PRECIOS */}
            <div className="mb-3">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-2xl sm:text-3xl text-primario font-semibold">
                  ${servicio.precioARS.toLocaleString("es-AR")}
                </span>
                <span className="text-base sm:text-lg text-texto-suave">
                  $ {servicio.precioUSD} USD PayPal
                </span>
              </div>
            </div>

            {/* ✅ CUOTAS — AZUL MERCADO PAGO + ÍCONO */}
            <p className="
              flex
              items-center
              gap-1.5
              text-sm
              text-[#009EE3]
              font-medium
              mb-8
            ">
              <CreditCard size={16} className="text-[#009EE3]" />
              Hasta 12 cuotas sin interés con Mercado Pago
            </p>

            {/* ✅ BOTÓN — AGREGAR AL CARRITO (verde suave #C5EEA8) */}
            <Link
              to="/tienda"
              className="
                mt-auto
                w-full
                flex
                items-center
                justify-center
                gap-2.5
                bg-[#C5EEA8]
                hover:bg-[#A8E080]
                text-texto
                py-3
                px-5
                rounded-md
                text-sm
                font-medium
                border
                border-[#B5E497]
                transition-all
                duration-200
              "
            >
              <ShoppingCart size={19} strokeWidth={1.8} />
              Agregar al carrito
            </Link>

          </div>
        </div>
      </section>

      {/* PRODUCTOS RELACIONADOS */}
      <section>
        <ProductosRelacionados
          productoId={servicio.id}
          productoRelacionadoId={servicio.productoRelacionadoId}
          productosRelacionadosIds={
            servicio.productosRelacionadosIds || []
          }
          titulo="Complementá tu práctica"
        />
      </section>

    </main>
  );
}
