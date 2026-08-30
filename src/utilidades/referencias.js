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

// ==========================================
// CONFIGURACIÓN
// ==========================================

const CLAVE_REFERENCIA = "matynash_referencia";

// 30 días en milisegundos
const DURACION_REFERENCIA =
  30 * 24 * 60 * 60 * 1000;

// ==========================================
// GUARDAR REFERENCIA
// ==========================================

export function guardarReferencia(codigo) {
  const referencia = REFERENCIAS[codigo];

  // Código inexistente
  if (!referencia) {
    return null;
  }

  // Revisar si ya existe un First Click válido
  const referenciaExistente = obtenerReferencia();

  // FIRST CLICK ESTRICTO:
  // si ya existe, no se reemplaza.
  if (referenciaExistente) {
    return referenciaExistente;
  }

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
  const guardado = localStorage.getItem(
    CLAVE_REFERENCIA
  );

  if (!guardado) {
    return null;
  }

  try {
    const datos = JSON.parse(guardado);

    // Validar estructura
    if (!datos?.codigo || !datos?.fecha) {
      localStorage.removeItem(
        CLAVE_REFERENCIA
      );

      return null;
    }

    // Validar que el referente siga existiendo
    if (!REFERENCIAS[datos.codigo]) {
      localStorage.removeItem(
        CLAVE_REFERENCIA
      );

      return null;
    }

    // Verificar vencimiento
    const tiempoTranscurrido =
      Date.now() - datos.fecha;

    if (
      tiempoTranscurrido >=
      DURACION_REFERENCIA
    ) {
      localStorage.removeItem(
        CLAVE_REFERENCIA
      );

      return null;
    }

    return datos.codigo;
  } catch {
    // Datos antiguos, corruptos o incompatibles
    localStorage.removeItem(
      CLAVE_REFERENCIA
    );

    return null;
  }
}

// ==========================================
// OBTENER DATOS DEL REFERENTE
// ==========================================

export function obtenerDatosReferencia() {
  const codigo = obtenerReferencia();

  // Si todavía no existe referencia,
  // usamos Maty como destino por defecto.
  if (!codigo) {
    return REFERENCIAS.maty;
  }

  return (
    REFERENCIAS[codigo] ||
    REFERENCIAS.maty
  );
}

// ==========================================
// OBTENER WHATSAPP DEL REFERENTE
// ==========================================

export function obtenerWhatsAppReferencia() {
  return obtenerDatosReferencia().whatsapp;
}