import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddToCartButton } from './AddToCartButton';

describe('AddToCartButton Component', () => {
  test('inicia con el texto "+ Agregar al carro"', () => {
    render(<AddToCartButton />);

    expect(
      screen.getByRole('button', { name: '+ Agregar al carro' })
    ).toBeInTheDocument();
  });

  test('cambia el texto a "✓ En el carro" al hacer clic', async () => {
    const user = userEvent.setup();
    render(<AddToCartButton />);

    await user.click(screen.getByRole('button'));

    expect(
      screen.getByRole('button', { name: '✓ En el carro' })
    ).toBeInTheDocument();
  });

  test('vuelve a "+ Agregar al carro" tras un segundo clic', async () => {
    const user = userEvent.setup();
    render(<AddToCartButton />);
    const boton = screen.getByRole('button');

    await user.click(boton); 
    await user.click(boton); 

    expect(
      screen.getByRole('button', { name: '+ Agregar al carro' })
    ).toBeInTheDocument();
  });
});
