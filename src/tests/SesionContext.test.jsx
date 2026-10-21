// =============================================
// Pruebas UNITARIAS de SesionContext
// Cubren registro, login, logout y roles
// =============================================

import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { SesionProvider, useSesion } from '../context/SesionContext'

function renderSesion() {
  const wrapper = ({ children }) => <SesionProvider>{children}</SesionProvider>
  return renderHook(() => useSesion(), { wrapper })
}

const datosUsuario = {
  nombre: 'Ana Pérez',
  rut: '12.345.678-5',
  correo: 'ana@gmail.com',
  password: 'abcd',
  telefono: '+569 12345678',
}

describe('SesionContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('registrarUsuario', () => {
    it('registra un usuario nuevo con rol usuario', () => {
      const { result } = renderSesion()

      let res
      act(() => {
        res = result.current.registrarUsuario(datosUsuario)
      })

      expect(res.ok).toBe(true)
      // Incluye el admin por defecto que crea el provider al montar
      expect(result.current.usuarios).toHaveLength(2)
      expect(result.current.usuarios.find((u) => u.correo === 'ana@gmail.com')).toMatchObject({
        correo: 'ana@gmail.com',
        rol: 'usuario',
      })
    })

    it('rechaza correo ya registrado', () => {
      const { result } = renderSesion()

      act(() => {
        result.current.registrarUsuario(datosUsuario)
      })

      let res
      act(() => {
        res = result.current.registrarUsuario(datosUsuario)
      })

      expect(res.ok).toBe(false)
      expect(res.mensaje).toMatch(/ya está registrado/)
    })
  })

  describe('iniciarSesion', () => {
    it('inicia sesión con credenciales válidas', () => {
      const { result } = renderSesion()

      act(() => {
        result.current.registrarUsuario(datosUsuario)
      })

      let res
      act(() => {
        res = result.current.iniciarSesion('ana@gmail.com', 'abcd')
      })

      expect(res.ok).toBe(true)
      expect(result.current.sesion).toMatchObject({
        nombre: 'Ana Pérez',
        correo: 'ana@gmail.com',
        rol: 'usuario',
      })
    })

    it('rechaza credenciales incorrectas', () => {
      const { result } = renderSesion()

      let res
      act(() => {
        res = result.current.iniciarSesion('nadie@gmail.com', 'xxxx')
      })

      expect(res.ok).toBe(false)
      expect(result.current.sesion).toBeNull()
    })
  })

  describe('cerrarSesion', () => {
    it('limpia la sesión activa', () => {
      const { result } = renderSesion()

      act(() => {
        result.current.registrarUsuario(datosUsuario)
        result.current.iniciarSesion('ana@gmail.com', 'abcd')
      })
      act(() => {
        result.current.cerrarSesion()
      })

      expect(result.current.sesion).toBeNull()
      expect(localStorage.getItem('sesionActiva')).toBeNull()
    })
  })

  describe('esAdmin', () => {
    it('devuelve false sin sesión', () => {
      const { result } = renderSesion()

      let esAdmin
      act(() => {
        esAdmin = result.current.esAdmin()
      })

      expect(esAdmin).toBe(false)
    })

    it('devuelve false para un usuario normal', () => {
      const { result } = renderSesion()

      act(() => {
        result.current.registrarUsuario(datosUsuario)
        result.current.iniciarSesion('ana@gmail.com', 'abcd')
      })

      let esAdmin
      act(() => {
        esAdmin = result.current.esAdmin()
      })

      expect(esAdmin).toBe(false)
    })

    it('devuelve true para el admin por defecto', () => {
      const { result } = renderSesion()

      // El provider crea admin@gmail.com / admin123 al montar
      let res
      act(() => {
        res = result.current.iniciarSesion('admin@gmail.com', 'admin123')
      })
      expect(res.ok).toBe(true)

      let esAdmin
      act(() => {
        esAdmin = result.current.esAdmin()
      })

      expect(esAdmin).toBe(true)
    })
  })

  describe('guardarUsuarios', () => {
    it('actualiza la lista y la persiste', () => {
      const { result } = renderSesion()

      const lista = [
        { nombre: 'X', correo: 'x@gmail.com', password: 'abcd', rol: 'usuario' },
      ]

      act(() => {
        result.current.guardarUsuarios(lista)
      })

      expect(result.current.usuarios).toHaveLength(1)
      expect(JSON.parse(localStorage.getItem('usuarios'))).toHaveLength(1)
    })
  })

  describe('useSesion fuera de provider', () => {
    it('lanza error si no hay SesionProvider', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
      expect(() => renderHook(() => useSesion())).toThrow(
        /useSesion debe usarse dentro de SesionProvider/,
      )
      spy.mockRestore()
    })
  })
})
