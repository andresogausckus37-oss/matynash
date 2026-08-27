import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { CONFIG } from '../datos/servicios';
import { ChevronLeft, Trash2, CreditCard, Banknote, Building2, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const { carrito, eliminarDelCarrito, cambiarCantidad, vaciarCarrito, subtotal, total } = useCarrito();
  const navigate = useNavigate();
  const [metodoPago, setMetodoPago] = useState('');
  const [pasoConfirmacion, setPasoConfirmacion] = useState(false);
  const [datosEnvio, setDatosEnvio] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    localidad: '',
    provincia: '',
    telefono: '',
    email: ''
  });

  // Si carrito vacío → mensaje
  if (carrito.length === 0 && !pasoConfirmacion) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-8">Agregá productos para continuar con la compra</p>
        <Link to="/tienda" className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition">
          Ir a la Tienda
        </Link>
      </div>
    );
  }

  // Confirmación final
  if (pasoConfirmacion) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold mb-4">¡Compra confirmada! 🎉</h2>
        <p className="text-gray-600 mb-2">Te enviamos los detalles a tu correo</p>
        <p className="text-sm text-gray-500 mb-8">Gracias por tu compra ✨</p>
        <button 
          onClick={() => { vaciarCarrito(); navigate('/'); }}
          className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!metodoPago) return alert('Seleccioná un método de pago');
    setPasoConfirmacion(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Volver */}
      <Link to="/tienda" className="flex items-center gap-1 text-emerald-700 mb-6">
        <ChevronLeft size={18} /> Volver a la tienda
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-center">Finalizar compra</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* 📦 Resumen del carrito */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Tu pedido</h2>
            
            {carrito.map(item => (
              <div key={item.id} className="flex gap-4 py-4 border-b dark:border-gray-800 last:border-0">
                <img src={item.imagenes[0]} alt={item.titulo} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.titulo}</h3>
                  <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                  <p className="font-bold text-emerald-700">${item.precioARS.toLocaleString()} ARS</p>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                      className="w-8 h-8 rounded-full bg-stone-100 dark:bg-gray-800 flex items-center justify-center hover:bg-stone-200 dark:hover:bg-gray-700"
                    >−</button>
                    <span className="font-medium">{item.cantidad}</span>
                    <button 
                      onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                      className="w-8 h-8 rounded-full bg-stone-100 dark:bg-gray-800 flex items-center justify-center hover:bg-stone-200 dark:hover:bg-gray-700"
                    >+</button>
                    <button 
                      onClick={() => eliminarDelCarrito(item.id)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 📍 Datos de envío */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Datos de envío</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text" placeholder="Nombre *" required
                value={datosEnvio.nombre}
                onChange={(e) => setDatosEnvio({...datosEnvio, nombre: e.target.value})}
                className="px-4 py-3 rounded-xl border dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text" placeholder="Apellido *" required
                value={datosEnvio.apellido}
                onChange={(e) => setDatosEnvio({...datosEnvio, apellido: e.target.value})}
                className="px-4 py-3 rounded-xl border dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text" placeholder="Dirección *" required
                className="sm:col-span-2 px-4 py-3 rounded-xl border dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={datosEnvio.direccion}
                onChange={(e) => setDatosEnvio({...datosEnvio, direccion: e.target.value})}
              />
              <input
                type="text" placeholder="Localidad *" required
                value={datosEnvio.localidad}
                onChange={(e) => setDatosEnvio({...datosEnvio, localidad: e.target.value})}
                className="px-4 py-3 rounded-xl border dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text" placeholder="Provincia *" required
                value={datosEnvio.provincia}
                onChange={(e) => setDatosEnvio({...datosEnvio, provincia: e.target.value})}
                className="px-4 py-3 rounded-xl border dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="tel" placeholder="Teléfono *" required
                value={datosEnvio.telefono}
                onChange={(e) => setDatosEnvio({...datosEnvio, telefono: e.target.value})}
                className="px-4 py-3 rounded-xl border dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="email" placeholder="Email *" required
                className="sm:col-span-2 px-4 py-3 rounded-xl border dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={datosEnvio.email}
                onChange={(e) => setDatosEnvio({...datosEnvio, email: e.target.value})}
              />
            </div>
          </div>

          {/* 💳 Métodos de pago */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Método de pago</h2>
            <div className="space-y-3">
              <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${metodoPago === 'mercado-pago' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' : 'dark:border-gray-700'}`}>
                <input type="radio" name="pago" value="mercado-pago" checked={metodoPago === 'mercado-pago'} onChange={() => setMetodoPago('mercado-pago')} className="accent-emerald-600" />
                <CreditCard size={22} className="text-blue-600" />
                <div>
                  <p className="font-medium">Mercado Pago</p>
                  <p className="text-sm text-gray-500">Hasta 3 cuotas sin interés 💳</p>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${metodoPago === 'efectivo' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' : 'dark:border-gray-700'}`}>
                <input type="radio" name="pago" value="efectivo" checked={metodoPago === 'efectivo'} onChange={() => setMetodoPago('efectivo')} className="accent-emerald-600" />
                <Banknote size={22} className="text-green-600" />
                <div>
                  <p className="font-medium">Efectivo / Pago Fácil</p>
                  <p className="text-sm text-gray-500">Generá código de pago 💵</p>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${metodoPago === 'transferencia' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' : 'dark:border-gray-700'}`}>
                <input type="radio" name="pago" value="transferencia" checked={metodoPago === 'transferencia'} onChange={() => setMetodoPago('transferencia')} className="accent-emerald-600" />
                <Building2 size={22} className="text-purple-600" />
                <div>
                  <p className="font-medium">Transferencia bancaria</p>
                  <p className="text-sm text-gray-500">CBU: 0000000000000000000000000000</p>
                </div>
              </label>
            </div>

            <button 
              type="submit"
              className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl text-lg transition"
            >
              Confirmar compra — ${total.toLocaleString()} ARS
            </button>
          </form>
        </div>

        {/* 📋 Resumen final */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 h-fit sticky top-24">
          <h2 className="text-xl font-semibold mb-4">Resumen</h2>
          <div className="space-y-3 text-lg">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()} ARS</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>${CONFIG.envioNacional.toLocaleString()} ARS</span>
            </div>
            <hr className="dark:border-gray-700" />
            <div className="flex justify-between text-xl font-bold text-emerald-700 pt-2">
              <span>Total</span>
              <span>${total.toLocaleString()} ARS</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">Envío a todo el país 🇦🇷</p>
        </div>
      </div>
    </div>
  );
}
