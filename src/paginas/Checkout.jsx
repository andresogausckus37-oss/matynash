import { useState, useMemo } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import {
  obtenerDatosReferencia,
  obtenerWhatsAppReferencia,
} from "../utilidades/referencias";
import {
  ChevronLeft,
  X,
  CalendarDays,
  Clock3,
  User,
  Mail,
  CheckCircle2,
} from "lucide-react";

// CONSTANTS
const LOGO_PAYPAL = "https://i.postimg.cc/tR6swnc0/paypal.jpg";
const LOGO_MERCADO_PAGO = "https://i.postimg.cc/HnvvbP1F/Mercado-Pago-svg.png";
const LOGO_PAYPAL_BOTON = "https://i.postimg.cc/fbVTjgBw/9343.png";
const CORREO_PAYPAL = "Cuanticamente20@gmail.com";
const NOMBRE_PAYPAL = "Cristian Gehbert";

// AZUL MÁS SUAVE Y PROFESIONAL
const AZUL_BOTON = "#5B9BD5";

// AUXILIARY FUNCTIONS
function calcularPrecioConDescuento(item) {
  if (!item.descuentoPorcentaje) return item.precioARS;
  return Math.round(item.precioARS * (1 - item.descuentoPorcentaje / 100));
}

function calcularPrecioUSDConDescuento(item) {
  if (!item.descuentoPorcentaje) return Number(item.precioUSD);
  return Number((Number(item.precioUSD) * (1 - item.descuentoPorcentaje / 100)).toFixed(2));
}

function formatearFecha(fechaISO) {
  if (!fechaISO) return "Por coordinar";
  const fecha = new Date(`${fechaISO}T12:00:00`);
  return new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "long" }).format(fecha);
}

function formatearHora(hora) {
  if (!hora) return "Por coordinar";
  return `${hora} hs`;
}

function formatearARS(valor) {
  return Number(valor).toLocaleString("es-ES");
}

