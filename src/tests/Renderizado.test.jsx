// =============================================
// Pruebas de RENDERIZADO
// Verifica que el componente muestre lo esperado
// =============================================
// get...  → obtiene un elemento o FALLA si no lo encuentra
// find... → busca de forma asíncrona (espera a que aparezca)
// query...→ devuelve null si no lo encuentra (no falla)

import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProductoCard from '../components/ProductoCard'
import Footer from '../components/Footer'
import { CarritoProvider } from '../context/CarritoContext'

// Producto de prueba
const producto = {
  id: 1,
  nombre: 'Mouse Gamer',
  precio: 29990,
  imagen: 'https://ejemplo.com/mouse.png',
  descripcion: 'Mouse de prueba',
}

// El componente usa useCarrito, por eso envolvemos con el Provider
function renderProducto() {
  return render(
    <CarritoProvider>
      <ProductoCard producto={producto} />
    </CarritoProvider>,
  )
}

describe('ProductoCard Component', () => {
  it('should render text', () => {
    const { getByText } = renderProducto()

    expect(getByText('Mouse Gamer')).toBeTruthy()
    expect(getByText('Mouse de prueba')).toBeTruthy()
    expect(getByText('$29.990')).toBeTruthy()
  })

  it('should render button', () => {
    const { getByRole } = renderProducto()

    expect(getByRole('button', { name: 'Añadir al carrito' })).toBeTruthy()
  })

  it('should render image with alt', () => {
    const { getByAltText } = renderProducto()

    expect(getByAltText('Mouse Gamer')).toBeTruthy()
  })

  it('queryByText returns null if text does not exist', () => {
    const { queryByText } = renderProducto()

    // query... NO falla: devuelve null si no encuentra
    expect(queryByText('Texto que no existe')).toBeNull()
  })
})

describe('Footer Component', () => {
  it('should render contact info', () => {
    const { getByText } = render(<Footer navegar={() => {}} />)

    expect(getByText('Nosotros')).toBeTruthy()
    expect(getByText('Contacto')).toBeTruthy()
    // El texto incluye el emoji 📧, por eso usamos un string parcial
    expect(getByText(/info@akumatech.com/)).toBeTruthy()
  })
})
