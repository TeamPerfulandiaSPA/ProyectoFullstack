import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { Footer } from './Footer';

describe('Header y Footer', () => {
  test('el Header muestra el nombre de la tienda y el logo', () => {
    render(<Header />);

    expect(screen.getByRole('heading', { name: 'Perfulandia' })).toBeInTheDocument();
    expect(screen.getByAltText('Logo Perfulandia')).toHaveAttribute('src', '/img/Logo.jpg');
  });

  test('el Footer usa la grilla de Bootstrap: 3 columnas col-md-4', () => {
    render(<Footer />);

    expect(screen.getByText('bellakas@perfulandiaSPA.cl')).toBeInTheDocument();

    const columna = screen.getByRole('heading', { name: 'Horario' }).parentElement;
    expect(columna).toHaveClass('col-12', 'col-md-4');
  });
});
