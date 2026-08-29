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
      "https://player.cloudinary.com/embed/?jqtldbag=jqtldbag&public_id=VID-20260828-WA0013",

    whatsapp: "5493548619293",

    instagram:
      "https://www.instagram.com/maty.nash",

    tiktok:
      "https://www.tiktok.com/@matynash?_r=1&_t=ZS-99Boint7LVP",

    facebook:
      "https://facebook.com/tu_pagina",

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
      "Una pausa reservada para vos.\n" +
      "Sin ruido. Sin prisa. Sin mundo exterior.\n\n" +
      "En la intimidad de tu propio espacio, entrégate al placer de bajar el ritmo, respirar profundo y volver a sentirte. Un ritual de relajación, presencia y conexión energética, diseñado especialmente para vos.\n\n" +
      "Yo te acompaño a recorrer tu mundo interior, interpretar las señales de tu energía y despertar aquello que tu conciencia viene intentando decirte.\n\n" +
      "Lujo es poder detenerte.\n" +
      "Exclusividad es tener un espacio donde simplemente podés ser.\n\n" +
      "Madruterapia.\n" +
      "Tu noche. Tu energía. Tu ritual privado.",

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
    id: "yoga-clase-002",

    sku: "HT-YOG-002",

    titulo:
      "Clase de Yoga Personalizada",

    // TEMPORAL:
    // utilizamos el horario Aura
    // (mañana / 60 minutos)
    tipoCalendario: "aura",

    descripcion:
      "Un espacio para reconectar con vos mismo, liberar tensiones y recuperar el equilibrio. A través de prácticas conscientes y herramientas de bienestar, podrás explorar tus emociones, cultivar mayor calma y fortalecer tu conexión interior. Regalate un momento para detenerte, escucharte y comenzar un camino hacia una vida más plena y armoniosa.",

    precioARS: 12000,

    precioUSD: 12,

    cuotasSinInteres: 6,

    imagenes: [
      "https://i.postimg.cc/j5JSYGcj/pexels-elly-fairytale-3822534.jpg",
    ],

    categoria: "yoga",
  },
];