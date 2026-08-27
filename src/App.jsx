import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar'; // ✅ Nombre correcto
import Inicio from './paginas/Inicio';
import Tienda from './paginas/Tienda';
import ListaServicios from './paginas/ListaServicios';
import DetalleServicio from './paginas/DetalleServicio';
import DetalleProducto from './paginas/DetalleProducto';
import Checkout from './paginas/Checkout';
import { CarritoProvider } from './context/CarritoContext';

export default function App() {
  return (
    <CarritoProvider>
      <Router>
        <Navbar /> {/* ✅ Componente con nombre correcto */}
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/servicios" element={<ListaServicios />} />
            <Route path="/servicio/:id" element={<DetalleServicio />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </Router>
    </CarritoProvider>
  );
}
