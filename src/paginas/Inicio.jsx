import { Link } from "react-router-dom";
import PerfilTerapeuta from "../componentes/PerfilTerapeuta";
import TarjetaServicio from "../componentes/TarjetaServicio";
import { SERVICIOS } from "../datos/servicios";

export default function Inicio() {
  const servicioDestacado = SERVICIOS[0];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">

      {/* PERFIL DEL TERAPEUTA */}
      <section className="mt-3 mb-16">
        <PerfilTerapeuta />
      </section>

      {/* SERVICIO DESTACADO */}
      <section className="py-4">

        {/* ENCABEZADO */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl text-texto mb-2">
            Mis servicios
          </h2>

          
        </div>

        {/* SERVICIO */}
        {servicioDestacado && (
          <div className="max-w-2xl">
            <TarjetaServicio servicio={servicioDestacado} />
          </div>
        )}

        {/* VER TODOS */}
        <div className="mt-7">
          <Link
            to="/servicios"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-primario
              hover:text-primario-oscuro
              transition-colors
              group
            "
          >
            <span>Ver todos los servicios</span>

            <span
              className="
                text-lg
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>

      </section>

    </main>
  );
}