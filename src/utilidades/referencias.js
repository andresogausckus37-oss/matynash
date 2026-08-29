// ==========================================
// CONFIGURACIÓN DE REFERENCIAS
// ==========================================

const REFERENCIAS = {
  maty: {
    codigo: "maty",
    nombre: "Maty",
    whatsapp: "5493518039490",
  },

  andres: {
    codigo: "andres",
    nombre: "Andrés",
    whatsapp: "5493548619293",
  },
};

const CLAVE_REFERENCIA = "matynash_referencia";

// Duración del First Click: 30 días
const DURACION_REFERENCIA =
  30 * 24 * 60 * 60 * 1000;

// ==========================================
// GUARDAR REFERENCIA
// ==========================================

export function guardarReferencia(codigo) {
  const referencia = REFERENCIAS[codigo];

  if (!referencia) {
    return null;
  }

  // Revisamos si ya existe una referencia válida
  const referenciaExistente = obtenerReferencia();

  // First Click:
  // si ya existe una referencia válida, la mantenemos.
  if (referenciaExistente) {
    return referenciaExistente;
  }

  // Si no existe o venció, guardamos una nueva.
  const datos = {
    codigo: referencia.codigo,
    fecha: Date.now(),
  };

  localStorage.setItem(
    CLAVE_REFERENCIA,
    JSON.stringify(datos)
  );

  return referencia.codigo;
}

// ==========================================
// OBTENER REFERENCIA
// ==========================================

export function obtenerReferencia() {
  const guardado =
    localStorage.getItem(CLAVE_REFERENCIA);

  if (!guardado) {
    return null;
  }

  try {
    const datos = JSON.parse(guardado);

    // Validamos que tenga la estructura correcta
    if (!datos.codigo || !datos.fecha) {
      localStorage.removeItem(CLAVE_REFERENCIA);
      return null;
    }

    // Calculamos cuánto tiempo pasó
    const tiempoTranscurrido =
      Date.now() - datos.fecha;

    // Si pasaron más de 30 días, eliminamos
    // la referencia y queda disponible
    // para un nuevo First Click.
    if (tiempoTranscurrido >= DURACION_REFERENCIA) {
      localStorage.removeItem(CLAVE_REFERENCIA);
      return null;
    }

    return datos.codigo;
  } catch (error) {
    // Si hay datos antiguos o dañados,
    // los eliminamos.
    localStorage.removeItem(CLAVE_REFERENCIA);
    return null;
  }
}

// ==========================================
// OBTENER DATOS DEL REFERENTE
// ==========================================

export function obtenerDatosReferencia() {
  const codigo = obtenerReferencia();

  if (!codigo) {
    return REFERENCIAS.maty;
  }

  return REFERENCIAS[codigo] || REFERENCIAS.maty;
}

// ==========================================
// OBTENER WHATSAPP
// ==========================================

export function obtenerWhatsAppReferencia() {
  const referencia = obtenerDatosReferencia();

  return referencia.whatsapp;
}