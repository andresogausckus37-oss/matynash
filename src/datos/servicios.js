// ==========================================
// CONFIGURACIÓN GLOBAL
// ==========================================

export const CONFIG = {
  terapeuta: {
    nombre: "Soy Maty Nash",

    bio:
      "Si no te sentís conforme con quién sos, cómo estás o hacia dónde vas, quizás sea momento de hacer una pausa y escucharte. Te acompaño en un proceso de transformación, claridad y crecimiento personal. Reservá tu sesión y empezá hoy.",

    fotoPerfil: "https://via.placeholder.com/150",

    fotoPortada:
      "https://i.postimg.cc/KzSm1TYC/IMG-20260825-WA0001.jpg",

    videoBannerUrl:
      "https://res.cloudinary.com/jqtldbag/video/upload/VID-20260828-WA0013.mp4",

    whatsapp: "5493548619293",

    instagram:
      "https://www.instagram.com/maty.nash",

    tiktok:
      "https://www.tiktok.com/@matynash?_r=1&_t=ZS-99Boint7LVP",

    facebook:
      "https://www.facebook.com/share/1HRi1dCmEQ/?mibextid=wwXIfr",

    moneda: "ARS",

    comisionPorcentaje: 15,
  },
};

// ==========================================
// SERVICIOS
// ==========================================

export const SERVICIOS = [
  {
    id: "madruterapia",

    sku: "MN-MAD",

    titulo:
      "Madruterapia - Tu ritual nocturno",

    // Relaciona este servicio con
    // calendario.js
    tipoCalendario: "madruterapia",

    descripcion:
"Una pausa reservada para vos. Sin ruido. Sin prisa. Sin mundo exterior. En la intimidad de tu propio espacio, entrégate al placer de bajar el ritmo, respirar profundo y volver a sentirte. Un ritual de relajación, presencia y conexión energética, diseñado especialmente para vos. Yo te acompaño a recorrer tu mundo interior, interpretar las señales de tu energía y despertar aquello que tu conciencia viene intentando decirte. Lujo es poder detenerte. Exclusividad es tener un espacio donde simplemente podés ser.\n\n" +
"Madruterapia. Tu noche. Tu energía. Tu ritual privado.",

    precioARS: 350000,

    precioUSD: 297,

    descuentoPorcentaje: 15,

    cuotasSinInteres: 3,

    imagenes: [
      "https://i.postimg.cc/rsdYgvDz/IMG-20260827-WA0001.jpg",
    ],

    categoria: "terapia",
  },

  {
    id: "aura",

    sku: "HT-YOG-002",

    titulo:
      "AURA • Apertura en energía",

    // TEMPORAL:
    // utilizamos el horario Aura
    // (mañana / 60 minutos)
    tipoCalendario: "aura",

    descripcion:
"☀️ AURA — APERTURA EN ENERGÍA\n\n" +
"Para cuando necesitás activar, despertar y comenzar diferente. Movimiento consciente, respiración, meditación y música pueden combinarse para crear una experiencia dinámica y estimulante. Despertá tu energía. Abrí el día desde vos.",

    precioARS: 90000,

    precioUSD: 99,

    cuotasSinInteres: 3,

    imagenes: [
      "https://i.postimg.cc/NjqMYw7Y/IMG-20260829-WA0013.jpg",
    ],

    categoria: "terapia",
  },
];