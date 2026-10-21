// =============================================
// Pruebas de las páginas de ADMINISTRACIÓN
// Admin, AdminProductos y AdminUsuarios
// =============================================

import { render, screen, within, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Admin from '../pages/Admin'
import AdminProductos from '../pages/AdminProductos'
import AdminUsuarios from '../pages/AdminUsuarios'
import { SesionProvider } from '../context/SesionContext'
import { CarritoProvider } from '../context/CarritoContext'
import { ADMIN_DEFECTO, guardarStorage } from '../utils/storage'

function seedAdmin() {
  guardarStorage('usuarios', [ADMIN_DEFECTO])
  guardarStorage('sesionActiva', {
    nombre: ADMIN_DEFECTO.nombre,
    correo: ADMIN_DEFECTO.correo,
    rol: 'admin',
  })
}

function seedUsuario() {
  guardarStorage('usuarios', [
    ADMIN_DEFECTO,
    {
      nombre: 'Ana',
      rut: '12.345.678-5',
      correo: 'ana@gmail.com',
      password: 'abcd',
      telefono: '+569 12345678',
      rol: 'usuario',
    },
  ])
  guardarStorage('sesionActiva', {
    nombre: 'Ana',
    correo: 'ana@gmail.com',
    rol: 'usuario',
  })
}

function renderConProviders(ui) {
  return render(
    <SesionProvider>
      <CarritoProvider>{ui}</CarritoProvider>
    </SesionProvider>,
  )
}

// ---------------- ADMIN ----------------
describe('Página Admin', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('muestra acceso restringido sin sesión', () => {
    const navegar = vi.fn()
    renderConProviders(<Admin navegar={navegar} />)

    expect(screen.getByText('Acceso restringido')).toBeTruthy()
    expect(screen.getByText('Debes iniciar sesión como administrador.')).toBeTruthy()
  })

  it('redirige a login desde acceso restringido', async () => {
    const navegar = vi.fn()
    renderConProviders(<Admin navegar={navegar} />)

    await userEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))
    expect(navegar).toHaveBeenCalledWith('login')
  })

  it('muestra acceso restringido a un usuario normal', () => {
    seedUsuario()
    renderConProviders(<Admin navegar={vi.fn()} />)
    expect(screen.getByText('Acceso restringido')).toBeTruthy()
  })

  it('muestra el panel con estadísticas al admin', () => {
    seedAdmin()
    renderConProviders(<Admin navegar={vi.fn()} />)

    expect(screen.getByText('Panel de Administración')).toBeTruthy()
    expect(screen.getByText('Usuarios registrados')).toBeTruthy()
    expect(screen.getByText('Productos')).toBeTruthy()
    expect(screen.getByText('Acciones Rápidas')).toBeTruthy()
  })

  it('navega a gestión de usuarios y productos', async () => {
    seedAdmin()
    const navegar = vi.fn()
    renderConProviders(<Admin navegar={navegar} />)

    await userEvent.click(screen.getByText(/Gestionar Usuarios/))
    expect(navegar).toHaveBeenCalledWith('admin-usuarios')

    await userEvent.click(screen.getByText(/Gestionar Productos/))
    expect(navegar).toHaveBeenCalledWith('admin-productos')

    await userEvent.click(screen.getByText(/Volver a la Tienda/))
    expect(navegar).toHaveBeenCalledWith('inicio')
  })

  it('cierra sesión y vuelve al inicio', async () => {
    seedAdmin()
    const navegar = vi.fn()
    renderConProviders(<Admin navegar={navegar} />)

    await userEvent.click(screen.getByText(/Cerrar Sesión/))
    expect(navegar).toHaveBeenCalledWith('inicio')
    expect(localStorage.getItem('sesionActiva')).toBeNull()
  })
})

