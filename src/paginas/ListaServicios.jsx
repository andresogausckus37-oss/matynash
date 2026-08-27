import { SERVICIOS } from '../datos/servicios';
import TarjetaServicio from '../componentes/TarjetaServicio';
import ProductosRelacionados from '../componentes/ProductosRelacionados';

export default function ListaServicios() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="titulo-seccion text-3xl mb-2">Mis Servicios</h1>
      <p className="text-center text-texto-suave mb-10 max-w-2xl mx-auto">
        Espacios de acompañamiento y bienestar, pensados para vos
      </p>

      {/* Grilla de servicios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {SERVICIOS.map(servicio => (
          <TarjetaServicio key={servicio.id} servicio={servicio} />
        ))}
      </div>

      {/* 👇 Productos relacionados al final de la lista */}
      <ProductosRelacionados titulo="Complementa tu experiencia con estos productos" />
    </div>
  );
}
