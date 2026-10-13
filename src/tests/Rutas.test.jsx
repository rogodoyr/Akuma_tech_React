// =============================================
// Pruebas de RUTAS / NAVEGACIÓN
// Verifican que al hacer clic se muestre la página correcta
// =============================================
// En este proyecto la navegación es con estado en App.jsx
// (equivalente a las "rutas" de react-router)

import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../App'

describe('Navegación de la aplicación', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts on the home page', () => {
    render(<App />)

    expect(screen.getByText('Productos Destacados')).toBeTruthy()
    expect(screen.getByText('Audífonos Razer BlackShark V2 X')).toBeTruthy()
  })

  it('navigates to Login page', async () => {
    render(<App />)

    const header = screen.getByRole('banner')
    await userEvent.click(within(header).getByText('Iniciar Sesión'))

    expect(screen.getByRole('heading', { name: 'Iniciar Sesión' })).toBeTruthy()
  })

  it('navigates to Registro page', async () => {
    render(<App />)

    const header = screen.getByRole('banner')
    await userEvent.click(within(header).getByText('Registro'))

    expect(screen.getByRole('heading', { name: 'Crear Cuenta' })).toBeTruthy()
  })

  it('navigates to Carrito page', async () => {
    render(<App />)

    const header = screen.getByRole('banner')
    await userEvent.click(within(header).getByText('Carrito'))

    expect(screen.getByRole('heading', { name: 'Mi Carrito' })).toBeTruthy()
  })

  it('returns to home page', async () => {
    render(<App />)

    const header = screen.getByRole('banner')

    // Ir a Registro
    await userEvent.click(within(header).getByText('Registro'))
    expect(screen.getByRole('heading', { name: 'Crear Cuenta' })).toBeTruthy()

    // Volver a Inicio
    await userEvent.click(within(header).getByText('Inicio'))
    expect(screen.getByText('Productos Destacados')).toBeTruthy()
  })
})
