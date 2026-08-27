/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fondo: '#F7F3ED',
        blanco: '#FFFBF7',
        primario: '#7D9477',
        'primario-claro': '#B8C9B5',
        'primario-oscuro': '#5A6E55',
        secundario: '#B8A08C',
        acento: '#D4A574',
        texto: '#423E37',
        'texto-suave': '#8A857D',
        borde: '#E4DFD5',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'suave': '0 4px 20px rgba(66, 62, 55, 0.05)',
        'media': '0 8px 30px rgba(66, 62, 55, 0.08)',
      }
    },
  },
  plugins: [],
}
