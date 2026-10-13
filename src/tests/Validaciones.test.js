// =============================================
// Pruebas UNITARIAS de validaciones
// Prueban funciones puras sin renderizar componentes
// =============================================
// expect(valor).toBe(otro)     → compara con igualdad estricta
// expect(valor).toBeTruthy()   → es verdadero / existe
// expect(valor).toBeFalsy()    → es falso / no existe

import { describe, it, expect } from 'vitest'
import {
  validarCorreo,
  validarPassword,
  validarRut,
  formatearPrecio,
} from '../utils/validaciones'

describe('validarCorreo', () => {
  it('should return error if email is empty', () => {
    expect(validarCorreo('')).toBe('El correo es obligatorio.')
  })

  it('should return error if domain is not allowed', () => {
    const error = validarCorreo('ana@hotmail.com')
    expect(error).toBeTruthy()
  })

  it('should return empty string if email is valid', () => {
    expect(validarCorreo('ana@gmail.com')).toBe('')
    expect(validarCorreo('alumno@duoc.cl')).toBe('')
  })
})

describe('validarPassword', () => {
  it('should return error if password is empty', () => {
    expect(validarPassword('')).toBe('La contraseña es obligatoria.')
  })

  it('should return error if password is too short', () => {
    expect(validarPassword('ab')).toBeTruthy()
  })

  it('should return empty string if password is valid', () => {
    expect(validarPassword('abcd')).toBe('')
  })
})

describe('validarRut', () => {
  it('should return true for a valid RUT', () => {
    expect(validarRut('12.345.678-5')).toBe(true)
    expect(validarRut('11.111.111-1')).toBe(true)
  })

  it('should return false for an invalid RUT', () => {
    expect(validarRut('12.345.678-0')).toBe(false)
    expect(validarRut('no-es-rut')).toBe(false)
    expect(validarRut('')).toBe(false)
  })
})

describe('formatearPrecio', () => {
  it('should format price in CLP', () => {
    expect(formatearPrecio(39990)).toBe('$39.990')
    expect(formatearPrecio(1000)).toBe('$1.000')
  })
})
