import { PRODUCTOS } from '../datos/productos';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCarrito } from '../context/CarritoContext';

export default function ProductosRelacionados({ 
  productoId, 
  productoRelacionadoId, 
  productosRelacionadosIds = [], 
  titulo = "Complementa tu experiencia" 
}) {
  // ✅ Obtener productos relacionados desde el nuevo campo
  let relacionados = [];

  // 1. Si viene el array de relacionados → usarlo
  if (productosRelacionadosIds.length > 0) {
    relacionados = productosRelacionadosIds
      .map(id => PRODUCTOS.find(p => p.id === id))
      .filter(Boolean);
  }

  // 2. Si NO hay array pero viene el producto relacionado individual → usarlo
  if (relacionados.length === 0 && productoRelacionadoId) {
    const encontrado = PRODUCTOS.find(p => p.id === productoRelacionadoId);
    if (encontrado) relacionados = [encontrado];
  }

  // 3. Excluir el producto actual para que no se repita
  if (productoId) {
    relacionados = relacionados.filter(p => p.id !== productoId);
  }

  // 4. Si no hay ninguno → no mostrar nada
  if (relacionados.length === 0) return null;

  const { agregarAlCarrito } = useCarrito();

  return (
    <section className="mt-16 pt-12 border-t border-borde">
      <h2 className="text-2xl font-bold text-center text-texto mb-8">{titulo}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {relacionados.map(producto => {
          // 💰 Lógica de descuento automática
          const tieneDescuento = producto.descuento && producto.descuento > 0;
          const precioOriginal = producto.precioARS;
          const precioFinal = tieneDescuento 
            ? Math.round(precioOriginal * (1 - producto.descuento / 100)) 
            : precioOriginal;

          return (
            <div key={producto.id} className="tarjeta group">
              {/* Imagen → link a detalle */}
              <Link 
                to={`/producto/${producto.id}`} 
                className="block relative overflow-hidden"
              >
                <img 
                  src={producto.imagenes[0]} 
                  alt={producto.titulo} 
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                />
                {/* Etiqueta de descuento */}
                {tieneDescuento && (
                  <span className="absolute top-3 left-3 bg-rosa text-texto px-2 py-1 rounded-lg text-sm font-bold">
                    -{producto.descuento}%
                  </span>
                )}
              </Link>

              <div className="p-4">
                {/* Título → link a detalle */}
                <Link 
                  to={`/producto/${producto.id}`}
                  className="font-semibold text-texto hover:text-boton transition-colors block mb-2"
                >
                  {producto.titulo}
                </Link>

                {/* Precio con descuento si aplica */}
                <div className="mb-3">
                  {tieneDescuento ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-bold text-boton">${precioFinal.toLocaleString()} ARS</span>
                      <span className="text-sm text-texto-suave line-through">${precioOriginal.toLocaleString()}</span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-boton">${precioOriginal.toLocaleString()} ARS</span>
                  )}
                </div>

                {/* Botón agregar al carrito */}
                <button
                  onClick={() => agregarAlCarrito(producto)}
                  className="w-full flex items-center justify-center gap-2 bg-boton hover:bg-boton-hover text-white py-2 rounded-xl transition-all text-sm"
                >
                  <ShoppingCart size={16} /> Agregar al carrito
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
