// =============================================
// Pruebas de Carrito (checkout) y MisPedidos
// =============================================

import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Carrito from '../pages/Carrito'
import MisPedidos from '../pages/MisPedidos'
import { SesionProvider } from '../context/SesionContext'
import { CarritoProvider } from '../context/CarritoContext'
import { ADMIN_DEFECTO, guardarStorage } from '../utils/storage'

const producto = {
  id: 1,
  nombre: 'Mouse Gamer',
  precio: 10000,
  imagen: 'https://ejemplo.com/mouse.png',
  descripcion: 'Mouse de prueba',
  cantidad: 2,
}

function seedAdmin() {
  guardarStorage('usuarios', [ADMIN_DEFECTO])
  guardarStorage('sesionActiva', {
    nombre: ADMIN_DEFECTO.nombre,
    correo: ADMIN_DEFECTO.correo,
    rol: 'admin',
  })
}

function renderConProviders(ui) {
  return render(
    <SesionProvider>
      <CarritoProvider>{ui}</CarritoProvider>
    </SesionProvider>,
  )
}

// ---------------- CARRITO ----------------
describe('Página Carrito', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('muestra carrito vacío cuando no hay productos', () => {
    renderConProviders(<Carrito navegar={vi.fn()} />)
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy()
  })

  it('vuelve al inicio desde carrito vacío', async () => {
    const navegar = vi.fn()
    renderConProviders(<Carrito navegar={navegar} />)

    await userEvent.click(screen.getByRole('button', { name: 'Ver productos' }))
    expect(navegar).toHaveBeenCalledWith('inicio')
  })

  it('lista productos del carrito y calcula totales', () => {
    guardarStorage('carrito', [producto])
    renderConProviders(<Carrito navegar={vi.fn()} />)

    expect(screen.getByText('Mouse Gamer')).toBeTruthy()
    expect(screen.getByText('Mi Carrito')).toBeTruthy()
    // subtotal = 10000 * 2 = 20000, envío gratis
    expect(screen.getAllByText(/\$20\.000/).length).toBeGreaterThan(0)
  })

  it('aumenta y disminuye cantidad', async () => {
    guardarStorage('carrito', [{ ...producto, cantidad: 1 }])
    renderConProviders(<Carrito navegar={vi.fn()} />)

    await userEvent.click(screen.getByRole('button', { name: '+' }))
    expect(screen.getByText('2')).toBeTruthy()

    await userEvent.click(screen.getByRole('button', { name: '-' }))
    // cantidad 1 → el "-" deja el producto en el carrito
    expect(screen.getByText('Mouse Gamer')).toBeTruthy()
  })

  it('elimina un producto del carrito', async () => {
    guardarStorage('carrito', [producto])
    renderConProviders(<Carrito navegar={vi.fn()} />)

    await userEvent.click(screen.getByRole('button', { name: 'Eliminar' }))
    expect(screen.queryByText('Mouse Gamer')).toBeNull()
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy()
  })

  it('aplica un código de descuento válido', async () => {
    guardarStorage('carrito', [producto])
    renderConProviders(<Carrito navegar={vi.fn()} />)

    await userEvent.type(screen.getByPlaceholderText('Código de descuento'), 'AKUMA10')
    await userEvent.click(screen.getByRole('button', { name: 'Aplicar' }))

    expect(screen.getByText(/¡Código aplicado!/)).toBeTruthy()
  })

  it('muestra error con código inválido', async () => {
    guardarStorage('carrito', [producto])
    renderConProviders(<Carrito navegar={vi.fn()} />)

    await userEvent.type(screen.getByPlaceholderText('Código de descuento'), 'NOEXISTE')
    await userEvent.click(screen.getByRole('button', { name: 'Aplicar' }))

    expect(screen.getByText(/Código no válido/)).toBeTruthy()
  })

  it('vacía el carrito si se confirma', async () => {
    guardarStorage('carrito', [producto])
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    renderConProviders(<Carrito navegar={vi.fn()} />)

    await userEvent.click(screen.getByRole('button', { name: /Vaciar/i }))
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy()
  })

  it('no vacía si se cancela', async () => {
    guardarStorage('carrito', [producto])
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    renderConProviders(<Carrito navegar={vi.fn()} />)

    await userEvent.click(screen.getByRole('button', { name: /Vaciar/i }))
    expect(screen.getByText('Mouse Gamer')).toBeTruthy()
  })

  it('pide iniciar sesión si no hay sesión al pagar', async () => {
    guardarStorage('carrito', [producto])
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const navegar = vi.fn()
    renderConProviders(<Carrito navegar={navegar} />)

    await userEvent.click(screen.getByRole('button', { name: /Ir a pagar/ }))

    expect(alertSpy).toHaveBeenCalledWith('Debes iniciar sesión para realizar la compra')
    expect(navegar).toHaveBeenCalledWith('login')
  })

  it('completa el pago y muestra el modal con número de pedido', async () => {
    seedAdmin()
    guardarStorage('carrito', [producto])
    renderConProviders(<Carrito navegar={vi.fn()} />)

    await userEvent.click(screen.getByRole('button', { name: /Ir a pagar/ }))

    expect(screen.getByText('¡Compra realizada!')).toBeTruthy()
    expect(screen.getByText(/Tu número de pedido es:/)).toBeTruthy()

    // El pedido se guardó en localStorage
    const pedidos = JSON.parse(localStorage.getItem('pedidos_akuma'))
    expect(pedidos).toHaveLength(1)
    expect(pedidos[0].usuarioCorreo).toBe('admin@gmail.com')

    // El carrito quedó vacío tras el pago
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy()
  })
})

