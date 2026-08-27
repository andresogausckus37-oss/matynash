import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTOS } from "../datos/productos";
import { SERVICIOS } from "../datos/servicios";
import { useCarrito } from "../context/CarritoContext";
import {
  ChevronLeft,
  ShoppingCart,
  CheckCircle2,
  CreditCard,
  Minus,
  Plus,
  Truck,
  Loader2,
} from "lucide-react";
import TarjetaServicio from "../componentes/TarjetaServicio";

export default function DetalleProducto() {
  const { id } = useParams();

  const producto = PRODUCTOS.find(
    (p) => p.id === Number(id) || p.id === id
  );

  const { agregarAlCarrito } = useCarrito();

  const [agregado, setAgregado] = useState(false);
  const [imagenActiva, setImagenActiva] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [talleSeleccionado, setTalleSeleccionado] = useState("");
  const [colorSeleccionado, setColorSeleccionado] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [envioCalculado, setEnvioCalculado] = useState(false);
  const [cargandoEnvio, setCargandoEnvio] = useState(false);

  if (!producto) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl text-texto mb-4">
          Producto no encontrado
        </h2>
        <Link
          to="/tienda"
          className="text-sky-600 hover:text-sky-700 text-sm"
        >
          ← Volver a la Tienda
        </Link>
      </div>
    );
  }

  /* Descuento */
  const tieneDescuento =
    producto.descuento && producto.descuento > 0;
  const precioOriginal = producto.precioARS;
  const precioFinal = tieneDescuento
    ? Math.round(precioOriginal * (1 - producto.descuento / 100))
    : precioOriginal;

  /* Cuotas dinámicas */
  const cantidadCuotas = producto.cuotasSinInteres || 3;
  const montoCuota = Math.round(precioFinal / cantidadCuotas);

  /* Variantes */
  const talles = producto.talles || ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
  const colores = producto.colores || ["Blanco"];

  /* Servicio relacionado */
  const servicioRelacionado = producto.servicioRelacionadoId
    ? SERVICIOS.find((s) => s.id === producto.servicioRelacionadoId)
    : null;

  /* Agregar al carrito */
  const handleAgregar = () => {
    const productoCarrito = {
      ...producto,
      cantidad,
      talle: talleSeleccionado,
      color: colorSeleccionado,
      precioFinal,
    };
    agregarAlCarrito(productoCarrito);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  const aumentarCantidad = () => setCantidad((c) => c + 1);
  const disminuirCantidad = () => setCantidad((c) => (c > 1 ? c - 1 : 1));

  /* ✅ Calcular envío con EFECTO DE CARGA de 2 segundos */
  const calcularEnvio = () => {
    if (!codigoPostal) return;
    setCargandoEnvio(true);
    setEnvioCalculado(false);
    setTimeout(() => {
      setCargandoEnvio(false);
      setEnvioCalculado(true);
    }, 2000);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Volver */}
      <Link
        to="/tienda"
        className="inline-flex items-center gap-1.5 text-sky-600 hover:text-sky-700 text-sm mb-7 transition-colors"
      >
        <ChevronLeft size={17} />
        Volver a la Tienda
      </Link>

      {/* CONTENEDOR ÚNICO */}
      <section className="bg-white border border-borde rounded-md shadow-suave overflow-hidden mb-14">
        <div className="grid md:grid-cols-2">

          {/* ========== GALERÍA — IMAGEN MÁS ALTA Y ANCHO COMPLETO ========== */}
          <div className="p-0">
            {/* ✅ Imagen principal — MÁS ALTA, SIN PADDING, ANCHO COMPLETO */}
            <div className="h-[580px] md:h-[600px] w-full bg-fondo rounded-none">
              <img
                src={producto.imagenes[imagenActiva]}
                alt={producto.titulo}
                className="w-full h-full object-contain object-center transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Miniaturas */}
            {producto.imagenes.length > 1 && (
              <div className="flex gap-3 overflow-x-auto p-4 pt-4 bg-fondo/50">
                {producto.imagenes.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImagenActiva(idx)}
                    className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 transition-all ${
                      imagenActiva === idx
                        ? "ring-2 ring-sky-500"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ========== INFORMACIÓN ========== */}
          <div className="p-6 sm:p-8">
            {/* SKU */}
            <p className="text-xs text-texto-suave font-mono mb-2">
              SKU: {producto.sku}
            </p>

            {/* Título */}
            <h1 className="text-2xl sm:text-3xl text-texto leading-snug mb-4">
              {producto.titulo}
            </h1>

            {/* ✅ PRECIO + CUOTAS + BADGE DE DESCUENTO */}
            <div className="mb-6 pb-6 border-b border-borde">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-2xl sm:text-3xl text-sky-700 font-semibold">
                  ${precioFinal.toLocaleString("es-AR")}
                </span>

                {/* ✅ BADGE DE DESCUENTO — LLAMATIVO Y FUERA DE PALETA */}
                {tieneDescuento && (
                  <>
                    <span className="text-sm text-texto-suave line-through">
                      ${precioOriginal.toLocaleString("es-AR")}
                    </span>
                    <span className="
                      bg-gradient-to-r from-rose-500 to-red-600
                      text-white
                      px-3
                      py-1
                      rounded-md
                      text-sm
                      font-bold
                      tracking-wider
                      shadow-md
                    ">
                      {producto.descuento}% OFF
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-texto-suave">
                <CreditCard size={17} className="text-sky-600" />
                <span>
                  {cantidadCuotas} cuotas sin interés de ${montoCuota.toLocaleString("es-AR")}
                </span>
              </div>
            </div>

            {/* ✅ TÍTULO "Descripción" ARRIBA DEL TEXTO */}
            <h3 className="text-lg font-semibold text-texto mb-3">Descripción</h3>
            <p className="text-sm sm:text-base text-texto-suave leading-relaxed mb-8">
              {producto.descripcion}
            </p>

            {/* TALLE */}
            <div className="mb-6">
              <p className="text-sm text-texto mb-3 font-medium">Talle</p>
              <div className="flex flex-wrap gap-2">
                {talles.map((talle) => (
                  <button
                    key={talle}
                    onClick={() => setTalleSeleccionado(talle)}
                    className={`min-w-[48px] px-4 py-2.5 rounded-md text-sm border transition-all ${
                      talleSeleccionado === talle
                        ? "bg-sky-600 text-white border-sky-600"
                        : "bg-white text-texto border-borde hover:border-sky-500"
                    }`}
                  >
                    {talle}
                  </button>
                ))}
              </div>
            </div>

            {/* COLOR */}
            <div className="mb-6">
              <p className="text-sm text-texto mb-3 font-medium">Color</p>
              <div className="flex flex-wrap gap-2">
                {colores.map((color) => (
                  <button
                    key={color}
                    onClick={() => setColorSeleccionado(color)}
                    className={`px-4 py-2.5 rounded-md text-sm border transition-all ${
                      colorSeleccionado === color
                        ? "bg-sky-100 border-sky-500 text-sky-800"
                        : "bg-white border-borde text-texto hover:border-sky-500"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* ENVÍO — CON EFECTO DE CARGA */}
            <div className="mb-6 py-4 border-y border-borde">
              <div className="flex items-center gap-2 mb-3">
                <Truck size={19} className="text-sky-600" />
                <span className="text-sm text-texto font-medium">Calculá el costo de envío</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  inputMode="numeric"
                  value={codigoPostal}
                  onChange={(e) => setCodigoPostal(e.target.value)}
                  placeholder="Código postal"
                  className="flex-1 min-w-0 px-4 py-3 rounded-md border border-borde bg-white text-sm outline-none focus:border-sky-500 transition-colors"
                />
                <button
                  onClick={calcularEnvio}
                  disabled={cargandoEnvio}
                  className="px-5 py-3 rounded-md bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white text-sm transition-colors flex items-center gap-2"
                >
                  {cargandoEnvio ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Calculando...
                    </>
                  ) : (
                    "Calcular"
                  )}
                </button>
              </div>

              {/* ✅ Resultado del envío */}
              {envioCalculado && (
                <div className="mt-4 pt-4 border-t border-borde">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-texto">Envío prioritario a domicilio</span>
                    <span className="text-sm text-sky-700 font-medium">$8.000</span>
                  </div>
                  <p className="text-xs text-texto-suave leading-relaxed">
                    Servicio prioritario para la entrega de los productos. Se entrega en el domicilio bajo firma del comprador.
                  </p>
                  <p className="text-xs text-texto-suave mt-2">
                    Recibirás tu producto en 3 - 7 días.
                  </p>
                </div>
              )}
            </div>

            {/* CANTIDAD */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-texto font-medium">Cantidad</span>
              <div className="flex items-center border border-borde rounded-md overflow-hidden">
                <button
                  onClick={disminuirCantidad}
                  className="p-3 hover:bg-sky-50 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center text-sm">{cantidad}</span>
                <button
                  onClick={aumentarCantidad}
                  className="p-3 hover:bg-sky-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* ✅ BOTÓN AGREGAR — AZUL TIENDA */}
            <button
              onClick={handleAgregar}
              disabled={agregado}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-md text-sm font-medium transition-all shadow-suave ${
                agregado
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  : "bg-sky-600 hover:bg-sky-700 text-white"
              }`}
            >
              {agregado ? (
                <>
                  <CheckCircle2 size={20} />
                  ¡Agregado al carrito!
                </>
              ) : (
                <>
                  <ShoppingCart size={20} />
                  Agregar al carrito
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* SERVICIO RELACIONADO — MANTIENE PALETA SALVIA */}
      {servicioRelacionado && (
        <section className="pt-10 border-t border-borde">
          <h2 className="text-xl sm:text-2xl text-center text-texto mb-8">
            También podés reservar una sesión
          </h2>
          <div className="max-w-md mx-auto">
            <TarjetaServicio servicio={servicioRelacionado} />
          </div>
        </section>
      )}
    </main>
  );
}
