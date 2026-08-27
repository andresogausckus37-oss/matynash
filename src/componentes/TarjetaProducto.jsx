import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { ShoppingCart, Car } from "lucide-react";

export default function TarjetaProducto({ producto }) {
  const { agregarAlCarrito, carrito } = useCarrito();

  const enCarrito = carrito.find(
    (item) => item.id === producto.id
  );

  // ✅ Calcular valor exacto de cada cuota
  const valorCuota = producto.precioARS / producto.cuotasSinInteres;

  return (
    <article className="
      bg-white
      rounded-2xl
      overflow-hidden
      border border-borde
      shadow-suave
      hover:shadow-media
      transition-all
      duration-300
      hover:-translate-y-1
    ">

      {/* ✅ IMAGEN — Link al detalle */}
      <Link to={`/producto/${producto.id}`} className="block relative h-52 sm:h-64 overflow-hidden">
        <img
          src={producto.imagenes[0]}
          alt={producto.titulo}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          "
        />
        {/* ❌ CONTADOR ELIMINADO */}
      </Link>

      {/* INFORMACIÓN */}
      <div className="p-4 sm:p-5">

        {/* SKU */}
        <p className="
          text-[11px]
          text-texto-suave
          font-mono
          mb-2
        ">
          SKU: {producto.sku}
        </p>

        {/* ✅ TÍTULO — Link al detalle */}
        <Link to={`/producto/${producto.id}`}>
          <h3 className="
            text-base
            sm:text-lg
            text-texto
            leading-snug
            mb-3
            hover:text-primario
            transition-colors
          ">
            {producto.titulo}
          </h3>
        </Link>

        {/* PRECIO + ✅ CUOTAS CALCULADAS DINÁMICAMENTE + ÍCONO */}
        <div className="mb-4">
          <span className="
            text-lg
            sm:text-xl
            text-boton
          ">
            ${producto.precioARS.toLocaleString("es-AR")}
          </span>

          <p className="
            text-xs
            sm:text-sm
            text-lila
            mt-1.5
            flex items-center
            gap-1.5
          ">
            <Car size={14} strokeWidth={1.8} />
            {producto.cuotasSinInteres} cuotas sin interés de ${valorCuota.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* ✅ DOS BOTONES EN FILA — Sin contador, sin +/- */}
        <div className="flex gap-2">
          {/* Botón Agregar al carrito — Celeste oscuro + texto blanco */}
          <button
            onClick={() => agregarAlCarrito(producto)}
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              bg-[#0E7490]
              hover:bg-[#0F766E]
              text-white
              py-3
              rounded-xl
              text-sm
              font-medium
              transition-all
              duration-200
              shadow-suave
            "
          >
            <ShoppingCart size={18} strokeWidth={1.8} />
            <span>Agregar al carrito</span>
          </button>

          {/* Botón Ver detalles — Salvia suave */}
          <Link
            to={`/producto/${producto.id}`}
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              bg-primario-claro/40
              hover:bg-primario-claro/60
              text-texto
              py-3
              rounded-xl
              text-sm
              font-medium
              transition-all
              duration-200
              border border-primario-claro/50
            "
          >
            <span>Ver detalles</span>
          </Link>
        </div>

      </div>
    </article>
  );
}
