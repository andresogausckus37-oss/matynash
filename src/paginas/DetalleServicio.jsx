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

  // Precios con descuento
  const precioConDescuento = servicio.descuentoPorcentaje
    ? Math.round(servicio.precioARS * (1 - servicio.descuentoPorcentaje / 100))
    : servicio.precioARS;

  const precioUSDConDescuento = servicio.descuentoPorcentaje
    ? (servicio.precioUSD * (1 - servicio.descuentoPorcentaje / 100)).toFixed(2)
    : servicio.precioUSD;

  const cuotas = servicio.cuotasSinInteres || 12;
  const valorCuota = Math.round(precioConDescuento / cuotas);

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
            <div className="px-5 sm:px-7 py-4 border-b md:border-b-0 border-borde">
              <Link to="/servicios" className="inline-flex items-center gap-1.5 text-sm text-texto-suave hover:text-primario transition-colors group">
                <ChevronLeft size={17} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
                <span>Volver a servicios</span>
              </Link>
            </div>
          </div>

          {/* SECCIÓN 1: INFO + DESCRIPCIÓN */}
          <div className="p-5 sm:p-7 md:p-9 lg:p-10 flex flex-col">
            
            {/* TÍTULO */}
            <h1 className="text-2xl sm:text-3xl md:text-[32px] text-texto leading-tight mb-5">
              {servicio.titulo}
            </h1>

            {/* PRECIOS — SIN LOGO PAYPAL, SIN SKU */}
            <div className="mb-5">
              {servicio.descuentoPorcentaje && (
                <span className="inline-flex items-center bg-red-700 text-white text-xs font-medium px-2.5 py-1 rounded-md mb-4">
                  {servicio.descuentoPorcentaje}% OFF
                </span>
              )}

              <div className="grid grid-cols-2 gap-5 sm:gap-8">
                {/* MERCADO PAGO / ARS */}
                <div>
                  <div className="text-2xl sm:text-3xl font-medium text-primario leading-tight">
                    $ {precioConDescuento.toLocaleString("es-AR")}
                  </div>
                  {servicio.descuentoPorcentaje && (
                    <div className="mt-1 text-sm sm:text-base text-texto-suave line-through">
                      $ {servicio.precioARS.toLocaleString("es-AR")}
                    </div>
                  )}
                </div>

                {/* PAYPAL / USD — SIN LOGO */}
                {servicio.precioUSD && (
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-medium text-texto">
                      $ {precioUSDConDescuento} <span className="text-sm text-texto-suave">USD</span>
                    </div>
                    {servicio.descuentoPorcentaje && (
                      <div className="text-sm sm:text-base text-texto-suave line-through">
                        $ {servicio.precioUSD} USD
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* CUOTAS MERCADO PAGO */}
            <div className="flex items-start gap-2 mb-7 text-sm text-[#009EE3]">
              
              <span>
                Hasta {cuotas} cuotas sin interés de{" "}
                <span className="font-medium">$ {valorCuota.toLocaleString("es-AR")} con link</span>
              </span>
            </div>

            <div className="border-t border-borde mb-6" />

            {/* DESCRIPCIÓN */}
            <div className="mb-8">
              <h2 className="text-base sm:text-lg text-texto mb-3">Sobre esta sesión</h2>
              <p
                className={`text-sm sm:text-base text-texto-suave leading-7 whitespace-pre-line transition-all duration-300 ${
                  descripcionAbierta ? "" : "line-clamp-4"
                }`}
              >
                {servicio.descripcion}
              </p>
              {servicio.descripcion?.length > 180 && (
                <button
                  type="button"
                  onClick={() => setDescripcionAbierta(!descripcionAbierta)}
                  className="mt-3 inline-flex items-center gap-1 text-sm text-primario hover:text-primario-oscuro transition-colors group"
                >
                  <span>{descripcionAbierta ? "Ver menos" : "Ver más"}</span>
                  <ChevronRight
                    size={15}
                    className={`transition-transform duration-200 ${descripcionAbierta ? "-rotate-90" : "rotate-90"}`}
                  />
                </button>
              )}
            </div>

            {/* SEPARADOR ENTRE SECCIONES */}
            <div className="border-t border-borde mb-6" />

            {/* SECCIÓN 2: RESERVA — DESPLEGABLE */}
            <div className="mt-auto">
              <h2 className="text-base sm:text-lg text-texto mb-4 flex items-center gap-2">
                <CalendarDays size={18} className="text-primario" />
                Reserva tu sesión
              </h2>

              {/* BOTÓN DESPLEGABLE */}
              <button
                type="button"
                onClick={() => setCalendarioAbierto(!calendarioAbierto)}
                className="w-full flex items-center justify-between gap-3 py-3.5 px-4 border border-borde rounded-lg text-left hover:border-primario hover:bg-fondo transition-all duration-200 mb-4"
              >
                <span className="font-medium text-texto">
                  {reserva
                    ? `${reserva.fecha} — ${reserva.hora}`
                    : "Seleccionar día y horario"}
                </span>
                <ChevronRight
                  size={18}
                  className={`text-primario transition-transform duration-300 ${calendarioAbierto ? "rotate-90" : ""}`}
                />
              </button>

              {/* CALENDARIO DESPLEGABLE */}
              {calendarioAbierto && (
                <div className="mb-6 p-4 bg-fondo rounded-lg border border-borde animate-fadeIn">
                  <CalendarioReservas
                    tipoSesion={servicio.tipoCalendario}
                    valor={reserva}
                    onChange={setReserva}
                  />
                </div>
              )}

              {/* BOTÓN FINAL */}
              <button
                id="boton-reservar"
                type="button"
                onClick={reservarAhora}
                disabled={!reserva}
                className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                  reserva
                    ? "bg-primario hover:bg-primario-oscuro active:scale-[0.99] text-white shadow-sm"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Calendar size={19} strokeWidth={1.8} />
                {reserva ? "Confirmar reserva" : "Elegí un día y horario"}
              </button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
