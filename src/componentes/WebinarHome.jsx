import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Video,
  Gift,
  User,
  Mail,
  CheckCircle2,
  Users,
  ArrowRight,
} from "lucide-react";

import { WEBINAR } from "../datos/webinar";
import { obtenerDatosReferencia } from "../utilidades/referencias";

// ==========================================
// UTILIDADES
// ==========================================

function capitalizar(texto) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const texto = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(fecha);
  return capitalizar(texto);
}

function formatearHora(fechaISO) {
  const fecha = new Date(fechaISO);
  return new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(fecha);
}

function calcularTiempoRestante(fechaObjetivo) {
  const diferencia = new Date(fechaObjetivo).getTime() - Date.now();
  
  if (diferencia <= 0) {
    return { terminado: true, dias: 0, horas: 0, minutos: 0, segundos: 0 };
  }

  return {
    terminado: false,
    dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diferencia / (1000 * 60)) % 60),
    segundos: Math.floor((diferencia / 1000) % 60),
  };
}

function guardarRegistroTemporal(registro) {
  const CLAVE = "matynash_webinar_registros";
  try {
    const anteriores = JSON.parse(localStorage.getItem(CLAVE)) || [];
    const yaExiste = anteriores.some(
      (item) => item.email === registro.email && item.webinarId === registro.webinarId
    );
    if (yaExiste) return;
    localStorage.setItem(CLAVE, JSON.stringify([...anteriores, registro]));
  } catch {
    localStorage.setItem(CLAVE, JSON.stringify([registro]));
  }
}

// ==========================================
// COMPONENTE AUXILIAR — CONTADOR LLAMATIVO ✨
// ==========================================