// ---------------- ADMIN PRODUCTOS ----------------
describe('Página AdminProductos', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('muestra acceso restringido sin sesión de admin', () => {
    renderConProviders(<AdminProductos navegar={vi.fn()} />)
    expect(screen.getByText('Acceso restringido')).toBeTruthy()
  })

  it('muestra formulario y lista de productos al admin', () => {
    seedAdmin()
    renderConProviders(<AdminProductos navegar={vi.fn()} />)

    expect(screen.getByText('Gestionar Productos')).toBeTruthy()
    expect(screen.getByText('Nuevo producto')).toBeTruthy()
    expect(screen.getByText('Lista de productos')).toBeTruthy()
    // El catálogo por defecto tiene 14 productos
    expect(screen.getAllByRole('button', { name: 'Editar' })).toHaveLength(14)
  })

  it('valida campos obligatorios al agregar', async () => {
    seedAdmin()
    renderConProviders(<AdminProductos navegar={vi.fn()} />)

    await userEvent.click(screen.getByRole('button', { name: 'Agregar producto' }))
    expect(screen.getByText('El nombre es obligatorio.')).toBeTruthy()

    await userEvent.type(screen.getByLabelText('Nombre:'), 'Teclado')
    await userEvent.click(screen.getByRole('button', { name: 'Agregar producto' }))
    expect(screen.getByText('El precio debe ser un número mayor a 0.')).toBeTruthy()

    await userEvent.type(screen.getByLabelText('Precio:'), '1000')
    await userEvent.click(screen.getByRole('button', { name: 'Agregar producto' }))
    expect(screen.getByText('La imagen es obligatoria.')).toBeTruthy()
  })

  it('agrega un producto nuevo', async () => {
    seedAdmin()
    renderConProviders(<AdminProductos navegar={vi.fn()} />)

    await userEvent.type(screen.getByLabelText('Nombre:'), 'Teclado Nuevo')
    await userEvent.type(screen.getByLabelText('Precio:'), '25000')
    await userEvent.type(screen.getByLabelText('URL de la imagen:'), 'https://img.test/teclado.png')
    await userEvent.type(screen.getByLabelText('Descripción:'), 'Teclado mecánico')
    await userEvent.click(screen.getByRole('button', { name: 'Agregar producto' }))

    expect(screen.getByText('Teclado Nuevo')).toBeTruthy()
    expect(screen.getByText('Nuevo producto')).toBeTruthy()
    // 14 originales + 1 nuevo
    expect(screen.getAllByRole('button', { name: 'Editar' })).toHaveLength(15)
  })

  it('edita un producto existente', async () => {
    seedAdmin()
    renderConProviders(<AdminProductos navegar={vi.fn()} />)

    // El primer producto del catálogo es "Audífonos Razer BlackShark V2 X"
    const fila = screen.getByText('Audífonos Razer BlackShark V2 X').closest('tr')
    await userEvent.click(within(fila).getByRole('button', { name: 'Editar' }))

    expect(screen.getByText('Editar producto')).toBeTruthy()
    expect(screen.getByLabelText('Nombre:')).toHaveValue('Audífonos Razer BlackShark V2 X')

    await userEvent.clear(screen.getByLabelText('Nombre:'))
    await userEvent.type(screen.getByLabelText('Nombre:'), 'Audífonos Renombrados')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))

    expect(screen.getByText('Audífonos Renombrados')).toBeTruthy()
  })

  it('cancela la edición', async () => {
    seedAdmin()
    renderConProviders(<AdminProductos navegar={vi.fn()} />)

    const fila = screen.getByText('Audífonos Razer BlackShark V2 X').closest('tr')
    await userEvent.click(within(fila).getByRole('button', { name: 'Editar' }))
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar edición' }))

    expect(screen.getByText('Nuevo producto')).toBeTruthy()
    expect(screen.getByLabelText('Nombre:')).toHaveValue('')
  })

  it('elimina un producto si se confirma', async () => {
    seedAdmin()
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    renderConProviders(<AdminProductos navegar={vi.fn()} />)

    const fila = screen.getByText('Audífonos Razer BlackShark V2 X').closest('tr')
    await userEvent.click(within(fila).getByRole('button', { name: 'Eliminar' }))

    expect(screen.queryByText('Audífonos Razer BlackShark V2 X')).toBeNull()
    expect(screen.getAllByRole('button', { name: 'Editar' })).toHaveLength(13)
  })

  it('no elimina si se cancela la confirmación', async () => {
    seedAdmin()
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    renderConProviders(<AdminProductos navegar={vi.fn()} />)

    const fila = screen.getByText('Audífonos Razer BlackShark V2 X').closest('tr')
    await userEvent.click(within(fila).getByRole('button', { name: 'Eliminar' }))

    expect(screen.getByText('Audífonos Razer BlackShark V2 X')).toBeTruthy()
  })

  it('vuelve al panel', async () => {
    seedAdmin()
    const navegar = vi.fn()
    renderConProviders(<AdminProductos navegar={navegar} />)

    await userEvent.click(screen.getByRole('button', { name: '← Volver al panel' }))
    expect(navegar).toHaveBeenCalledWith('admin')
  })
})

