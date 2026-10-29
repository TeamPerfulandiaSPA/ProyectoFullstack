import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatearPrecio } from '../utils/formatearPrecio';

export default function Carrito() {
  const { items, cambiarCantidad, quitar, vaciar, totalArticulos, totalPrecio } = useCart();
  const [compraHecha, setCompraHecha] = useState(false);

  const finalizar = () => {
    vaciar();
    setCompraHecha(true);
  };

  if (compraHecha) {
    return (
      <main className="carrito">
        <h2>¡Gracias por tu compra! ♡</h2>
        <p className="carrito-vacio">Tu pedido fue registrado (simulación).</p>
        <p className="carrito-vacio"><Link to="/productos">Seguir mirando perfumes</Link></p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="carrito">
        <h2>Tu carrito</h2>
        <p className="carrito-vacio">Tu carrito está vacío.</p>
        <p className="carrito-vacio"><Link to="/productos">Ver productos</Link></p>
      </main>
    );
  }

  return (
    <main className="carrito">
      <h2>Tu carrito ({totalArticulos} {totalArticulos === 1 ? 'artículo' : 'artículos'})</h2>

      <ul className="carrito-lista">
        {items.map((it) => (
          <li key={it.id} className="carrito-item">
            <img src={it.imagen} alt={it.nombre} />
            <div className="carrito-info">
              <strong>{it.nombre}</strong>
              <span>Marca: {it.marca}</span>
              <span>${formatearPrecio(it.precio)} c/u</span>
            </div>
            <div className="carrito-cantidad">
              <button type="button" aria-label={`Quitar una unidad de ${it.nombre}`} onClick={() => cambiarCantidad(it.id, it.cantidad - 1)}>−</button>
              <span aria-label={`Cantidad de ${it.nombre}`}>{it.cantidad}</span>
              <button type="button" aria-label={`Agregar una unidad de ${it.nombre}`} onClick={() => cambiarCantidad(it.id, it.cantidad + 1)}>+</button>
            </div>
            <p className="carrito-subtotal">${formatearPrecio(it.precio * it.cantidad)}</p>
            <button type="button" className="btn-quitar" onClick={() => quitar(it.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <div className="carrito-resumen">
        <p>Total: <strong>${formatearPrecio(totalPrecio)}</strong></p>
        <div>
          <button type="button" className="btn-secundario" onClick={vaciar}>Vaciar carrito</button>
          <button type="button" onClick={finalizar}>Finalizar compra</button>
        </div>
      </div>
    </main>
  );
}
