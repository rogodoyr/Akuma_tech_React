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
  validarNombre,
  confirmarPassword,
  mensajeRut,
  validarTelefono,
  mensajeTelefono,
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

describe('validarNombre', () => {
  it('should return error if name is empty', () => {
    expect(validarNombre('')).toBe('El nombre es obligatorio.')
  })

  it('should return error if name is too long', () => {
    expect(validarNombre('a'.repeat(101))).toBeTruthy()
  })

  it('should return empty string if name is valid', () => {
    expect(validarNombre('Ana Pérez')).toBe('')
  })
})

describe('confirmarPassword', () => {
  it('should return error if confirmation is empty', () => {
    expect(confirmarPassword('abcd', '')).toBe('Debe confirmar la contraseña.')
  })

  it('should return error if passwords do not match', () => {
    expect(confirmarPassword('abcd', 'abce')).toBe('Las contraseñas no coinciden.')
  })

  it('should return empty string if passwords match', () => {
    expect(confirmarPassword('abcd', 'abcd')).toBe('')
  })
})

describe('mensajeRut', () => {
  it('should return error if RUT is empty', () => {
    expect(mensajeRut('')).toBe('El RUT es obligatorio.')
  })

  it('should return error if RUT is invalid', () => {
    expect(mensajeRut('12.345.678-0')).toMatch(/no es válido/)
  })

  it('should return empty string if RUT is valid', () => {
    expect(mensajeRut('12.345.678-5')).toBe('')
  })
})

describe('validarTelefono', () => {
  it('should accept valid Chilean phone formats', () => {
    expect(validarTelefono('+569 12345678')).toBe(true)
    expect(validarTelefono('+56912345678')).toBe(true)
    expect(validarTelefono('9 12345678')).toBe(true)
    expect(validarTelefono('912345678')).toBe(true)
    expect(validarTelefono('123456789')).toBe(true)
  })

  it('should reject invalid phone formats', () => {
    expect(validarTelefono('123')).toBe(false)
    expect(validarTelefono('abc')).toBe(false)
  })
})

describe('mensajeTelefono', () => {
  it('should return error if phone is empty', () => {
    expect(mensajeTelefono('')).toBe('El teléfono es obligatorio.')
  })

  it('should return error if phone is invalid', () => {
    expect(mensajeTelefono('123')).toMatch(/no es válido/)
  })

  it('should return empty string if phone is valid', () => {
    expect(mensajeTelefono('+569 12345678')).toBe('')
  })
})
