import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from './CartContext';
import { ProductCard } from '../components/ProductCard';
import { MenuPrincipal } from '../components/MenuPrincipal';

describe('Carrito de compras', () => {
  beforeEach(() => localStorage.clear());

  const producto = { id: 3, nombre: 'Dior Paradise 100ml', marca: 'Dior', precio: 380000, imagen: '/img/producto3.png' };

  const renderConCarro = () =>
    render(
      <CartProvider>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <MenuPrincipal />
          <ProductCard {...producto} />
        </MemoryRouter>
      </CartProvider>
    );

  test('el contador del menú sube al agregar y baja al quitar', async () => {
    const user = userEvent.setup();
    renderConCarro();

    expect(screen.getByLabelText('Carrito, 0 artículos')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '+ Agregar al carro' }));
    expect(screen.getByLabelText('Carrito, 1 artículos')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '✓ En el carro' }));
    expect(screen.getByLabelText('Carrito, 0 artículos')).toBeInTheDocument();
  });
});
