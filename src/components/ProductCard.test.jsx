import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard Component', () => {
  const mockProducto = {
    nombre: 'Dior Paradise 100ml',
    marca: 'Dior',
    precio: 380000,
    imagen: '/img/producto3.png',
  };

  test('renderiza el nombre, la marca y el precio del producto', () => {
    render(<ProductCard {...mockProducto} />);

    expect(screen.getByText('Dior Paradise 100ml')).toBeInTheDocument();
    expect(screen.getByText('Marca: Dior')).toBeInTheDocument();
    expect(screen.getByText('$380.000')).toBeInTheDocument();
  });

  test('muestra la insignia "En oferta" cuando enOferta es true', () => {
    render(<ProductCard {...mockProducto} enOferta={true} />);

    expect(screen.getByText('En oferta')).toBeInTheDocument();
  });

  test('NO muestra la insignia "En oferta" cuando enOferta es false', () => {
    render(<ProductCard {...mockProducto} enOferta={false} />);

    expect(screen.queryByText('En oferta')).not.toBeInTheDocument();
  });

  test('(extra) en oferta muestra el precio original tachado y el precio rebajado', () => {
    render(<ProductCard {...mockProducto} precio={84990} precioOriginal={99990} enOferta={true} />);

    const original = screen.getByText('$99.990');
    expect(original.tagName).toBe('DEL');
    expect(screen.getByText('$84.990')).toBeInTheDocument();
    expect(screen.getByText('En oferta · -15%')).toBeInTheDocument();
  });
});
