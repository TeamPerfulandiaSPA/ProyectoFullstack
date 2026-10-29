import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Si un componente se usa sin <CartProvider> (por ejemplo en los tests),
// el contexto vale null y el componente se las arregla solo.
export const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

const CLAVE = 'perfulandia-carro';

function leerGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE));
    return Array.isArray(guardado) ? guardado : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(leerGuardado);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items));
    } catch {
      /* si el navegador no deja guardar, el carro igual funciona */
    }
  }, [items]);

  const valor = useMemo(() => {
    const agregar = (producto) =>
      setItems((prev) =>
        prev.some((i) => i.id === producto.id)
          ? prev.map((i) => (i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i))
          : [...prev, { ...producto, cantidad: 1 }]
      );
    const quitar = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
    const cambiarCantidad = (id, cantidad) =>
      setItems((prev) =>
        cantidad < 1
          ? prev.filter((i) => i.id !== id)
          : prev.map((i) => (i.id === id ? { ...i, cantidad } : i))
      );
    const vaciar = () => setItems([]);
    const estaEnCarro = (id) => items.some((i) => i.id === id);

    return {
      items,
      agregar,
      quitar,
      cambiarCantidad,
      vaciar,
      estaEnCarro,
      totalArticulos: items.reduce((s, i) => s + i.cantidad, 0),
      totalPrecio: items.reduce((s, i) => s + i.precio * i.cantidad, 0),
    };
  }, [items]);

  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>;
}
