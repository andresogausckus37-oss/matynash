import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./componentes/Navbar";
import Inicio from "./paginas/Inicio";
import ListaServicios from "./paginas/ListaServicios";
import DetalleServicio from "./paginas/DetalleServicio";
import Checkout from "./paginas/Checkout";
import { CarritoProvider } from "./context/CarritoContext";

import { guardarReferencia } from "./utilidades/referencias";

// ==========================================
// DETECTOR DE REFERENCIA
// ==========================================

function DetectorReferencia() {
  const location = useLocation();

  useEffect(() => {
    const ruta = location.pathname;

    // ======================================
    // ANDRÉS
    // /andres
    // ======================================

    if (
      ruta === "/andres" ||
      ruta.startsWith("/andres/")
    ) {
      guardarReferencia("andres");
      return;
    }

    // ======================================
    // MATY
    // /
    // ======================================

    if (ruta === "/") {
      guardarReferencia("maty");
    }
  }, [location.pathname]);

  return null;
}

// ==========================================
// APP
// ==========================================

export default function App() {
  return (
    <CarritoProvider>
      <Router>

        {/* Detecta y guarda el referente */}
        <DetectorReferencia />

        <Navbar />

        <main className="pb-20">
          <Routes>

            <Route
              path="/"
              element={<Inicio />}
            />

            <Route
              path="/andres"
              element={<Inicio />}
            />

            <Route
              path="/servicios"
              element={<ListaServicios />}
            />

            <Route
              path="/servicio/:id"
              element={<DetalleServicio />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

          </Routes>
        </main>

      </Router>
    </CarritoProvider>
  );
}