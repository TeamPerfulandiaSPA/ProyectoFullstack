import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';

describe('ContactForm Component', () => {
  test('el botón está deshabilitado si el mensaje tiene menos de 10 caracteres', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={jest.fn()} />);
    const boton = screen.getByRole('button', { name: 'Enviar mensaje' });

    // Al inicio (0 caracteres) está deshabilitado
    expect(boton).toBeDisabled();

    // Con 9 caracteres ("Muy corto") sigue deshabilitado: es el límite justo
    await user.type(screen.getByLabelText('Mensaje *'), 'Muy corto');
    expect(boton).toBeDisabled();
  });

  test('habilita el botón cuando se escriben 10 o más caracteres', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={jest.fn()} />);

    await user.type(screen.getByLabelText('Mensaje *'), 'Excelente perfume');

    expect(
      screen.getByRole('button', { name: 'Enviar mensaje' })
    ).toBeEnabled();
  });

  test('(extra) con exactamente 10 caracteres el botón ya se habilita', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={jest.fn()} />);

    await user.type(screen.getByLabelText('Mensaje *'), 'Excelente!'); // 10 caracteres

    expect(
      screen.getByRole('button', { name: 'Enviar mensaje' })
    ).toBeEnabled();
  });

  test('ejecuta onSubmit 1 vez con los datos correctos al enviar', async () => {
    const user = userEvent.setup();

    // Función simulada: registra cuántas veces se llamó y con qué argumentos
    const handleSubmit = jest.fn();
    render(<ContactForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText('Nombre completo *'), 'Angy Caiozzi');
    await user.type(screen.getByLabelText('Correo electrónico *'), 'an.caiozzi@duocuc.cl');
    await user.type(screen.getByLabelText('Mensaje *'), 'Quiero saber si tienen stock');
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      nombre: 'Angy Caiozzi',
      email: 'an.caiozzi@duocuc.cl',
      telefono: '',
      comuna: '',
      mensaje: 'Quiero saber si tienen stock',
    });
  });

  test('(extra) con un correo inválido muestra el error y NO llama a onSubmit', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<ContactForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText('Nombre completo *'), 'Angy Caiozzi');
    await user.type(screen.getByLabelText('Correo electrónico *'), 'correo-malo');
    await user.type(screen.getByLabelText('Mensaje *'), 'Quiero saber si tienen stock');
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }));

    expect(
      screen.getByText('Ingresa un correo válido, ej: an.caiozzi@duocuc.cl')
    ).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test('(extra) con un teléfono inválido muestra el error y NO llama a onSubmit', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<ContactForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText('Nombre completo *'), 'Angy Caiozzi');
    await user.type(screen.getByLabelText('Correo electrónico *'), 'an.caiozzi@duocuc.cl');
    await user.type(screen.getByLabelText('Teléfono'), '123');
    await user.type(screen.getByLabelText('Mensaje *'), 'Quiero saber si tienen stock');
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }));

    expect(
      screen.getByText('Ingresa un teléfono válido, ej: +569********')
    ).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
