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
    // 1. Renderizar <ProductCard /> pasando las props de mockProducto
    render(<ProductCard {...mockProducto} />);

    // 2. Comprobar que el nombre, la marca y el precio están en el documento
    expect(screen.getByText('Dior Paradise 100ml')).toBeInTheDocument();
    expect(screen.getByText('Marca: Dior')).toBeInTheDocument();
    expect(screen.getByText('$380.000')).toBeInTheDocument();
  });

  test('muestra la insignia "En oferta" cuando enOferta es true', () => {
    // 1. Renderizar con enOferta={true}
    render(<ProductCard {...mockProducto} enOferta={true} />);

    // 2. La insignia existe en el DOM
    expect(screen.getByText('En oferta')).toBeInTheDocument();
  });

  test('NO muestra la insignia "En oferta" cuando enOferta es false', () => {
    // 1. Renderizar con enOferta={false}
    render(<ProductCard {...mockProducto} enOferta={false} />);

    // 2. queryByText devuelve null si no existe (getByText lanzaría error)
    expect(screen.queryByText('En oferta')).not.toBeInTheDocument();
  });

  test('(extra) en oferta muestra el precio original tachado y el precio rebajado', () => {
    render(<ProductCard {...mockProducto} precio={84990} precioOriginal={99990} enOferta={true} />);

    // El precio original va dentro de <del> (tachado)
    const original = screen.getByText('$99.990');
    expect(original.tagName).toBe('DEL');
    // El precio de oferta se ve normal y aparece el % de descuento
    expect(screen.getByText('$84.990')).toBeInTheDocument();
    expect(screen.getByText('En oferta · -15%')).toBeInTheDocument();
  });
});
