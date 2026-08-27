// 👇 COLECCIONES — EDITÁ/AGREGÁ ACÁ
export const COLECCIONES = [
  
  {
    id: '7-chakras',
    titulo: 'Chakras & Energía',
    bannerUrl: 'https://i.postimg.cc/LXmBNKZv/IMG-20260826-WA1880.jpg', // Tu imagen Postimages
    descripcion: 'Armonización de tu cuerpo energético'
  },
  {
    id: 'tarot',
    titulo: 'Mystic & Tarot',
    bannerUrl: 'https://i.postimg.cc/9MzzWL3C/IMG-20260826-WA9246.jpg',
    descripcion: 'Guía y claridad interior'
  },
  {
    id: 'buda',
    titulo: 'Geometría Sagrada',
    bannerUrl: 'https://i.postimg.cc/rsMyPTGL/IMG-20260826-WA8942.jpg',
    descripcion: 'Paz interior'
  }
];

// Opciones de filtro por tipo
export const TIPOS_PRODUCTO = [
  { id: 'todos', etiqueta: 'Todos' },
  { id: 'remera', etiqueta: 'Remeras' },
  { id: 'buzo', etiqueta: 'Buzos' }
];

// Opciones de filtro por precio
export const RANGOS_PRECIO = [
  { id: 'todos', etiqueta: 'Todos los precios', min: 0, max: Infinity },
  { id: 'menos30', etiqueta: 'Hasta $30.000', min: 0, max: 30000 },
  { id: '30a50', etiqueta: '$30.000 - $50.000', min: 30000, max: 50000 },
  { id: 'mas50', etiqueta: 'Más de $50.000', min: 50000, max: Infinity }
];
