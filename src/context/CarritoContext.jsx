import { createContext, useContext, useEffect, useState } from "react";

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  // ==========================================
  // CARGAR CARRITO DESDE LOCALSTORAGE
  // ==========================================

  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem("carrito");

      return guardado ? JSON.parse(guardado) : [];
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
      return [];
    }
  });

  // ==========================================
  // GUARDAR CARRITO
  // ==========================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
      );
    } catch (error) {
      console.error("Error al guardar el carrito:", error);
    }
  }, [carrito]);

  // ==========================================
  // AGREGAR AL CARRITO
  // ==========================================

  const agregarAlCarrito = (servicio) => {
    setCarrito((prev) => {
      const existe = prev.some(
        (item) => item.id === servicio.id
      );

      if (existe) {
        return prev;
      }

      return [
        ...prev,
        {
          ...servicio,
          cantidad: 1,
        },
      ];
    });
  };

  // ==========================================
  // ELIMINAR
  // ==========================================

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // ==========================================
  // CAMBIAR CANTIDAD
  // ==========================================

  const cambiarCantidad = (id, cantidad) => {
    if (cantidad < 1) return;

    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              cantidad,
            }
          : item
      )
    );
  };

  // ==========================================
  // VACIAR CARRITO
  // ==========================================

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // ==========================================
  // SUBTOTAL / TOTAL
  // ==========================================

  const subtotal = carrito.reduce(
    (sum, item) =>
      sum + item.precioARS * item.cantidad,
    0
  );

  // Actualmente son servicios online:
  // no corresponde costo de envío.
  const total = subtotal;

  // ==========================================
  // TOTAL DE ITEMS
  // ==========================================

  const totalItems = carrito.reduce(
    (sum, item) => sum + item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        cambiarCantidad,
        vaciarCarrito,
        subtotal,
        total,
        totalItems,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);

  if (!context) {
    throw new Error(
      "useCarrito debe utilizarse dentro de CarritoProvider"
    );
  }

  return context;
}