import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function TarjetaServicio({ servicio }) {
  return (
    <article className="bg-white border border-borde rounded-md overflow-hidden shadow-suave transition-all duration-300 hover:shadow-media hover:-translate-y-1 relative">

      {/* Imagen — Link al detalle */}
      <Link
        to={`/servicio/${servicio.id}`}
        className="block overflow-hidden"
      >
        <div className="h-56 sm:h-64 md:h-72">
          <img
            src={servicio.imagenes[0]}
            alt={servicio.titulo}
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-500
              hover:scale-105
            "
          />
        </div>
      </Link>

      {/* Contenido */}
      <div className="p-5 sm:p-6">

        {/* SKU */}
        <p className="text-xs text-texto-suave font-mono mb-2">
          SKU: {servicio.sku}
        </p>

        {/* Título — Link al detalle */}
        <Link to={`/servicio/${servicio.id}`}>
          <h3 className="
            text-lg
            sm:text-xl
            text-texto
            leading-snug
            mb-3
            hover:text-primario
            transition-colors
          ">
            {servicio.titulo}
          </h3>
        </Link>

        {/* Descripción */}
        <p className="
          text-sm
          leading-relaxed
          text-texto-suave
          line-clamp-3
          mb-6
        ">
          {servicio.descripcion}
        </p>

        {/* ✅ SOLO BOTÓN — Más información */}
        <Link
          to={`/servicio/${servicio.id}`}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-1.5
            bg-[#C5EEA8]
                hover:bg-[#A8E080]
            text-white
            py-3
            px-2
            rounded-md
            text-sm
            font-medium
            transition-all
            duration-200
          "
        >
          Más información
          <ChevronRight size={16} strokeWidth={1.8} />
        </Link>

      </div>

    </article>
  );
}
