import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App (navegación completa)', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: async () => [] });
    window.history.pushState({}, '', '/');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('navega a Productos, agrega un perfume y lo ve en el Carrito', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('link', { name: 'Productos' }));
    expect(screen.getByRole('heading', { name: 'Todos nuestros productos' })).toBeInTheDocument();
    // Los 6 perfumes del catálogo, cada uno con su botón
    const botones = screen.getAllByRole('button', { name: '+ Agregar al carro' });
    expect(botones).toHaveLength(6);

    await user.click(botones[2]); // Dior Paradise
    expect(screen.getByLabelText('Carrito, 1 artículos')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Carrito, 1 artículos'));
    expect(screen.getByRole('heading', { name: 'Tu carrito (1 artículo)' })).toBeInTheDocument();
    expect(screen.getByText('Dior Paradise 100ml')).toBeInTheDocument();
  });

  test('en Contáctanos, enviar el formulario muestra la confirmación', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('link', { name: 'Contáctanos' }));
    await user.type(screen.getByLabelText('Nombre completo *'), 'Angy Caiozzi');
    await user.type(screen.getByLabelText('Correo electrónico *'), 'an.caiozzi@duocuc.cl');
    await user.type(screen.getByLabelText('Mensaje *'), 'Quiero saber si tienen stock');
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }));

    expect(screen.getByRole('status')).toHaveTextContent('¡Gracias Angy Caiozzi! Tu mensaje fue enviado correctamente ♡');
  });
});