function Contador({ numero, texto }) {
  return (
    <div className="flex flex-col items-center bg-primario text-white rounded-xl px-2 py-3 sm:px-3 sm:py-4 shadow-md">
      <span className="text-xl sm:text-2xl font-bold leading-none">{numero}</span>
      <span className="text-[10px] sm:text-xs opacity-80 mt-1">{texto}</span>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function WebinarHome() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [registrado, setRegistrado] = useState(false);
  const [tiempo, setTiempo] = useState(() => calcularTiempoRestante(WEBINAR.fecha));

  const referencia = useMemo(() => obtenerDatosReferencia(), []);

  useEffect(() => {
    if (!WEBINAR.activo) return;
    const intervalo = setInterval(() => {
      setTiempo(calcularTiempoRestante(WEBINAR.fecha));
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const formularioValido = nombre.trim().length >= 2 && emailValido;

  const registrarWebinar = (e) => {
    e.preventDefault();
    if (!nombre.trim()) { alert("Ingresá tu nombre."); return; }
    if (!emailValido) { alert("Ingresá un correo electrónico válido."); return; }

    const registro = {
      webinarId: WEBINAR.id,
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      referido: referencia?.codigo || "maty",
      fechaRegistro: new Date().toISOString(),
    };

    guardarRegistroTemporal(registro);
    setRegistrado(true);
  };

  if (!WEBINAR.activo) return null;

  const grupoConfigurado = WEBINAR.whatsappGrupo && WEBINAR.whatsappGrupo.startsWith("https://");

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section
      id="webinar"
      className="w-full bg-white border-borde rounded-2xl overflow-hidden shadow-suave"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        
        {/* ======================================
            COLUMNA IZQUIERDA — INFO + CUENTA REGRESIVA
        ====================================== */}
        <div className="p-5 sm:p-6 lg:p-8">
          {/* Etiqueta */}
          <p className="text-[11px] sm:text-xs tracking-[0.18em] font-medium text-primario mb-3">
            {WEBINAR.etiqueta}
          </p>

          {/* Título */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl leading-tight text-texto max-w-2xl">
            {WEBINAR.titulo}
          </h2>

          {/* Descripción */}
          <p className="mt-2 text-sm leading-relaxed text-texto-suave max-w-xl">
            {WEBINAR.descripcion}
          </p>

          {/* 📋 DATOS EN 2 COLUMNAS — MÁS COMPACTO ✅ */}
          <div className="grid grid-cols-1 gap-3 mt-5">
            {/* Fecha */}
            <div className="flex items-start gap-2">
              <CalendarDays size={18} className="text-primario flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-texto-suave">Fecha</p>
                <p className="text-sm font-medium text-texto mt-0.5">
                  {formatearFecha(WEBINAR.fecha)}
                </p>
              </div>
            </div>

            {/* Horario */}
            <div className="flex items-start gap-2">
              <Clock3 size={18} className="text-primario flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-texto-suave">Horario Argentina 🇦🇷</p>
                <p className="text-sm font-medium text-texto mt-0.5">
                  {formatearHora(WEBINAR.fecha)} hs · {WEBINAR.duracion} min
                </p>
              </div>
            </div>

            {/* Modalidad */}
            <div className="flex items-start gap-2">
              <Video size={18} className="text-primario flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-texto-suave">Modalidad</p>
                <p className="text-sm font-medium text-texto mt-0.5">
                  En vivo por {WEBINAR.plataforma}
                </p>
              </div>
            </div>

            {/* Incluye */}
            <div className="flex items-start gap-2">
              <Gift size={18} className="text-primario flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-texto-suave">Incluye</p>
                <p className="text-sm font-medium text-texto mt-0.5">
                  {WEBINAR.regalo}
                </p>
              </div>
            </div>
          </div>

          {/* ⏱️ CUENTA REGRESIVA — DISEÑO LLAMATIVO ✨ */}
          {!tiempo.terminado ? (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-texto-suave mb-3 text-center">
                Comienza en
              </p>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto">
                <Contador numero={tiempo.dias} texto="Días" />
                <Contador numero={tiempo.horas} texto="Horas" />
                <Contador numero={tiempo.minutos} texto="Min" />
                <Contador numero={tiempo.segundos} texto="Seg" />
              </div>
            </div>
          ) : (
            <div className="mt-6 text-center text-sm text-primario font-medium">
              El encuentro ya comenzó o está por comenzar.
            </div>
          )}
        </div>

        {/* ======================================
            COLUMNA DERECHA — FORMULARIO / CONFIRMACIÓN
        ====================================== */}
        <div className="bg-fondo border-t lg:border-t-0 lg:border-l border-borde p-5 sm:p-6 lg:p-8 flex items-center">
          {!registrado ? (
            <div className="w-full">
              <h3 className="text-lg sm:text-xl text-texto mb-4 font-medium">
                Resera tu lugar ahora
              </h3>
              

              <form onSubmit={registrarWebinar} className="space-y-3">
                <div className="relative">
                  <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-texto-suave" />
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre"
                    autoComplete="name"
                    className="w-full h-11 pl-11 pr-4 bg-white border border-borde rounded-lg text-sm text-texto outline-none focus:border-primario focus:ring-2 focus:ring-primario/10 transition-all"
                  />
                </div>

                <div className="relative">
                  <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-texto-suave" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    autoComplete="email"
                    inputMode="email"
                    className="w-full h-11 pl-11 pr-4 bg-white border border-borde rounded-lg text-sm text-texto outline-none focus:border-primario focus:ring-2 focus:ring-primario/10 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!formularioValido}
                  className="w-full h-11 mt-1 flex items-center justify-center gap-2 rounded-lg bg-primario hover:bg-primario-oscuro disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium transition-all duration-200"
                >
                  Reservar mi lugar
                  <ArrowRight size={16} />
                </button>
              </form>

              <div className="mt-4 flex items-start gap-2 text-xs text-texto-suave leading-relaxed">
                <Users size={14} className="mt-0.5 flex-shrink-0" />
                <span>
                  Después del registro accedé al grupo privado donde compartiremos el enlace.
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-primario/10 flex items-center justify-center mb-4">
                <CheckCircle2 size={24} className="text-primario" />
              </div>

              <h3 className="text-lg sm:text-xl font-medium text-texto">
                Tu lugar está reservado
              </h3>
              
              <p className="text-sm text-texto-suave mt-1">
                {formatearFecha(WEBINAR.fecha)} · {formatearHora(WEBINAR.fecha)} hs
              </p>

              <div className="mt-4 bg-white border border-borde rounded-lg p-4 text-left">
                <p className="text-sm font-medium text-texto">Siguiente paso</p>
                <p className="text-sm text-texto-suave mt-1">
                  Unite al grupo privado de WhatsApp. Ahí compartiremos el enlace de Zoom y recordatorios.
                </p>
              </div>

              {grupoConfigurado ? (
                <a
                  href={WEBINAR.whatsappGrupo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:opacity-90 text-white text-sm font-medium transition-opacity"
                >
                  Unirme al grupo de WhatsApp
                  <ArrowRight size={16} />
                </a>
              ) : (
                <div className="mt-4 border border-amber-200 bg-amber-50 rounded-lg p-3 text-xs text-amber-700">
                  ⚠️ El enlace de WhatsApp aún no está configurado.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
