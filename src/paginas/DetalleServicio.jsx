import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { SERVICIOS, CONFIG } from "../datos/servicios";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Calendar,
} from "lucide-react";

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
        <div className="bg-white border border-borde rounded-xl p-8 shadow-suave">
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

  // PRECIO CON DESCUENTO
  const precioConDescuento = servicio.descuentoPorcentaje
    ? Math.round(
        servicio.precioARS *
          (1 - servicio.descuentoPorcentaje / 100)
      )
    : servicio.precioARS;

  // CUOTAS
  const cuotas = servicio.cuotasSinInteres || 12;
  const valorCuota = Math.round(
    precioConDescuento / cuotas
  );

  return (
    <main
      className="
        max-w-6xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-6
        sm:py-8
        lg:py-10
      "
    >
      <section
        className="
          bg-white
          border
          border-borde
          rounded-xl
          overflow-hidden
          shadow-suave
        "
      >
        <div className="grid md:grid-cols-2">

          {/* =================================
              IMAGEN / VIDEO
          ================================= */}
          <div className="flex flex-col">

            <div
              className="
                w-full
                h-[280px]
                sm:h-[380px]
                md:h-full
                md:min-h-[620px]
                overflow-hidden
                bg-fondo
              "
            >
              {servicio.videoUrl ? (
                <video
                  src={servicio.videoUrl}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="
                    w-full
                    h-full
                    object-cover
                  "
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
                    duration-700
                    hover:scale-[1.02]
                  "
                />
              )}
            </div>

            {/* VOLVER — DEBAJO DE LA IMAGEN */}
            <div className="px-5 sm:px-7 py-4 border-b md:border-b-0 border-borde">
              <Link
                to="/servicios"
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  text-sm
                  text-texto-suave
                  hover:text-primario
                  transition-colors
                  group
                "
              >
                <ChevronLeft
                  size={17}
                  className="
                    transition-transform
                    duration-200
                    group-hover:-translate-x-0.5
                  "
                />

                <span>Volver a servicios</span>
              </Link>
            </div>
          </div>

          {/* =================================
              INFORMACIÓN DEL SERVICIO
          ================================= */}
          <div
            className="
              p-5
              sm:p-7
              md:p-9
              lg:p-10
              flex
              flex-col
            "
          >

            {/* SKU */}
            <p
              className="
                text-[11px]
                sm:text-xs
                text-texto-suave
                font-mono
                tracking-wide
                mb-2
              "
            >
              SKU: {servicio.sku}
            </p>

            {/* TÍTULO */}
            <h1
              className="
                text-2xl
                sm:text-3xl
                md:text-[32px]
                text-texto
                leading-tight
                mb-5
              "
            >
              {servicio.titulo}
            </h1>

            {/* =================================
                PRECIO + DESCUENTO
            ================================= */}
            <div className="mb-4">

              {/* BADGE */}
              {servicio.descuentoPorcentaje && (
                <span
                  className="
                    inline-flex
                    items-center
                    bg-red-700
                    text-white
                    text-xs
                    font-medium
                    px-2.5
                    py-1
                    rounded-md
                    mb-3
                  "
                >
                  {servicio.descuentoPorcentaje}% OFF
                </span>
              )}

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">

                {/* PRECIO ORIGINAL */}
                {servicio.descuentoPorcentaje && (
                  <span
                    className="
                      text-base
                      sm:text-lg
                      text-texto-suave
                      line-through
                    "
                  >
                    ${servicio.precioARS.toLocaleString("es-AR")}
                  </span>
                )}

                {/* PRECIO FINAL */}
                <span
                  className="
                    text-2xl
                    sm:text-3xl
                    font-medium
                    text-primario
                  "
                >
                  ${precioConDescuento.toLocaleString("es-AR")}
                </span>

                {/* PAYPAL */}
                {servicio.precioUSD && (
                  <span
                    className="
                      flex
                      items-center
                      gap-1.5
                      text-sm
                      sm:text-base
                      text-texto-suave
                      sm:ml-2
                    "
                  >
                    <img
                      src="https://i.postimg.cc/tR6swnc0/paypal.jpg"
                      alt="PayPal"
                      className="h-4 w-auto object-contain"
                    />

                    ${servicio.precioUSD} USD
                  </span>
                )}
              </div>
            </div>

            {/* =================================
                CUOTAS MERCADO PAGO
            ================================= */}
            <div
              className="
                flex
                items-start
                gap-2
                mb-7
                text-sm
                text-[#009EE3]
              "
            >
              <CreditCard
                size={17}
                strokeWidth={1.8}
                className="shrink-0 mt-0.5"
              />

              <span>
                Hasta {cuotas} cuotas sin interés de{" "}
                <span className="font-medium">
                  ${valorCuota.toLocaleString("es-AR")}
                </span>{" "}
                con Mercado Pago
              </span>
            </div>

            {/* =================================
                SEPARADOR
            ================================= */}
            <div className="border-t border-borde mb-6" />

            {/* =================================
                DESCRIPCIÓN
            ================================= */}
            <div className="mb-7">

              <h2
                className="
                  text-base
                  sm:text-lg
                  text-texto
                  mb-3
                "
              >
                Sobre esta sesión
              </h2>

              <p
                className={`
                  text-sm
                  sm:text-base
                  text-texto-suave
                  leading-7
                  whitespace-pre-line
                  transition-all
                  duration-300
                  ${
                    descripcionAbierta
                      ? ""
                      : "line-clamp-4"
                  }
                `}
              >
                {servicio.descripcion}
              </p>

              {servicio.descripcion?.length > 180 && (
                <button
                  type="button"
                  onClick={() =>
                    setDescripcionAbierta(
                      !descripcionAbierta
                    )
                  }
                  className="
                    mt-3
                    inline-flex
                    items-center
                    gap-1
                    text-sm
                    text-primario
                    hover:text-primario-oscuro
                    transition-colors
                    group
                  "
                >
                  <span>
                    {descripcionAbierta
                      ? "Ver menos"
                      : "Ver más"}
                  </span>

                  <ChevronRight
                    size={15}
                    className={`
                      transition-transform
                      duration-200
                      ${
                        descripcionAbierta
                          ? "-rotate-90"
                          : "rotate-90"
                      }
                    `}
                  />
                </button>
              )}
            </div>

            {/* =================================
                RESERVAR
            ================================= */}
            <div className="mt-auto pt-2">

              <Link
                to="/checkout"
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2.5
                  bg-primario
                  hover:bg-primario-oscuro
                  active:scale-[0.99]
                  text-white
                  py-3.5
                  px-5
                  rounded-lg
                  text-sm
                  sm:text-base
                  font-medium
                  transition-all
                  duration-200
                  shadow-sm
                "
              >
                <Calendar
                  size={19}
                  strokeWidth={1.8}
                />

                Reservar ahora
              </Link>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}