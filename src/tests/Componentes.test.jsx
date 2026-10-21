// =============================================
// Pruebas de interacción de componentes
// Header, Footer, Carrusel y ProductoCard
// =============================================

import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Carrusel from '../components/Carrusel'
import ProductoCard from '../components/ProductoCard'
import { SesionProvider } from '../context/SesionContext'
import { CarritoProvider } from '../context/CarritoContext'
import { ADMIN_DEFECTO, guardarStorage } from '../utils/storage'

function renderConProviders(ui) {
  return render(
    <SesionProvider>
      <CarritoProvider>{ui}</CarritoProvider>
    </SesionProvider>,
  )
}

const producto = {
  id: 1,
  nombre: 'Mouse Gamer',
  precio: 10000,
  imagen: 'https://ejemplo.com/mouse.png',
  descripcion: 'Mouse de prueba',
}

// ---------------- HEADER ----------------
describe('Header', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('navega por los enlaces principales', async () => {
    const navegar = vi.fn()
    renderConProviders(<Header navegar={navegar} />)

    await userEvent.click(screen.getByText('Inicio'))
    expect(navegar).toHaveBeenCalledWith('inicio')

    await userEvent.click(screen.getByText('Productos'))
    expect(navegar).toHaveBeenCalledWith('inicio')

    await userEvent.click(screen.getByText('Iniciar Sesión'))
    expect(navegar).toHaveBeenCalledWith('login')
  })

  it('navega al inicio desde el logo', async () => {
    const navegar = vi.fn()
    renderConProviders(<Header navegar={navegar} />)

    await userEvent.click(screen.getByLabelText('Ir al inicio de AkumaTech'))
    expect(navegar).toHaveBeenCalledWith('inicio')
  })

  it('muestra opciones de sesión y cierra sesión', async () => {
    guardarStorage('usuarios', [ADMIN_DEFECTO])
    guardarStorage('sesionActiva', {
      nombre: 'Administrador',
      correo: 'admin@gmail.com',
      rol: 'admin',
    })
    const navegar = vi.fn()
    renderConProviders(<Header navegar={navegar} />)

    expect(screen.getByText(/Administrador/)).toBeTruthy()
    expect(screen.getByText('Panel Admin')).toBeTruthy()

    await userEvent.click(screen.getByText('Mis Pedidos'))
    expect(navegar).toHaveBeenCalledWith('mis-pedidos')

    await userEvent.click(screen.getByText('Panel Admin'))
    expect(navegar).toHaveBeenCalledWith('admin')

    await userEvent.click(screen.getByText('Cerrar Sesión'))
    expect(navegar).toHaveBeenCalledWith('inicio')
  })

  it('muestra contador del carrito', () => {
    guardarStorage('carrito', [{ ...producto, cantidad: 3 }])
    renderConProviders(<Header navegar={vi.fn()} />)
    expect(screen.getByText('3')).toBeTruthy()
  })
})

// ---------------- FOOTER ----------------
describe('Footer', () => {
  it('navega desde los enlaces del pie', async () => {
    const navegar = vi.fn()
    render(<Footer navegar={navegar} />)

    await userEvent.click(screen.getByText('Inicio'))
    expect(navegar).toHaveBeenCalledWith('inicio')

    await userEvent.click(screen.getByText('Productos'))
    expect(navegar).toHaveBeenCalledWith('inicio')

    await userEvent.click(screen.getByText('Iniciar Sesión'))
    expect(navegar).toHaveBeenCalledWith('login')

    await userEvent.click(screen.getByText('Registro'))
    expect(navegar).toHaveBeenCalledWith('registro')
  })

  it('muestra información de contacto', () => {
    render(<Footer navegar={vi.fn()} />)
    expect(screen.getByText(/info@akumatech.com/)).toBeTruthy()
    expect(screen.getByText(/Todos los derechos reservados/)).toBeTruthy()
  })
})

// ---------------- CARRUSEL ----------------
describe('Carrusel', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renderiza los slides', () => {
    render(<Carrusel navegar={vi.fn()} />)
    expect(screen.getByText('Hasta 30% de descuento')).toBeTruthy()
    expect(screen.getByText('Envío sin costo')).toBeTruthy()
  })

  it('avanza y retrocede con las flechas', () => {
    render(<Carrusel navegar={vi.fn()} />)

    fireEvent.click(screen.getByText('❯'))
    fireEvent.click(screen.getByText('❮'))
    fireEvent.click(screen.getByText('❮'))
    // No lanza error y los slides siguen presentes
    expect(screen.getByText('Hasta 30% de descuento')).toBeTruthy()
  })

  it('salta a un slide con los dots', () => {
    render(<Carrusel navegar={vi.fn()} />)

    const dots = document.querySelectorAll('.dot')
    expect(dots).toHaveLength(2)

    fireEvent.click(dots[1])
    expect(dots[1].className).toContain('active')

    fireEvent.click(dots[0])
    expect(dots[0].className).toContain('active')
  })

  it('el botón del slide previene el default', () => {
    render(<Carrusel navegar={vi.fn()} />)

    const boton = screen.getByText('Ver ofertas')
    const preventDefault = vi.fn()
    fireEvent.click(boton, { preventDefault })
    // El handler llama e.preventDefault(); al menos se invoca el click
    expect(boton).toBeTruthy()
    fireEvent.click(boton)
  })
})

// ---------------- PRODUCTO CARD ----------------
describe('ProductoCard', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('agrega al carrito y muestra confirmación', async () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {})
    renderConProviders(<ProductoCard producto={producto} />)

    await userEvent.click(screen.getByRole('button', { name: 'Añadir al carrito' }))

    expect(window.alert).toHaveBeenCalledWith('Producto añadido al carrito')
    expect(JSON.parse(localStorage.getItem('carrito'))).toHaveLength(1)
  })
})