export default function Checkout() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();
  const navigate = useNavigate();

  // STATES
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [mostrarModalPayPal, setMostrarModalPayPal] = useState(false);

  // REFERENCE
  const referencia = obtenerDatosReferencia();
  const whatsapp = obtenerWhatsAppReferencia();

  // 📌 REDIRIGIR SI CARRITO VACÍO
  if (carrito.length === 0) {
    return <Navigate to="/" replace />;
  }

  // TOTALES CON DESCUENTO
  const totalOriginalARS = useMemo(() => 
    carrito.reduce((sum, item) => sum + item.precioARS, 0), 
    [carrito]
  );
  
  const totalFinalARS = useMemo(() => 
    carrito.reduce((sum, item) => sum + calcularPrecioConDescuento(item), 0), 
    [carrito]
  );
  
  const totalOriginalUSD = useMemo(() => 
    carrito.reduce((sum, item) => sum + Number(item.precioUSD || 0), 0), 
    [carrito]
  );
  
  const totalFinalUSD = useMemo(() => 
    carrito.reduce((sum, item) => sum + calcularPrecioUSDConDescuento(item), 0), 
    [carrito]
  );

    // ✅ DESCUENTOS — CALCULADOS CORRECTAMENTE
  const descuentoBasePorcentaje = carrito.find(item => item.descuentoPorcentaje)?.descuentoPorcentaje || 0;
  const descuentoExtraPorcentaje = 10;
  // 🎯 Descuento total combinado (base + extra)
  const descuentoTotalPorcentaje = Math.round(
    descuentoBasePorcentaje + descuentoExtraPorcentaje - (descuentoBasePorcentaje * descuentoExtraPorcentaje / 100)
  );

  // Precio con descuento extra aplicado
  const precioConDescuentoExtra = Math.round(totalFinalARS * (1 - descuentoExtraPorcentaje / 100));

  // CUOTAS
  const cuotas = carrito[0]?.cuotasSinInteres || 3;
  const valorCuota3 = Math.round(totalFinalARS / cuotas);
  const valorCuota1 = precioConDescuentoExtra;

  const descuentoGlobal = descuentoBasePorcentaje > 0;
  const primerDescuento = descuentoBasePorcentaje;
  

  // VALIDACIONES
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const formularioValido = nombre.trim().length >= 2 && emailValido && metodoPago;

  // MENSAJE WHATSAPP — DIFERENCIADO POR OPCIÓN ✅
  const generarMensajeWhatsApp = () => {
    const servicios = carrito.map((item) => {
      const precioFinal = calcularPrecioConDescuento(item);
      const fecha = formatearFecha(item.reserva?.fecha);
      const hora = formatearHora(item.reserva?.hora);

      if (metodoPago === "nacional-3") {
        return `Soy ${nombre.trim()} y quiero reservar la sesión de ${item.titulo} para el día ${fecha} a las ${hora}, con un valor de $${formatearARS(precioFinal)} en ${cuotas} cuotas sin interés de $${formatearARS(valorCuota3)}\n\nEspero el link de pago para confirmar mi lugar. Gracias 🙏🌿`;
      }
      if (metodoPago === "nacional-1") {
        return `Soy ${nombre.trim()} y quiero reservar la sesión de ${item.titulo} para el día ${fecha} a las ${hora}, con un valor de $${formatearARS(precioConDescuentoExtra)} en 1 pago\n\nEspero el link de pago para confirmar mi lugar. Gracias 🙏🌿`;
      }
      return "";
    }).join("\n\n");

    return encodeURIComponent(`Hola ${referencia.nombre}👏\n\n${servicios}`);
  };

  // ABRIR WHATSAPP
  const abrirWhatsApp = () => {
    const mensaje = generarMensajeWhatsApp();
    window.open(`https://wa.me/${whatsapp}?text=${mensaje}`, "_blank", "noopener,noreferrer");
    vaciarCarrito();
    navigate("/");
  };

  // ENVIAR PEDIDO
  const enviarPedido = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return alert("Ingresa tu nombre.");
    if (!emailValido) return alert("Ingresa un correo electrónico válido.");
    if (!metodoPago) return alert("Selecciona un método de pago.");
    
    if (metodoPago === "nacional-3" || metodoPago === "nacional-1") {
      return abrirWhatsApp();
    }
    if (metodoPago === "paypal") {
      setMostrarModalPayPal(true);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* VOLVER */}
      <Link
        to="/servicios"
        className="inline-flex items-center gap-1.5 text-sm text-primario hover:text-primario-oscuro transition-colors mb-6"
      >
        <ChevronLeft size={17} /> Volver a servicios
      </Link>

      {/* TÍTULO */}
      <div className="mb-8">
        <h1 className="text-xl font-medium text-texto">Finalizar reserva</h1>
        <p className="text-sm sm:text-base text-texto-suave mt-2">
          Revisa tu sesión, completa tus datos y elige cómo deseas pagar.
        </p>
      </div>

      <form
        onSubmit={enviarPedido}
        className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-8 items-start"
      >
        {/* COLUMNA IZQUIERDA — RESUMEN */}
        <div className="space-y-6">
          <section className="bg-white rounded-md border border-borde shadow-suave overflow-hidden">
            {carrito.map((item) => (
              <div key={item.id} className="p-5 sm:p-6">
                <div className="flex gap-4 items-start">
                  <img
                    src={item.imagenes?.[0]}
                    alt={item.titulo}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-medium text-texto leading-snug">{item.titulo}</h3>
                      <button
                        type="button"
                        onClick={() => eliminarDelCarrito(item.id)}
                        aria-label="Eliminar servicio"
                        className="text-texto-suave hover:text-red-500 transition-colors flex-shrink-0 focus:outline-none focus:ring-0"
                      >
                        <X size={19} />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1.5 text-sm text-texto-suave">
                      <p className="flex items-start gap-2">
                        <CalendarDays size={16} className="mt-0.5 flex-shrink-0" />
                        <span>{formatearFecha(item.reserva?.fecha)}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock3 size={16} />
                        <span>{formatearHora(item.reserva?.hora)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* COLUMNA DERECHA — DATOS + PAGO */}
        <div className="bg-white rounded-xl shadow-suave p-5 sm:p-6 lg:sticky lg:top-24 border border-borde">
          <h2 className="text-sm font-medium text-texto mb-5">Tus datos</h2>
          <div className="space-y-4">
            
            {/* NOMBRE */}
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-texto-suave" />
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre completo"
                className="w-full pl-10 pr-4 py-3 text-sm border border-borde rounded-md focus:outline-none focus:ring-0 focus:border-borde focus:shadow-sm transition-all duration-200"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-texto-suave" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full pl-10 pr-4 py-3 text-sm border border-borde rounded-md focus:outline-none focus:ring-0 focus:border-borde focus:shadow-sm transition-all duration-200"
                required
              />
            </div>

            {/* MÉTODOS DE PAGO — SEPARADOS POR NACIONAL / INTERNACIONAL ✅ */}
            <div className="pt-2">
              <p className="block text-sm font-medium text-texto mb-3">Método de pago</p>
              
              {/* 🏠 NACIONAL */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-texto-suave uppercase tracking-wider mb-2">Nacional con link de pago</p>
                <div className="space-y-3">
                  
                  {/* 3 CUOTAS */}
                  <label
                    className={`block p-1 rounded-lg border-2 cursor-pointer transition-all overflow-hidden focus:outline-none focus:ring-0 ${
                      metodoPago === "nacional-3"
                        ? "border-[#009EE3] bg-sky-50"
                        : "border-borde hover:border-[#009EE3]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pago"
                      value="nacional-3"
                      checked={metodoPago === "nacional-3"}
                      onChange={() => setMetodoPago("nacional-3")}
                      className="sr-only"
                    />
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: metodoPago === "nacional-3" ? "#009EE3" : "#ccc" }}
                      >
                        {metodoPago === "nacional-3" && (
                          <div className="w-2 h-2 rounded-full bg-[#009EE3]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <img
                          src={LOGO_MERCADO_PAGO}
                          alt="Mercado Pago"
                          className="h-10 w-auto object-contain mb-1.5"
                        />
                        <div className="flex items-baseline gap-2 mb-1">
                          {descuentoGlobal && (
                            <span className="text-xs text-texto-suave line-through">
                              ${formatearARS(totalOriginalARS)}
                            </span>
                          )}
                          <span className="text-lg font-semibold text-texto">
                            ${formatearARS(totalFinalARS)}
                          </span>
                          {descuentoGlobal && primerDescuento && (
                            <span className="bg-red-100 text-red-700 text-xs font-medium px-1.5 py-0.5 rounded-sm">
                              {primerDescuento}% OFF
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#009EE3] font-medium">
                         {cuotas} cuotas sin interés de ${formatearARS(valorCuota3)}
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* 1 CUOTA + 10% OFF */}
                  <label
                    className={`block p-1 rounded-lg border-2 cursor-pointer transition-all overflow-hidden focus:outline-none focus:ring-0 ${
                      metodoPago === "nacional-1"
                        ? "border-[#009EE3] bg-sky-50"
                        : "border-borde hover:border-[#009EE3]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pago"
                      value="nacional-1"
                      checked={metodoPago === "nacional-1"}
                      onChange={() => setMetodoPago("nacional-1")}
                      className="sr-only"
                    />
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: metodoPago === "nacional-1" ? "#009EE3" : "#ccc" }}
                      >
                        {metodoPago === "nacional-1" && (
                          <div className="w-2 h-2 rounded-full bg-[#009EE3]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <img
                          src={LOGO_MERCADO_PAGO}
                          alt="Mercado Pago"
                          className="h-10 w-auto object-contain mb-1.5"
                        />
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xs text-texto-suave line-through">
                            ${formatearARS(totalFinalARS)}
                          </span>
                          <span className="text-lg font-semibold text-texto">
                            ${formatearARS(precioConDescuentoExtra)}
                          </span>
                          <span className="bg-green-100 text-green-700 text-xs font-medium px-1.5 py-0.5 rounded-sm">
  {descuentoTotalPorcentaje}% OFF total
</span>
                        </div>
                        <p className="text-xs text-[#009EE3] font-medium">
                          1 cuota sin interés de ${formatearARS(precioConDescuentoExtra)}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* 🌍 INTERNACIONAL */}
              <div>
                <p className="text-xs font-semibold text-texto-suave uppercase tracking-wider mb-2">Internacional</p>
                
                {/* PAYPAL */}
                <label
                  className={`block p-1 rounded-lg border-2 cursor-pointer transition-all overflow-hidden focus:outline-none focus:ring-0 ${
                    metodoPago === "paypal"
                      ? "border-[#003087] bg-blue-50"
                      : "border-borde hover:border-[#003087]"
                  }`}
                >
                  <input
                    type="radio"
                    name="pago"
                    value="paypal"
                    checked={metodoPago === "paypal"}
                    onChange={() => setMetodoPago("paypal")}
                    className="sr-only"
                  />
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: metodoPago === "paypal" ? "#003087" : "#ccc" }}
                    >
                      {metodoPago === "paypal" && (
                        <div className="w-2 h-2 rounded-full bg-[#003087]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <img
                        src={LOGO_PAYPAL}
                        alt="PayPal"
                        className="h-10 w-auto object-contain mb-1.5"
                      />
                      <div className="flex items-baseline gap-2 mb-1">
                        {descuentoGlobal && totalOriginalUSD !== totalFinalUSD && (
                          <span className="text-xs text-texto-suave line-through">
                            ${totalOriginalUSD} USD
                          </span>
                        )}
                        <span className="text-lg font-semibold text-texto">
                          ${totalFinalUSD} USD
                        </span>
                        {descuentoGlobal && primerDescuento && (
                          <span className="bg-red-100 text-red-700 text-xs font-medium px-1.5 py-0.5 rounded-sm">
                            {primerDescuento}% OFF
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-texto-suave">
                        Para pagos internacionales
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

                        {/* BOTÓN FINAL */}
            <button
              type="submit"
              disabled={!formularioValido}
              style={{ backgroundColor: formularioValido ? AZUL_BOTON : undefined }}
              className="w-full mt-6 text-white font-medium py-3.5 rounded-md transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 focus:outline-none focus:ring-0 border-0 flex items-center justify-center gap-2"
            >
              {metodoPago === "paypal" ? (
                <>
                  <img 
                    src={LOGO_PAYPAL_BOTON} 
                    alt="PayPal" 
                    className="h-5 w-auto object-contain"
                  />
                  Continuar con PayPal
                </>
              ) : metodoPago === "nacional-3" || metodoPago === "nacional-1" ? (
                "Reservar por WhatsApp"
              ) : (
                "Completa tus datos"
              )}
            </button>
          </div>
        </div>
      </form>

      {/* MODAL PAYPAL */}
      {mostrarModalPayPal && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
          <div className="relative bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6">
            <button
              type="button"
              onClick={() => setMostrarModalPayPal(false)}
              className="absolute top-4 right-4 text-texto-suave hover:text-texto focus:outline-none focus:ring-0 border-0"
              aria-label="Cerrar"
            >
              <X size={21} />
            </button>
            <div className="flex justify-center mb-4">
              <img src={LOGO_PAYPAL} alt="PayPal" className="h-16 w-auto object-contain" />
            </div>
            <h3 className="text-xl font-medium text-texto mb-2 text-center">Realizar pago</h3>
            <p className="text-sm text-texto-suave mb-6 text-center">
              Transfiere el importe y luego confirma tu reserva por WhatsApp.
            </p>
            <div className="bg-fondo rounded-lg p-4 mb-4">
              <p className="text-xs text-texto-suave mb-1">Importe</p>
              <p className="text-2xl font-medium text-texto">${totalFinalUSD} USD</p>
            </div>
            <div className="border border-borde rounded-lg p-4 mb-5">
              <p className="text-xs text-texto-suave mb-1">Enviar pago a</p>
              <p className="text-sm font-medium text-primario break-all">{CORREO_PAYPAL}</p>
              <p className="text-xs text-texto-suave mt-1">A nombre de {NOMBRE_PAYPAL}</p>
            </div>
            <div className="mb-6">
              <p className="text-sm font-medium text-texto mb-3">Instrucciones</p>
              <ol className="space-y-3 text-sm text-texto-suave">
                <li className="flex gap-3">
                  <span className="font-medium text-primario">1.</span>
                  <span>Envía el importe con la nota "Sesión online".</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-primario">2.</span>
                  <span>No es necesario indicar dirección de envío.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-primario">3.</span>
                  <span>Una vez realizado el pago, presiona el botón para enviar tu comprobante.</span>
                </li>
              </ol>
            </div>
            <button
              type="button"
              onClick={() => {
                setMostrarModalPayPal(false);
                abrirWhatsApp();
              }}
              className="w-full flex items-center justify-center gap-2 text-white py-3.5 rounded-md font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-0 border-0"
              style={{ backgroundColor: AZUL_BOTON }}
            >
              <CheckCircle2 size={18} /> Enviar comprobante
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
