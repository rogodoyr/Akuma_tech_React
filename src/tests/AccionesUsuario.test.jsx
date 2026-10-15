
// Pruebas de ACCIONES DE USUARIO
// Simulan clics y escritura en formularios



import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Login from '../pages/Login'
import { SesionProvider } from '../context/SesionContext'
import { guardarStorage } from '../utils/storage'

function renderLogin(navegar) {
  return render(
    <SesionProvider>
      <Login navegar={navegar} />
    </SesionProvider>,
  )
}

describe('Login Page', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows error if email is empty', async () => {
    const { getByRole, findByText, container } = renderLogin(vi.fn())

    // Enviar el formulario sin datos (para saltar required del HTML)
    const form = container.querySelector('#login-form')
    fireEvent.submit(form)

    // find... espera a que el mensaje aparezca en el DOM
    const errorAlert = await findByText('El correo es obligatorio.')
    expect(errorAlert).toBeTruthy()
  })

  it('shows error if email domain is not allowed', async () => {
    const { getByLabelText, getByRole, findByText } = renderLogin(vi.fn())

    await userEvent.type(getByLabelText('Correo:'), 'ana@hotmail.com')
    await userEvent.type(getByLabelText('Contraseña:'), 'abcd')
    await userEvent.click(getByRole('button', { name: 'Iniciar Sesión' }))

    const error = await findByText(/Solo se permiten correos/)
    expect(error).toBeTruthy()
  })

  it('shows error if password is too short', async () => {
    const { getByLabelText, getByRole, findByText } = renderLogin(vi.fn())

    await userEvent.type(getByLabelText('Correo:'), 'ana@gmail.com')
    await userEvent.type(getByLabelText('Contraseña:'), 'ab')
    await userEvent.click(getByRole('button', { name: 'Iniciar Sesión' }))

    const error = await findByText(/entre 4 y 10/)
    expect(error).toBeTruthy()
  })

  it('login success calls navegar', async () => {
    // Preparar usuario registrado
    guardarStorage('usuarios', [
      { nombre: 'Ana', correo: 'ana@gmail.com', password: 'abcd', rol: 'usuario' },
    ])

    const navegar = vi.fn()
    const { getByLabelText, getByRole } = renderLogin(navegar)

    await userEvent.type(getByLabelText('Correo:'), 'ana@gmail.com')
    await userEvent.type(getByLabelText('Contraseña:'), 'abcd')
    await userEvent.click(getByRole('button', { name: 'Iniciar Sesión' }))

    // toHaveBeenCalledTimes: fue llamada n veces
    expect(navegar).toHaveBeenCalledTimes(1)
    expect(navegar).toHaveBeenCalledWith('inicio')
  })
})
