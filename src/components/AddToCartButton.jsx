import { useState } from 'react';
import { useCart } from '../context/CartContext';

// Con <CartProvider> suma/quita el producto del carro real.
// Sin provider (tests unitarios) funciona con un estado local.
export function AddToCartButton({ producto }) {
  const cart = useCart();
  const [enCarroLocal, setEnCarroLocal] = useState(false);

  const enCarro = cart && producto ? cart.estaEnCarro(producto.id) : enCarroLocal;

  const handleClick = () => {
    if (cart && producto) {
      if (enCarro) cart.quitar(producto.id);
      else cart.agregar(producto);
    } else {
      setEnCarroLocal(!enCarroLocal);
    }
  };

  return (
    <button
      type="button"
      className={`btn-carro ${enCarro ? 'agregado' : ''}`}
      onClick={handleClick}
    >
      {enCarro ? '✓ En el carro' : '+ Agregar al carro'}
    </button>
  );
}
