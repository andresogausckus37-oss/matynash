import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SERVICIOS, CONFIG } from "../datos/servicios";
import { ChevronLeft, ChevronRight, CreditCard, Calendar, CalendarDays } from "lucide-react";
import { useCarrito } from "../context/CarritoContext";
import CalendarioReservas from "../componentes/CalendarioReservas";

export default function DetalleServicio() {
  const [descripcionAbierta, setDescripcionAbierta] = useState(false);
  const [calendarioAbierto, setCalendarioAbierto] = useState(false);
  const { id } = useParams();
  const servicio = SERVICIOS.find((s) => s.id === Number(id) || s.id === id);
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();
  const [reserva, setReserva] = useState(null);

  const reservarAhora = () => {
    if (!reserva) return;
    agregarAlCarrito({ ...servicio, reserva });
    navigate("/checkout");
  };

  const { terapeuta } = CONFIG;

  if (!servicio) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-white border border-borde rounded-xl p-8 shadow-suave">
          <h2 className="text-2xl text-texto mb-4">Servicio no encontrado</h2>
          <Link to="/servicios" className="inline-flex items-center gap-1 text-primario hover:text-primario-oscuro text-sm transition-colors">
            <ChevronLeft size={17} /> Volver a servicios
          </Link>
        </div>
      </main>
    );
  }

  // ✅ CÁLCULOS DE PRECIOS
  const descuentoBase = servicio.descuentoPorcentaje || 0;
  const precioBase = servicio.precioARS;
  const precioConDescuento = descuentoBase > 0
    ? Math.round(precioBase * (1 - descuentoBase / 100))
    : precioBase;

  // Descuento extra 10% para 1 cuota (igual que en Checkout)
  const descuentoExtra = 10;
  const precioUnaCuota = Math.round(precioConDescuento * (1 - descuentoExtra / 100));
  const descuentoTotal = descuentoBase + descuentoExtra - (descuentoBase * descuentoExtra / 100);

  // Cuotas
  const cuotas = servicio.cuotasSinInteres || 3;
  const valorCuota = Math.round(precioConDescuento / cuotas);

  // USD
  const precioUSDConDescuento = descuentoBase > 0
    ? (servicio.precioUSD * (1 - descuentoBase / 100)).toFixed(2)
    : servicio.precioUSD;

  const formatearARS = (valor) => Number(valor).toLocaleString("es-AR");

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <section className="bg-white border-borde border rounded-xl overflow-hidden shadow-suave">
        <div className="grid md:grid-cols-3">

          {/* IMAGEN / VIDEO */}
          <div className="flex flex-col">
            <div className="w-full h-[250px] sm:h-[380px] md:h-full md:min-h-[500px] overflow-hidden bg-fondo">
              {servicio.videoUrl ? (
                <video src={servicio.videoUrl} controls autoPlay muted loop playsInline className="w-full h-full object-cover" />
              ) : (
                <img src={servicio.imagenes[0]} alt={servicio.titulo} className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]" />
              )}
            </div>
          </div>

          {/* SECCIÓN 1: INFO + DESCRIPCIÓN — MÁS COMPACTA ✅ */}
          <div className="p-5 sm:p-6 md:p-8 lg:p-9 flex flex-col">
            
            {/* TÍTULO */}
            <h1 className="text-2xl sm:text-3xl md:text-[32px] text-texto leading-tight mb-4">
              {servicio.titulo}
            </h1>

            {/* PRECIOS — SIN BADGE ARRIBA, TODO MÁS COMPACTO ✅ */}
            <div className="mb-5">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-4">
                {/* ARS */}
                <div>
                  <div className="text-2xl sm:text-3xl font-medium leading-tight">
                    $ {formatearARS(precioConDescuento)}
                  </div>
                  {descuentoBase > 0 && (
                    <div className="mt-1 text-sm text-texto-suave line-through">
                      $ {formatearARS(precioBase)}
                    </div>
                  )}
                </div>

                {/* USD */}
                {servicio.precioUSD && (
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-medium text-texto">
                      $ {precioUSDConDescuento} <span className="text-sm text-texto-suave">USD</span>
                    </div>
                    {descuentoBase > 0 && (
                      <div className="text-sm text-texto-suave line-through">
                        $ {servicio.precioUSD} USD
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 📋 OPCIÓN 1: 3 CUOTAS — CON ÍCONO + BADGE ✅ */}
              <p className="flex items-center gap-2 text-sm text-[#009EE3] mb-2">
                <CreditCard size={16} />
                <span>{cuotas} cuotas sin interés de <strong>${formatearARS(valorCuota)}</strong></span>
                {descuentoBase > 0 && (
                  <span className="ml-auto bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded-sm">
                    {descuentoBase}% OFF
                  </span>
                )}
              </p>

              {/* 📋 OPCIÓN 2: 1 CUOTA — CON ÍCONO + BADGE DESCUENTO TOTAL ✅ */}
              <p className="flex items-center gap-2 text-sm text-[#009EE3]">
                <CreditCard size={16} />
                <span>1 cuota sin interés de <strong>${formatearARS(precioUnaCuota)}</strong></span>
                <span className="ml-auto bg-green-100 text-green-700 text-xs font-medium px-1 py-0.5 rounded-sm">
                  {descuentoTotal.toFixed(0)}% OFF total
                </span>
              </p>
            </div>

            <div className="border-t border-borde mb-4" />

            {/* DESCRIPCIÓN — MÁS COMPACTA ✅ */}
            <div className="mb-6">
              <h2 className="text-base text-texto mb-2">Sobre esta sesión</h2>
              <p
                className={`text-sm text-texto-suave leading-relaxed whitespace-pre-line transition-all duration-300 ${
                  descripcionAbierta ? "" : "line-clamp-3"
                }`}
              >
                {servicio.descripcion}
              </p>
              {servicio.descripcion?.length > 150 && (
                <button
                  type="button"
                  onClick={() => setDescripcionAbierta(!descripcionAbierta)}
                  className="mt-2 inline-flex items-center gap-1 text-sm text-primario hover:text-primario-oscuro transition-colors"
                >
                  <span>{descripcionAbierta ? "Ver menos" : "Ver más"}</span>
                  <ChevronRight
                    size={14}
                    className={`transition-transform duration-200 ${descripcionAbierta ? "-rotate-90" : "rotate-90"}`}
                  />
                </button>
              )}
            </div>

            <div className="border-t border-borde mb-4" />

            {/* SECCIÓN 2: RESERVA — DESPLEGABLE */}
            <div className="mt-auto">
              <h2 className="text-base text-texto mb-3 flex items-center gap-2">
                <CalendarDays size={17} className="text-primario" />
                Reserva tu sesión
              </h2>

              <button
                type="button"
                onClick={() => setCalendarioAbierto(!calendarioAbierto)}
                className="w-full flex items-center justify-between gap-3 py-3 px-4 border border-borde rounded-lg text-left hover:border-primario hover:bg-fondo transition-all duration-200 mb-3"
              >
                <span className="font-medium text-texto text-sm">
                  {reserva
                    ? `${reserva.fecha} — ${reserva.hora}`
                    : "Seleccionar día y horario"}
                </span>
                <ChevronRight
                  size={17}
                  className={`text-primario transition-transform duration-300 ${calendarioAbierto ? "rotate-90" : ""}`}
                />
              </button>

              {calendarioAbierto && (
                <div className="mb-4 p-3 bg-fondo rounded-lg border border-borde animate-fadeIn">
                  <CalendarioReservas
                    tipoSesion={servicio.tipoCalendario}
                    valor={reserva}
                    onChange={setReserva}
                  />
                </div>
              )}

              <button
                id="boton-reservar"
                type="button"
                onClick={reservarAhora}
                disabled={!reserva}
                className={`w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  reserva
                    ? "bg-primario hover:bg-primario-oscuro active:scale-[0.99] text-white shadow-sm"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Calendar size={18} strokeWidth={1.8} />
                {reserva ? "Confirmar reserva" : "Elegí un día y horario"}
              </button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
