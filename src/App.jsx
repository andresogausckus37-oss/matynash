import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Inicio from './paginas/Inicio';
import ListaServicios from './paginas/ListaServicios';
import DetalleServicio from './paginas/DetalleServicio';
import Checkout from './paginas/Checkout';
import { CarritoProvider } from './context/CarritoContext';

export default function App() {
  return (
    <CarritoProvider>
      <Router>
        <Navbar />
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/servicios" element={<ListaServicios />} />
            <Route path="/servicio/:id" element={<DetalleServicio />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </Router>
    </CarritoProvider>
  );
}
