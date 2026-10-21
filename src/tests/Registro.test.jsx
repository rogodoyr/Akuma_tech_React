// =============================================
// Pruebas de la página Registro (submit y validación)
// =============================================

import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Registro from '../pages/Registro'
import { SesionProvider } from '../context/SesionContext'
import { guardarStorage } from '../utils/storage'

function renderRegistro(navegar) {
  return render(
    <SesionProvider>
      <Registro navegar={navegar} />
    </SesionProvider>,
  )
}

async function llenarFormulario(valores) {
  await userEvent.type(screen.getByLabelText('Nombre completo:'), valores.nombre)
  await userEvent.type(screen.getByLabelText('RUT:'), valores.rut)
  await userEvent.type(screen.getByLabelText('Correo electrónico:'), valores.correo)
  await userEvent.type(screen.getByLabelText('Contraseña:'), valores.password)
  await userEvent.type(screen.getByLabelText('Confirmar contraseña:'), valores.confirmar)
  await userEvent.type(screen.getByLabelText('Teléfono:'), valores.telefono)
}

const datosValidos = {
  nombre: 'Ana Pérez',
  rut: '12.345.678-5',
  correo: 'ana@gmail.com',
  password: 'abcd',
  confirmar: 'abcd',
  telefono: '+569 12345678',
}

describe('Página Registro', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('muestra el formulario de creación de cuenta', () => {
    renderRegistro(vi.fn())
    expect(screen.getByRole('heading', { name: 'Crear Cuenta' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Crear Cuenta' })).toBeTruthy()
  })

  it('muestra errores de validación con formulario vacío', async () => {
    const { container } = renderRegistro(vi.fn())

    // Enviar el form directo para saltar la validación HTML5 required
    fireEvent.submit(container.querySelector('#registro-form'))

    expect(await screen.findByText('El nombre es obligatorio.')).toBeTruthy()
    expect(screen.getByText('El RUT es obligatorio.')).toBeTruthy()
    expect(screen.getByText('El correo es obligatorio.')).toBeTruthy()
    expect(screen.getByText('La contraseña es obligatoria.')).toBeTruthy()
  })

  it('valida que las contraseñas coincidan', async () => {
    renderRegistro(vi.fn())

    await llenarFormulario({ ...datosValidos, confirmar: 'zzzz' })
    await userEvent.click(screen.getByRole('button', { name: 'Crear Cuenta' }))

    expect(screen.getByText('Las contraseñas no coinciden.')).toBeTruthy()
  })

  it('registra un usuario válido y navega a login', async () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {})
    const navegar = vi.fn()
    renderRegistro(navegar)

    await llenarFormulario(datosValidos)
    await userEvent.click(screen.getByRole('button', { name: 'Crear Cuenta' }))

    expect(window.alert).toHaveBeenCalled()
    expect(navegar).toHaveBeenCalledWith('login')
  })

  it('rechaza un correo ya registrado', async () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {})
    guardarStorage('usuarios', [
      {
        nombre: 'Ana',
        rut: '12.345.678-5',
        correo: 'ana@gmail.com',
        password: 'abcd',
        telefono: '+569 12345678',
        rol: 'usuario',
      },
    ])
    renderRegistro(vi.fn())

    await llenarFormulario(datosValidos)
    await userEvent.click(screen.getByRole('button', { name: 'Crear Cuenta' }))

    expect(screen.getByText('Este correo ya está registrado.')).toBeTruthy()
    expect(window.alert).not.toHaveBeenCalled()
  })

  it('actualiza los inputs al escribir', async () => {
    renderRegistro(vi.fn())

    const nombre = screen.getByLabelText('Nombre completo:')
    await userEvent.type(nombre, 'Test')
    expect(nombre).toHaveValue('Test')
  })
})
