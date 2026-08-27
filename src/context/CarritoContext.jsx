import { createContext, useContext, useState, useEffect } from 'react';
import { CONFIG } from '../datos/servicios';

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito guardado
  useEffect(() => {
    const guardado = localStorage.getItem('carrito');
    if (guardado) setCarrito(JSON.parse(guardado));
  }, []);

  // Guardar carrito
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item => 
          item.id === producto.id 
            ? {...item, cantidad: item.cantidad + cantidad} 
            : item
        );
      }
      return [...prev, {...producto, cantidad}];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const cambiarCantidad = (id, cantidad) => {
    if (cantidad < 1) return;
    setCarrito(prev => 
      prev.map(item => item.id === id ? {...item, cantidad} : item)
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  const subtotal = carrito.reduce((sum, item) => sum + item.precioARS * item.cantidad, 0);
  const total = carrito.length > 0 ? subtotal + CONFIG.envioNacional : 0;

  return (
    <CarritoContext.Provider value={{
      carrito, agregarAlCarrito, eliminarDelCarrito, 
      cambiarCantidad, vaciarCarrito, subtotal, total
    }}>
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);
