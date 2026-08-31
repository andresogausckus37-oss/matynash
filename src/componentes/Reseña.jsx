// ==========================================
// COMPONENTE RESEÑA — Reutilizable
// Modo "compacto" → para tarjetas del inicio
// Modo "completo" → para página de detalle
// ==========================================

import { User } from "lucide-react";

// 📌 Componente para mostrar estrellas
function Estrellas({ puntuacion, tamaño = "base" }) {
  const estrellasLlenas = Math.round(puntuacion);
  const tamañoEstrella = tamaño === "grande" ? "text-2xl" : "text-lg";
  
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((estrella) => (
        <span
          key={estrella}
          className={`${tamañoEstrella} ${
            estrella <= estrellasLlenas ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// 📌 Componente para mostrar promedio + cantidad (arriba en detalle y card)
export function ResumenResenas({ resenas }) {
  if (!resenas || resenas.length === 0) return null;

  const cantidad = resenas.length;
  const promedio = resenas.reduce((sum, r) => sum + r.puntuacion, 0) / cantidad;
  const promedioRedondeado = Math.round(promedio * 10) / 10;

  return (
    <div className="flex items-center gap-2 mb-3">
      <Estrellas puntuacion={promedioRedondeado} />
      <span className="text-sm font-medium text-texto">
        {promedioRedondeado} ({cantidad} {cantidad === 1 ? "reseña" : "reseñas"})
      </span>
    </div>
  );
}

// 📌 Componente principal — Modo compacto o completo
export default function Reseña({ resena, modo = "completo" }) {
  const tieneFoto = resena.foto && resena.foto.trim() !== "";

  // 📐 Modo COMPACTO → para la card del Inicio
  if (modo === "compacto") {
    return (
      <div className="flex items-center gap-2 text-sm text-texto-suave">
        <Estrellas puntuacion={resena.puntuacion} tamaño="pequeño" />
        <span className="text-xs">— {resena.nombre}</span>
      </div>
    );
  }

  // 📐 Modo COMPLETO → para página de detalle
  return (
    <div className="bg-white rounded-md border border-borde p-4 sm:p-5 shadow-suave">
      {/* Foto + Nombre + Fecha + Estrellas */}
      <div className="flex items-start gap-3 mb-3">
        {/* Foto de perfil o ícono por defecto */}
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-primario-claro/30 flex items-center justify-center">
          {tieneFoto ? (
            <img
              src={resena.foto}
              alt={resena.nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={18} className="text-primario" />
          )}
        </div>

        {/* Datos */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <h4 className="font-medium text-texto text-sm">{resena.nombre}</h4>
            <span className="text-xs text-texto-suave">{resena.fecha}</span>
          </div>
          <Estrellas puntuacion={resena.puntuacion} />
        </div>
      </div>

      {/* Comentario */}
      <p className="text-sm text-texto-suave leading-relaxed">
        "{resena.comentario}"
      </p>
    </div>
  );
}