// ---------------- ADMIN USUARIOS ----------------
describe('Página AdminUsuarios', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('muestra acceso restringido sin sesión de admin', () => {
    renderConProviders(<AdminUsuarios navegar={vi.fn()} />)
    expect(screen.getByText('Acceso restringido')).toBeTruthy()
  })

  it('muestra formulario y lista de usuarios al admin', () => {
    seedAdmin()
    renderConProviders(<AdminUsuarios navegar={vi.fn()} />)

    expect(screen.getByText('Gestionar Usuarios')).toBeTruthy()
    expect(screen.getByText('Nuevo usuario')).toBeTruthy()
    expect(screen.getByText('Lista de usuarios')).toBeTruthy()
    expect(screen.getByText('admin@gmail.com')).toBeTruthy()
  })

  it('valida campos del formulario', async () => {
    seedAdmin()
    renderConProviders(<AdminUsuarios navegar={vi.fn()} />)

    await userEvent.click(screen.getByRole('button', { name: 'Agregar usuario' }))
    expect(screen.getByText('El nombre es obligatorio.')).toBeTruthy()

    await userEvent.type(screen.getByLabelText('Nombre:'), 'Ana')
    await userEvent.click(screen.getByRole('button', { name: 'Agregar usuario' }))
    expect(screen.getByText('El RUT es obligatorio.')).toBeTruthy()
  })

  it('rechaza un correo ya registrado', async () => {
    seedAdmin()
    renderConProviders(<AdminUsuarios navegar={vi.fn()} />)

    await userEvent.type(screen.getByLabelText('Nombre:'), 'Admin Clone')
    await userEvent.type(screen.getByLabelText('RUT:'), '12.345.678-5')
    await userEvent.type(screen.getByLabelText('Correo:'), 'admin@gmail.com')
    await userEvent.type(screen.getByLabelText('Contraseña:'), 'abcd')
    await userEvent.type(screen.getByLabelText('Teléfono:'), '+569 12345678')
    await userEvent.click(screen.getByRole('button', { name: 'Agregar usuario' }))

    expect(screen.getByText('Este correo ya está registrado.')).toBeTruthy()
  })

  it('agrega un usuario nuevo', async () => {
    seedAdmin()
    renderConProviders(<AdminUsuarios navegar={vi.fn()} />)

    await userEvent.type(screen.getByLabelText('Nombre:'), 'Ana Pérez')
    await userEvent.type(screen.getByLabelText('RUT:'), '12.345.678-5')
    await userEvent.type(screen.getByLabelText('Correo:'), 'ana@gmail.com')
    await userEvent.type(screen.getByLabelText('Contraseña:'), 'abcd')
    await userEvent.type(screen.getByLabelText('Teléfono:'), '+569 12345678')
    await userEvent.click(screen.getByRole('button', { name: 'Agregar usuario' }))

    expect(screen.getByText('ana@gmail.com')).toBeTruthy()
  })

  it('edita un usuario existente', async () => {
    seedAdmin()
    guardarStorage('usuarios', [
      ADMIN_DEFECTO,
      {
        nombre: 'Ana',
        rut: '12.345.678-5',
        correo: 'ana@gmail.com',
        password: 'abcd',
        telefono: '+569 12345678',
        rol: 'usuario',
      },
    ])
    renderConProviders(<AdminUsuarios navegar={vi.fn()} />)

    const fila = screen.getByText('ana@gmail.com').closest('tr')
    await userEvent.click(within(fila).getByRole('button', { name: 'Editar' }))

    expect(screen.getByText('Editar usuario')).toBeTruthy()
    expect(screen.getByLabelText('Nombre:')).toHaveValue('Ana')

    await userEvent.clear(screen.getByLabelText('Nombre:'))
    await userEvent.type(screen.getByLabelText('Nombre:'), 'Ana Editada')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))

    expect(screen.getByText('Ana Editada')).toBeTruthy()
  })

  it('no permite eliminar al admin por defecto', async () => {
    seedAdmin()
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    renderConProviders(<AdminUsuarios navegar={vi.fn()} />)

    const fila = screen.getByText('admin@gmail.com').closest('tr')
    await userEvent.click(within(fila).getByRole('button', { name: 'Eliminar' }))

    expect(alertSpy).toHaveBeenCalledWith('No puedes eliminar al administrador por defecto.')
    expect(screen.getByText('admin@gmail.com')).toBeTruthy()
  })

  it('elimina un usuario si se confirma', async () => {
    seedAdmin()
    guardarStorage('usuarios', [
      ADMIN_DEFECTO,
      {
        nombre: 'Ana',
        rut: '12.345.678-5',
        correo: 'ana@gmail.com',
        password: 'abcd',
        telefono: '+569 12345678',
        rol: 'usuario',
      },
    ])
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    renderConProviders(<AdminUsuarios navegar={vi.fn()} />)

    const fila = screen.getByText('ana@gmail.com').closest('tr')
    await userEvent.click(within(fila).getByRole('button', { name: 'Eliminar' }))

    expect(screen.queryByText('ana@gmail.com')).toBeNull()
    expect(screen.getByText('admin@gmail.com')).toBeTruthy()
  })
})
