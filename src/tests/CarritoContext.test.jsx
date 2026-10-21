// =============================================
// Pruebas UNITARIAS de CarritoContext
// Cubren la lógica del carrito sin renderizar páginas
// =============================================

import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CarritoProvider, useCarrito } from '../context/CarritoContext'

function renderCarrito() {
  const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>
  return renderHook(() => useCarrito(), { wrapper })
}

describe('CarritoContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('agregarAlCarrito', () => {
    it('agrega un producto nuevo con cantidad 1', () => {
      const { result } = renderCarrito()

      let ok
      act(() => {
        ok = result.current.agregarAlCarrito(1)
      })

      expect(ok).toBe(true)
      expect(result.current.carrito).toHaveLength(1)
      expect(result.current.carrito[0]).toMatchObject({ id: 1, cantidad: 1 })
      expect(result.current.cantidadTotal).toBe(1)
    })

    it('incrementa cantidad si el producto ya está en el carrito', () => {
      const { result } = renderCarrito()

      act(() => {
        result.current.agregarAlCarrito(1)
        result.current.agregarAlCarrito(1)
      })

      expect(result.current.carrito).toHaveLength(1)
      expect(result.current.carrito[0].cantidad).toBe(2)
      expect(result.current.cantidadTotal).toBe(2)
    })

    it('devuelve false si el producto no existe', () => {
      const { result } = renderCarrito()

      let ok
      act(() => {
        ok = result.current.agregarAlCarrito(9999)
      })

      expect(ok).toBe(false)
      expect(result.current.carrito).toHaveLength(0)
    })
  })

  describe('aumentarCantidad', () => {
    it('suma 1 a la cantidad del producto', () => {
      const { result } = renderCarrito()

      act(() => {
        result.current.agregarAlCarrito(1)
      })
      act(() => {
        result.current.aumentarCantidad(1)
      })

      expect(result.current.carrito[0].cantidad).toBe(2)
    })
  })

  describe('disminuirCantidad', () => {
    it('resta 1 si la cantidad es mayor a 1', () => {
      const { result } = renderCarrito()

      act(() => {
        result.current.agregarAlCarrito(1)
        result.current.agregarAlCarrito(1)
      })
      act(() => {
        result.current.disminuirCantidad(1)
      })

      expect(result.current.carrito[0].cantidad).toBe(1)
    })

    it('elimina el producto si la cantidad llega a 0', () => {
      const { result } = renderCarrito()

      act(() => {
        result.current.agregarAlCarrito(1)
      })
      act(() => {
        result.current.disminuirCantidad(1)
      })

      expect(result.current.carrito).toHaveLength(0)
    })

    it('no hace nada si el producto no está en el carrito', () => {
      const { result } = renderCarrito()

      act(() => {
        result.current.agregarAlCarrito(1)
      })
      act(() => {
        result.current.disminuirCantidad(9999)
      })

      expect(result.current.carrito).toHaveLength(1)
      expect(result.current.carrito[0].cantidad).toBe(1)
    })
  })

  describe('eliminarDelCarrito', () => {
    it('quita el producto del carrito', () => {
      const { result } = renderCarrito()

      act(() => {
        result.current.agregarAlCarrito(1)
        result.current.agregarAlCarrito(2)
      })
      act(() => {
        result.current.eliminarDelCarrito(1)
      })

      expect(result.current.carrito).toHaveLength(1)
      expect(result.current.carrito[0].id).toBe(2)
    })
  })

  describe('vaciarCarrito', () => {
    it('deja el carrito vacío', () => {
      const { result } = renderCarrito()

      act(() => {
        result.current.agregarAlCarrito(1)
        result.current.agregarAlCarrito(2)
      })
      act(() => {
        result.current.vaciarCarrito()
      })

      expect(result.current.carrito).toHaveLength(0)
      expect(result.current.cantidadTotal).toBe(0)
      expect(result.current.subtotal).toBe(0)
    })
  })

  describe('subtotal y cantidadTotal', () => {
    it('calcula el subtotal sumando precio * cantidad', () => {
      const { result } = renderCarrito()

      // Producto 1: $39.990
      act(() => {
        result.current.agregarAlCarrito(1)
        result.current.agregarAlCarrito(1)
      })

      expect(result.current.subtotal).toBe(39990 * 2)
      expect(result.current.cantidadTotal).toBe(2)
    })
  })

  describe('aplicarDescuento', () => {
    it('rechaza código vacío', () => {
      const { result } = renderCarrito()

      let res
      act(() => {
        res = result.current.aplicarDescuento('   ')
      })

      expect(res.ok).toBe(false)
      expect(res.porcentaje).toBe(0)
      expect(res.mensaje).toMatch(/Ingresa un código/)
    })

    it('rechaza código inválido', () => {
      const { result } = renderCarrito()

      let res
      act(() => {
        res = result.current.aplicarDescuento('NOEXISTE')
      })

      expect(res.ok).toBe(false)
      expect(res.mensaje).toMatch(/no válido/)
    })

    it('aplica un código válido (case-insensitive)', () => {
      const { result } = renderCarrito()

      let res
      act(() => {
        res = result.current.aplicarDescuento('akuma10')
      })

      expect(res.ok).toBe(true)
      expect(res.porcentaje).toBe(10)
      expect(res.mensaje).toMatch(/10%/)
    })
  })

  describe('guardarProductos', () => {
    it('actualiza el catálogo y lo persiste en localStorage', () => {
      const { result } = renderCarrito()

      const lista = [
        { id: 100, nombre: 'Test', precio: 1000, imagen: '', descripcion: '' },
      ]

      act(() => {
        result.current.guardarProductos(lista)
      })

      expect(result.current.productos).toHaveLength(1)
      expect(result.current.productos[0].nombre).toBe('Test')
      expect(JSON.parse(localStorage.getItem('productos'))).toHaveLength(1)
    })
  })

  describe('useCarrito fuera de provider', () => {
    it('lanza error si no hay CarritoProvider', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
      expect(() => renderHook(() => useCarrito())).toThrow(
        /useCarrito debe usarse dentro de CarritoProvider/,
      )
      spy.mockRestore()
    })
  })
})
