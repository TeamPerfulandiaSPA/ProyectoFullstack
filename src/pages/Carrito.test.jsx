import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import Carrito from './Carrito';

const CLAVE = 'perfulandia-carro';
const dior = { id: 3, nombre: 'Dior Paradise 100ml', marca: 'Dior', precio: 380000, imagen: '/img/producto3.png', cantidad: 1 };

function renderCarrito(items = []) {
  localStorage.setItem(CLAVE, JSON.stringify(items));
  return render(
    <CartProvider>
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Carrito />
      </MemoryRouter>
    </CartProvider>
  );
}

describe('Página Carrito', () => {
  beforeEach(() => localStorage.clear());

  test('muestra "Tu carrito está vacío" si no hay productos', () => {
    renderCarrito([]);

    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver productos' })).toHaveAttribute('href', '/productos');
  });

  test('el botón + aumenta la cantidad y recalcula el total', async () => {
    const user = userEvent.setup();
    renderCarrito([dior]);

    await user.click(screen.getByRole('button', { name: 'Agregar una unidad de Dior Paradise 100ml' }));

    expect(screen.getByLabelText('Cantidad de Dior Paradise 100ml')).toHaveTextContent('2');
    expect(screen.getByText('$760.000', { selector: 'strong' })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(CLAVE))[0].cantidad).toBe(2);
  });

  test('Finalizar compra vacía el carro y muestra el agradecimiento', async () => {
    const user = userEvent.setup();
    renderCarrito([dior]);

    await user.click(screen.getByRole('button', { name: 'Finalizar compra' }));

    expect(screen.getByRole('heading', { name: '¡Gracias por tu compra! ♡' })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(CLAVE))).toEqual([]);
  });
});
