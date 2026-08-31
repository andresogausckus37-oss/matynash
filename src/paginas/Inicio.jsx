import PerfilTerapeuta from "../componentes/PerfilTerapeuta";
import WebinarHome from "../componentes/WebinarHome";
import TarjetaServicio from "../componentes/TarjetaServicio";
import { SERVICIOS } from "../datos/servicios";

export default function Inicio() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">

      {/* PERFIL DEL TERAPEUTA */}
      <section className="mt-3 mb-16">
        <PerfilTerapeuta />
      </section>

      {/* WEBINAR */}
      <section className="mb-16 sm:mb-20">
        <WebinarHome />
      </section>

      {/* ✅ EXPERIENCIAS — Acá va el id para el scroll */}
      <section id="servicios" className="py-4">

        {/* ENCABEZADO */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl text-texto mb-2">
            Experiencias con Maty Nash
          </h2>
        </div>

        {/* SERVICIOS */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            md:gap-8
          "
        >
          {SERVICIOS.map((servicio) => (
            <TarjetaServicio
              key={servicio.id}
              servicio={servicio}
            />
          ))}
        </div>

      </section>

    </main>
  );
}
