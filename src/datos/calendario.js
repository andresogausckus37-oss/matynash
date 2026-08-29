// ==========================================
// CONFIGURACIÓN DEL CALENDARIO
// ==========================================

export const CONFIG_CALENDARIO = {
  vista: "semanal",

  // ==========================================
  // DÍAS
  // ==========================================

  dias: {
    lunes: {
      estado: "reservado",
      texto: "Reservado",
    },

    martes: {
      estado: "disponible",
      texto: "Disponible",
    },

    miercoles: {
      estado: "disponible",
      texto: "Disponible",
    },

    jueves: {
      estado: "disponible",
      texto: "Disponible",
    },

    viernes: {
      estado: "disponible",
      texto: "Disponible",
    },

    sabado: {
      estado: "noDisponible",
      texto: "No disponible",
    },

    domingo: {
      estado: "noDisponible",
      texto: "No disponible",
    },
  },

  // ==========================================
  // SESIONES Y HORARIOS
  // ==========================================

  sesiones: {
    aura: {
      nombre: "Aura",
      duracion: 60,

      horarios: [
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
      ],
    },

    umbra: {
      nombre: "Umbra",
      duracion: 80,

      horarios: [
        "13:00",
        "14:20",
      ],
    },

    ritual: {
      nombre: "Ritual",
      duracion: 120,

      horarios: [
        "18:00",
      ],
    },

    madruterapia: {
      nombre: "Madruterapia",
      duracion: 120,

      horarios: [
        "01:00",
        "03:00",
      ],
    },
  },

  // ==========================================
  // TEXTOS
  // ==========================================

  textos: {
    disponible: "Disponible",
    reservado: "Reservado",
    noDisponible: "No disponible",
    seleccionado: "Seleccionado",
  },

  // ==========================================
  // COLORES
  // ==========================================

  colores: {
    disponible:
      "bg-green-50 border-green-300 text-green-700",

    reservado:
      "bg-gray-100 border-gray-300 text-gray-500",

    noDisponible:
      "bg-red-50 border-red-200 text-red-500",

    seleccionado:
      "bg-green-600 border-green-600 text-white",
  },
};