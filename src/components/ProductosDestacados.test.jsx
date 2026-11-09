import { render, screen } from '@testing-library/react';
import { ProductosDestacados, API_DESTACADOS } from './ProductosDestacados';

describe('ProductosDestacados Component', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('muestra el mensaje "Cargando productos..." inicialmente', () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}));

    render(<ProductosDestacados />);

    expect(screen.getByText('Cargando productos...')).toBeInTheDocument();
  });

  test('muestra la lista de productos cuando la API responde con éxito', async () => {
    const mockData = [
      {
        id: 3,
        nombre: 'Dior Paradise 100ml',
        marca: 'Dior',
        precio: 380000,
        imagen: '/img/producto3.png',
        enOferta: false,
      },
    ];

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    render(<ProductosDestacados />);

    expect(await screen.findByText('Dior Paradise 100ml')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(API_DESTACADOS);
  });

  test('muestra mensaje de error cuando falla la llamada a la API', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ ok: false });

    render(<ProductosDestacados />);

    expect(
      await screen.findByText('Error al cargar los productos')
    ).toBeInTheDocument();
  });
});
