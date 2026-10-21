// =============================================
// Pruebas UNITARIAS de storage.js
// =============================================

import { describe, it, expect, beforeEach } from 'vitest'
import {
  leerStorage,
  guardarStorage,
  eliminarStorage,
  crearAdminPorDefecto,
  ADMIN_DEFECTO,
} from '../utils/storage'

describe('storage helpers', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('leerStorage devuelve el valor por defecto si no existe', () => {
    expect(leerStorage('nope', 'fallback')).toBe('fallback')
  })

  it('guardarStorage y leerStorage son inversos', () => {
    guardarStorage('clave', { a: 1 })
    expect(leerStorage('clave', null)).toEqual({ a: 1 })
  })

  it('leerStorage devuelve el valor por defecto si el JSON es inválido', () => {
    localStorage.setItem('roto', '{no-json')
    expect(leerStorage('roto', 'fallback')).toBe('fallback')
  })

  it('eliminarStorage borra la clave', () => {
    guardarStorage('clave', 1)
    eliminarStorage('clave')
    expect(localStorage.getItem('clave')).toBeNull()
  })
})

describe('crearAdminPorDefecto', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('crea el admin si no hay ningún admin', () => {
    crearAdminPorDefecto()
    const usuarios = leerStorage('usuarios', [])
    expect(usuarios).toHaveLength(1)
    expect(usuarios[0]).toEqual(ADMIN_DEFECTO)
  })

  it('no duplica el admin si ya existe', () => {
    crearAdminPorDefecto()
    crearAdminPorDefecto()
    const usuarios = leerStorage('usuarios', [])
    expect(usuarios.filter((u) => u.rol === 'admin')).toHaveLength(1)
  })
})
