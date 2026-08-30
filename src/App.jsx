import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Inicio from "./paginas/Inicio";
import DetalleServicio from "./paginas/DetalleServicio";
import Checkout from "./paginas/Checkout";
import { CarritoProvider } from "./context/CarritoContext";
import { guardarReferencia } from "./utilidades/referencias";
import ScrollGlobal from "./componentes/ScrollGlobal";
import ReferenciaGlobal from "./componentes/ReferenciaGlobal";

function DetectorReferencia() {
  const location = useLocation();

  useEffect(() => {
    const ruta = location.pathname;
    if (ruta === "/andres" || ruta.startsWith("/andres/")) {
      guardarReferencia("andres");
    } else if (ruta === "/") {
      guardarReferencia("maty");
    }
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <CarritoProvider>
      <Router>
        <ScrollGlobal />
        <DetectorReferencia />
        <ReferenciaGlobal />
        <Navbar />
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/andres" element={<Inicio />} />
            
            <Route path="/servicio/:id" element={<DetalleServicio />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </Router>
    </CarritoProvider>
  );
}
