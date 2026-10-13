// Validaciones reutilizables (migradas desde registro.js / login.js)

// Dominios de correo permitidos
export const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com']

// Valida que el correo termine en un dominio permitido
export function validarCorreo(correo) {
  if (correo === '') {
    return 'El correo es obligatorio.'
  }
  if (correo.length > 100) {
    return 'El correo no puede superar los 100 caracteres.'
  }

  const correoValido = dominiosPermitidos.some(function (dominio) {
    return correo.endsWith(dominio)
  })

  if (!correoValido) {
    return 'Solo se permiten correos con formato @duoc.cl, @profesor.duoc.cl o @gmail.com.'
  }

  return ''
}

// Valida la contraseña (entre 4 y 10 caracteres)
export function validarPassword(password) {
  if (password === '') {
    return 'La contraseña es obligatoria.'
  }
  if (password.length < 4 || password.length > 10) {
    return 'La contraseña debe tener entre 4 y 10 caracteres.'
  }
  return ''
}

// Valida el nombre completo
export function validarNombre(nombre) {
  if (nombre === '') {
    return 'El nombre es obligatorio.'
  }
  if (nombre.length > 100) {
    return 'El nombre no puede superar los 100 caracteres.'
  }
  return ''
}

// Valida que las contraseñas coincidan
export function confirmarPassword(password, confirmar) {
  if (confirmar === '') {
    return 'Debe confirmar la contraseña.'
  }
  if (confirmar !== password) {
    return 'Las contraseñas no coinciden.'
  }
  return ''
}

// Valida RUT chileno con algoritmo módulo 11
export function validarRut(rut) {
  const rutLimpio = rut.replace(/\./g, '').replace('-', '')

  if (!/^\d{7,8}[0-9kK]$/.test(rutLimpio)) {
    return false
  }

  const cuerpo = rutLimpio.slice(0, -1)
  const dv = rutLimpio.slice(-1).toLowerCase()

  let suma = 0
  let multiplicador = 2

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplicador
    multiplicador++
    if (multiplicador > 7) {
      multiplicador = 2
    }
  }

  const resto = suma % 11
  const dvEsperado = 11 - resto

  let dvCalculado
  if (dvEsperado === 11) {
    dvCalculado = '0'
  } else if (dvEsperado === 10) {
    dvCalculado = 'k'
  } else {
    dvCalculado = String(dvEsperado)
  }

  return dv === dvCalculado
}

// Mensaje de error del RUT (vacío si es válido)
export function mensajeRut(rut) {
  if (rut === '') {
    return 'El RUT es obligatorio.'
  }
  if (!validarRut(rut)) {
    return 'El RUT no es válido. Use el formato: 12.345.678-9'
  }
  return ''
}

// Valida teléfono chileno
export function validarTelefono(telefono) {
  const telefonoLimpio = telefono.replace(/\s/g, '')

  const formatosValidos = [
    /^\+569\d{8}$/,
    /^\+56\d{9}$/,
    /^9\d{8}$/,
    /^\d{9}$/,
  ]

  return formatosValidos.some(function (formato) {
    return formato.test(telefonoLimpio)
  })
}

// Mensaje de error del teléfono (vacío si es válido)
export function mensajeTelefono(telefono) {
  if (telefono === '') {
    return 'El teléfono es obligatorio.'
  }
  if (!validarTelefono(telefono)) {
    return 'El teléfono no es válido. Use el formato: +569 12345678 o 9 12345678'
  }
  return ''
}

// Formatea un precio en pesos chilenos
export function formatearPrecio(precio) {
  return '$' + precio.toLocaleString('es-CL')
}