// ---------------- MIS PEDIDOS ----------------
describe('Página MisPedidos', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('muestra acceso denegado sin sesión', () => {
    renderConProviders(<MisPedidos navegar={vi.fn()} />)
    expect(screen.getByText('Acceso denegado')).toBeTruthy()
  })

  it('navega a login desde acceso denegado', async () => {
    const navegar = vi.fn()
    renderConProviders(<MisPedidos navegar={navegar} />)

    await userEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))
    expect(navegar).toHaveBeenCalledWith('login')
  })

  it('muestra estado vacío sin pedidos', () => {
    seedAdmin()
    renderConProviders(<MisPedidos navegar={vi.fn()} />)

    expect(screen.getByText('Mis Pedidos')).toBeTruthy()
    expect(screen.getByText(/Aún no registras pedidos/)).toBeTruthy()
  })

  it('lista solo los pedidos del usuario actual', () => {
    seedAdmin()
    guardarStorage('pedidos_akuma', [
      {
        id: 'AK-00000001',
        fecha: '01/01/2026',
        total: 20000,
        usuarioCorreo: 'admin@gmail.com',
        productos: [{ ...producto, cantidad: 1 }],
      },
      {
        id: 'AK-00000002',
        fecha: '02/01/2026',
        total: 5000,
        usuarioCorreo: 'otro@gmail.com',
        productos: [{ ...producto, cantidad: 1 }],
      },
    ])
    renderConProviders(<MisPedidos navegar={vi.fn()} />)

    expect(screen.getByText('Pedido: AK-00000001')).toBeTruthy()
    expect(screen.queryByText('Pedido: AK-00000002')).toBeNull()
    expect(screen.getByText(/Mouse Gamer/)).toBeTruthy()
  })

  it('vuelve a comprar un pedido anterior', async () => {
    seedAdmin()
    guardarStorage('pedidos_akuma', [
      {
        id: 'AK-00000001',
        fecha: '01/01/2026',
        total: 20000,
        usuarioCorreo: 'admin@gmail.com',
        productos: [{ ...producto, cantidad: 2 }],
      },
    ])
    vi.spyOn(window, 'alert').mockImplementation(() => {})
    const navegar = vi.fn()
    renderConProviders(<MisPedidos navegar={navegar} />)

    await userEvent.click(screen.getByRole('button', { name: /Volver a comprar/ }))

    expect(navegar).toHaveBeenCalledWith('carrito')
    // Quedaron 2 unidades en el carrito
    expect(JSON.parse(localStorage.getItem('carrito'))).toHaveLength(1)
    expect(JSON.parse(localStorage.getItem('carrito'))[0].cantidad).toBe(2)
  })

  it('va a comprar desde el estado vacío', async () => {
    seedAdmin()
    const navegar = vi.fn()
    renderConProviders(<MisPedidos navegar={navegar} />)

    await userEvent.click(screen.getByRole('button', { name: 'Ir a comprar' }))
    expect(navegar).toHaveBeenCalledWith('inicio')
  })
})
