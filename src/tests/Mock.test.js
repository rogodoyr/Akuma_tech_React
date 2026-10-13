// =============================================
// MOCKING con Vitest
// Para hacer mocking necesitamos importar vi desde vitest
// =============================================
// vi.fn()  → crea una función simulada (puedes espiar si fue llamada)
// vi.mock()→ reemplaza un módulo completo

import { describe, it, expect, vi } from 'vitest'

describe('Mock de funciones', () => {
  it('emptyFunctionMock registra las llamadas', () => {
    const emptyFunctionMock = vi.fn()
    emptyFunctionMock()
    emptyFunctionMock()

    expect(emptyFunctionMock).toHaveBeenCalledTimes(2)
  })

  it('functionMock devuelve un valor simulado', () => {
    const functionMock = vi.fn(() => 'Hola mundo')
    const resultado = functionMock()

    expect(resultado).toBe('Hola mundo')
    expect(functionMock).toHaveBeenCalledTimes(1)
  })

  it('functionMock puede recibir argumentos', () => {
    const functionMock = vi.fn((a, b) => a + b)

    expect(functionMock(2, 3)).toBe(5)
    expect(functionMock).toHaveBeenCalledWith(2, 3)
  })
})

// Mock de un módulo completo (como en la guía: ../services/products)
// Así evitamos tocar localStorage real durante el test
vi.mock('../utils/storage', () => ({
  leerStorage: vi.fn(() => []),
  guardarStorage: vi.fn(),
  eliminarStorage: vi.fn(),
  crearAdminPorDefecto: vi.fn(),
  ADMIN_DEFECTO: { correo: 'admin@gmail.com', rol: 'admin' },
}))

// Importar DESPUÉS del vi.mock para obtener las versiones simuladas
import { leerStorage, guardarStorage } from '../utils/storage'

describe('Mock de un módulo completo', () => {
  it('leerStorage está simulado', () => {
    leerStorage.mockReturnValue([{ id: 1, nombre: 'Producto' }])

    const datos = leerStorage('productos', [])

    expect(datos).toHaveLength(1)
    expect(leerStorage).toHaveBeenCalledWith('productos', [])
  })

  it('guardarStorage está simulado (no escribe en localStorage)', () => {
    guardarStorage('carrito', [{ id: 1 }])

    expect(guardarStorage).toHaveBeenCalledTimes(1)
    // No se ejecutó el código real:
    expect(localStorage.getItem('carrito')).toBeNull()
  })
})

describe('Mock de fetch (para APIs)', () => {
  it('simula una respuesta exitosa', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ mensaje: 'hola' }),
      }),
    )

    const respuesta = await fetchMock('/api/productos')
    const datos = await respuesta.json()

    expect(fetchMock).toHaveBeenCalledWith('/api/productos')
    expect(datos.mensaje).toBe('hola')
  })

  it('simula un error de red', async () => {
    const fetchMock = vi.fn(() => Promise.reject(new Error('Sin conexión')))

    await expect(fetchMock('/api/productos')).rejects.toThrow('Sin conexión')
  })
})
