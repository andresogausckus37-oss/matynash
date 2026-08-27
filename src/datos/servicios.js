// 👇 CONFIGURACIÓN GLOBAL — EDITÁ ESTOS VALORES
export const CONFIG = {
  terapeuta: {
    nombre: "Maty Nash",
    bio: "Si no te sentís conforme con quién sos, cómo estás o hacia dónde vas, quizás sea momento de hacer una pausa y escucharte. Te acompaño en un proceso de transformación, claridad y crecimiento personal. Reservá tu sesión y empezá hoy.",
    fotoPerfil: "https://via.placeholder.com/150",
    fotoPortada: "https://i.postimg.cc/KzSm1TYC/IMG-20260825-WA0001.jpg",
    whatsapp: "5493548619293", // SIN espacios ni +
    instagram: "https://www.instagram.com/maty.nash",
    tiktok: "https://tiktok.com/@tu_usuario",
    facebook: "https://facebook.com/tu_pagina",
    moneda: "ARS",
    comisionPorcentaje: 15 // 👇 Tu comisión por cada reserva concretada
  },
  envioNacional: 8000
};

// 👇 SERVICIOS — AGREGÁ/EDITÁ ACÁ
export const SERVICIOS = [
  {
    id: "reiki-sesion-001",
    sku: "MAD-001",
    titulo: "Madruterapia - Tu ritual nocturno",
    descripcion: "Una pausa reservada para vos.\nSin ruido. Sin prisa. Sin mundo exterior.\n\nEn la intimidad de tu propio espacio, entrégate al placer de bajar el ritmo, respirar profundo y volver a sentirte. Un ritual de relajación, presencia y conexión energética, diseñado especialmente para vos.\n\nYo te acompaño a recorrer tu mundo interior, interpretar las señales de tu energía y despertar aquello que tu conciencia viene intentando decirte.\n\nLujo es poder detenerte.\nExclusividad es tener un espacio donde simplemente podés ser.\n\nMadruterapia.\nTu noche. Tu energía. Tu ritual privado.",
    precioARS: 15000,
    precioUSD: 15,
    imagenes: [
      "https://i.postimg.cc/rsdYgvDz/IMG-20260827-WA0001.jpg",
      "https://via.placeholder.com/600x400?text=Reiki+2"
    ],
    categoria: "reiki",
    productoRelacionadoId: "remera-reiki-001",
    productosRelacionadosIds: ["buzo-yoga-002"]
  },
  {
    id: "yoga-clase-002",
    sku: "HT-YOG-002",
    titulo: "Clase de Yoga Personalizada",
    descripcion: "Un espacio para reconectar con vos mismo, liberar tensiones y recuperar el equilibrio. A través de prácticas conscientes y herramientas de bienestar, podrás explorar tus emociones, cultivar mayor calma y fortalecer tu conexión interior. Regalate un momento para detenerte, escucharte y comenzar un camino hacia una vida más plena y armoniosa.",
    precioARS: 12000,
    precioUSD: 12,
    imagenes: [
      "https://i.postimg.cc/j5JSYGcj/pexels-elly-fairytale-3822534.jpg",
      "https://via.placeholder.com/600x400?text=Yoga+2"
    ],
    categoria: "yoga",
    productoRelacionadoId: "buzo-yoga-002",
    productosRelacionadosIds: ["remera-reiki-001"]
  }
];
