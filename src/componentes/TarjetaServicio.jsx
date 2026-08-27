import { Link } from "react-router-dom";
import { CONFIG } from "../datos/servicios";
import { ChevronRight, CreditCard, ShoppingCart } from "lucide-react";

export default function TarjetaServicio({ servicio }) {
  const { terapeuta } = CONFIG;

  return (
    <article className="bg-white border border-borde rounded-md overflow-hidden shadow-suave transition-all duration-300 hover:shadow-media hover:-translate-y-1">

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
          mb-5
        ">
          {servicio.descripcion}
        </p>

        {/* PRECIO */}
        <div className="flex flex-wrap items-baseline gap-3 mb-2">
          <span className="text-xl sm:text-2xl text-primario font-semibold">
            ${servicio.precioARS.toLocaleString("es-AR")}
          </span>

          <span className="text-sm text-texto-suave">
            $ {servicio.precioUSD} USD PayPal
          </span>
        </div>

        {/* ✅ CUOTAS — DINÁMICO + ÍCONO TARJETA */}
        <p className="
  flex
  items-center
  gap-1.5
  text-sm
  text-[#009EE3]
  font-medium
  mb-5
">
  <CreditCard size={16} className="text-[#009EE3]" />
  Hasta 12 cuotas sin interés con Mercado Pago
</p>


        {/* ACCIONES — 2 botones en fila */}
        <div className="grid grid-cols-2 gap-3">

          {/* ✅ AGREGAR AL CARRITO — Sin WhatsApp, ícono carrito */}
          <Link
            to="/tienda"
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-[#C5EEA8]
              hover:bg-[#A8E080]
              text-texto
              py-3
              px-2
              rounded-md
              text-sm
              font-medium
              transition-all
              duration-200
            "
          >
            <ShoppingCart size={18} strokeWidth={1.8} />
            Agregar al carrito
          </Link>


          {/* Ver más */}
          <Link
            to={`/servicio/${servicio.id}`}
            className="
              flex
              items-center
              justify-center
              gap-1.5
              bg-blanco
              hover:bg-primario-claro/30
              text-primario
              py-3
              px-2
              rounded-md
              text-sm
              font-medium
              border
              border-borde
              transition-all
              duration-200
            "
          >
            <span>Ver más</span>
            <ChevronRight size={16} strokeWidth={1.8} />
          </Link>

        </div>

      </div>
    </article>
  );
}
