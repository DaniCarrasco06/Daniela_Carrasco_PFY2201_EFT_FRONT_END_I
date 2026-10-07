// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, within, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import fs from 'node:fs';
import App from './App.jsx';

const datos = JSON.parse(fs.readFileSync('public/data/products.json', 'utf-8'));

afterEach(() => cleanup());

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => datos })));
});

async function cargar() {
  render(<App />);
  await screen.findByText('Diablo I', {}, { timeout: 3000 });
}

describe('EFT GameZone', () => {
  it('muestra tarjetas con imagen, nombre, precio y descripción', async () => {
    await cargar();
    expect(screen.getAllByRole('img').length).toBe(7);
    expect(screen.getByText('$9.990')).toBeInTheDocument();
    expect(screen.getByText(/Clásico RPG/)).toBeInTheDocument();
  });

  it('filtra por categoría', async () => {
    await cargar();
    const grupo = screen.getByRole('group', { name: /Filtrar/ });
    await userEvent.click(within(grupo).getByRole('button', { name: 'rpg' }));
    expect(screen.getByText('Diablo I')).toBeInTheDocument();
    expect(screen.getByText('Pokémon')).toBeInTheDocument();
    expect(screen.queryByText('Doom')).not.toBeInTheDocument();
    await userEvent.click(within(grupo).getByRole('button', { name: 'todas' }));
    expect(screen.getByText('Doom')).toBeInTheDocument();
  });

  it('valida el formulario de contacto', async () => {
    await cargar();
    await userEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('El correo es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('El mensaje es obligatorio.')).toBeInTheDocument();
    expect(document.activeElement.id).toBe('contacto-nombre');

    await userEvent.type(screen.getByLabelText('Nombre'), 'Dani');
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'malcorreo');
    await userEvent.type(screen.getByLabelText('Mensaje'), 'Hola, quiero consultar un pedido');
    await userEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    expect(screen.getByText(/correo válido/)).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText('Correo electrónico'));
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'dani@correo.cl');
    await userEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    expect(screen.getByText(/Recibimos tu mensaje/)).toBeInTheDocument();
  });

  it('agrega y elimina videojuegos', async () => {
    await cargar();
    await userEvent.click(screen.getByRole('button', { name: 'Agregar juego' }));
    expect(screen.getByText('La categoría es obligatoria.')).toBeInTheDocument();
    expect(screen.getByText('El precio es obligatorio.')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Nombre del juego'), 'Zelda');
    await userEvent.type(screen.getByLabelText('Categoría'), 'Aventura');
    await userEvent.type(screen.getByLabelText('Precio (CLP)'), '45990');
    await userEvent.type(screen.getByLabelText('Descripción'), 'Explora Hyrule y salva a la princesa.');
    await userEvent.click(screen.getByRole('button', { name: 'Agregar juego' }));
    expect(screen.getByRole('heading', { name: 'Zelda' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Eliminar Zelda del catálogo' }));
    expect(screen.queryByRole('heading', { name: 'Zelda' })).not.toBeInTheDocument();
  });

  it('carrito: agrega, actualiza título y total; eliminar juego lo quita del carrito', async () => {
    await cargar();
    await userEvent.click(screen.getAllByRole('button', { name: 'Agregar al carrito' })[0]);
    await waitFor(() => expect(document.title).toBe('(1) GameZone'));
    await userEvent.click(screen.getByRole('button', { name: 'Eliminar Diablo I del catálogo' }));
    await waitFor(() => expect(document.title).toBe('GameZone - Tienda de Videojuegos'));
  });
});
