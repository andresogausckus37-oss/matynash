import { Link } from "react-router-dom";
import PerfilTerapeuta from "../componentes/PerfilTerapeuta";
import TarjetaServicio from "../componentes/TarjetaServicio";
import { SERVICIOS } from "../datos/servicios";
import { PRODUCTOS } from "../datos/productos";
import TarjetaProducto from "../componentes/TarjetaProducto";
import { MessageCircle } from "lucide-react";

export default function Inicio() {
  const serviciosDestacados = SERVICIOS.slice(0, 2);
  const productosDestacados = PRODUCTOS.slice(0, 2);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">

      {/* PERFIL DEL TERAPEUTA */}
      <section className="mt-3 mb-16">
        <PerfilTerapeuta />
      </section>

      {/* SERVICIOS DESTACADOS */}
      <section className="py-4">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">

          <div>
            <h2 className="text-2xl md:text-3xl text-texto mb-2">
  Mis servicios
</h2>


          </div>

          <Link
            to="/servicios"
            className="
              hidden md:inline-flex
              items-center justify-center
              px-5 py-2.5
              rounded-xl
              bg-boton
              text-white
              text-sm
              hover:bg-boton-hover
              transition-colors
            "
          >
            Ver todos los servicios
          </Link>

        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {serviciosDestacados.map((servicio) => (
            <TarjetaServicio
              key={servicio.id}
              servicio={servicio}
            />
          ))}
        </div>

        <Link
          to="/servicios"
          className="
            md:hidden
            mt-8
            w-full
            flex items-center justify-center
            py-3.5
            rounded-xl
            bg-boton
            text-white
            text-sm
            hover:bg-boton-hover
            transition-colors
          "
        >
          Ver todos los servicios
        </Link>

      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="py-14 mt-10 border-t border-borde">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">

          <div>
            <h2 className="text-2xl md:text-3xl text-texto mb-2">
              Productos destacados
            </h2>

            <p className="text-texto-suave text-sm md:text-base max-w-xl leading-relaxed">
              Diseños inspirados en la energía, la espiritualidad
              y el bienestar para acompañarte todos los días.
            </p>
          </div>

          <Link
            to="/tienda"
            className="
              hidden md:inline-flex
              items-center justify-center
              px-5 py-2.5
              rounded-xl
              bg-boton
              text-white
              text-sm
              hover:bg-boton-hover
              transition-colors
            "
          >
            Ver todos los productos
          </Link>

        </div>

        <div className="grid md:grid-cols-1 gap-8">
          {productosDestacados.map((producto) => (
            <TarjetaProducto
              key={producto.id}
              producto={producto}
            />
          ))}
        </div>

        <Link
          to="/tienda"
          className="
            md:hidden
            mt-8
            w-full
            flex items-center justify-center
            py-3.5
            rounded-xl
            bg-boton
            text-white
            text-sm
            hover:bg-boton-hover
            transition-colors
          "
        >
          Ver todos los productos
        </Link>

      </section>

    </main>
  );
}