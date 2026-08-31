// ==========================================
// CONFIGURACIÓN GLOBAL
// ==========================================

export const CONFIG = {
  terapeuta: {
    
    fotoPerfil: "https://via.placeholder.com/150",
    fotoPortada: "https://i.postimg.cc/KzSm1TYC/IMG-20260825-WA0001.jpg",
    videoBannerUrl: "https://res.cloudinary.com/jqtldbag/video/upload/VID-20260828-WA0013.mp4",
    whatsapp: "5493518039490",
    instagram: "https://www.instagram.com/maty.nash",
    tiktok: "https://www.tiktok.com/@matynash?_r=1&_t=ZS-99Boint7LVP",
    facebook: "https://www.facebook.com/share/1HRi1dCmEQ/?mibextid=wwXIfr",
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
    titulo: "Madruterapia - Tu ritual nocturno",
    tipoCalendario: "madruterapia",
    descripcion:
      "Una pausa reservada para vos. Sin ruido. Sin prisa. Sin mundo exterior. En la intimidad de tu propio espacio, entrégate al placer de bajar el ritmo, respirar profundo y volver a sentirte. Un ritual de relajación, presencia y conexión energética, diseñado especialmente para vos. Yo te acompaño a recorrer tu mundo interior, interpretar las señales de tu energía y despertar aquello que tu conciencia viene intentando decirte. Lujo es poder detenerte. Exclusividad es tener un espacio donde simplemente podés ser.\n\n" +
      "Madruterapia. Tu noche. Tu energía. Tu ritual privado.",
    precioARS: 350000,
    precioUSD: 297,
    descuentoPorcentaje: 15,
    cuotasSinInteres: 3,
    imagenes: ["https://i.postimg.cc/rsdYgvDz/IMG-20260827-WA0001.jpg"],
    categoria: "terapia",
    resenas: [
      {
        nombre: "Carolina.",
        foto: "",
        comentario: "Una experiencia transformadora. Sentí una conexión profunda y mucha claridad después de la sesión. Maty tiene un don especial para acompañar con calma y presencia. Lo recomiendo totalmente.",
        puntuacion: 5,
        fecha: "Agosto 2026",
      },
      {
        nombre: "Mica.",
        foto: "",
        comentario: "Una noche mágica. Pude soltar cosas que llevaba cargando hace tiempo. El espacio que crea Maty es único, te hace sentir acompañada y segura desde el primer momento.",
        puntuacion: 5,
        fecha: "Agosto 2026",
      },
    ],
  },

  {
    id: "aura",
    titulo: "AURA • Apertura en energía",
    tipoCalendario: "aura",
    descripcion:
      "☀️ AURA — APERTURA EN ENERGÍA\n\n" +
      "Para cuando necesitás activar, despertar y comenzar diferente. Movimiento consciente, respiración, meditación y música pueden combinarse para crear una experiencia dinámica y estimulante. Despertá tu energía. Abrí el día desde vos.",
    precioARS: 90000,
    precioUSD: 99,
    cuotasSinInteres: 3,
    imagenes: ["https://i.postimg.cc/NjqMYw7Y/IMG-20260829-WA0013.jpg"],
    categoria: "terapia",
    resenas: [
      {
        nombre: "Marcelo.",
        foto: "",
        comentario: "Empecé mis días con otra energía desde que hice la sesión de Aura. Me ayudó a empezar el día liviano y enfocado. Una experiencia hermosa que te cambia mucho en solo una sesión",
        puntuacion: 5,
        fecha: "Agosto 2026",
      },
    ],
  },

  {
    id: "umbra",
    titulo: "UMBRA • Siesta & introspección",
    tipoCalendario: "umbra",
    descripcion:
      "🌿 UMBRA - SIESTA & INTROSPECCIÓN\n\n" +
      "Para cuando tu cuerpo pide pausa, pero tu mente todavía no sabe cómo detenerse. Respiración, masaje facial, lectura energética y un ambiente de calma para bajar el ritmo y recuperar presencia. Bajá el ruido. Escuchá lo que aparece.",
    precioARS: 120000,
    precioUSD: 130,
    cuotasSinInteres: 3,
    imagenes: ["https://i.postimg.cc/Hx4x532x/IMG-20260829-WA0012.jpg"],
    categoria: "terapia",
    resenas: [
      {
        nombre: "Lucía.",
        foto: "",
        comentario: "Me ayudó a reconectar conmigo misma y a soltar todo lo que venía cargando.. Una experiencia hermosa y necesaria para este momento de mi vida en el que no sabía bien cómo seguir. Gracias maty 🙏",
        puntuacion: 5,
        fecha: "Agosto 2026",
      },
    ],
  },

  {
    id: "ritual",
    titulo: "RITUAL • Noche & profundidad",
    tipoCalendario: "umbra",
    descripcion:
      "🌙 RITUAL - NOCHE & PROFUNDIDAD\n\n" +
      "Para cuando sentís que querés mirar un poco más profundo. Un encuentro íntimo que puede integrar meditación, hipnosis, autohipnosis, regresión y exploración de estados de conciencia, de acuerdo con cada experiencia. Luz baja. Velas. Música. Silencio. Hay una invitación a profundizar.",
    precioARS: 150000,
    precioUSD: 160,
    cuotasSinInteres: 3,
    imagenes: ["https://i.postimg.cc/yNKC9Kr9/IMG-20260829-WA0014.jpg"],
    categoria: "terapia",
    resenas: [
      {
        nombre: "Alejandra",
        foto: "",
        comentario: "tuve una experiencia increible con maty. Es un gran der humano, tocó dolores, me ayudó a comprenderme mas a mi mismo. Recomiendo sin duda su servicio para toda persona que busca reencontrarse consigo misma",
        puntuacion: "5",
        fecha: "Agosto 2026",
      },
    ],
  },
];
