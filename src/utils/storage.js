// Helpers para leer y escribir en localStorage
// En tests se puede hacer mock de localStorage

// Lee un valor JSON del localStorage
export function leerStorage(clave, valorPorDefecto) {
  try {
    const datos = localStorage.getItem(clave)
    if (datos === null) {
      return valorPorDefecto
    }
    return JSON.parse(datos)
  } catch {
    return valorPorDefecto
  }
}

// Guarda un valor JSON en localStorage
export function guardarStorage(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor))
}

// Elimina una clave del localStorage
export function eliminarStorage(clave) {
  localStorage.removeItem(clave)
}

// Usuario administrador por defecto
export const ADMIN_DEFECTO = {
  nombre: 'Administrador',
  rut: '11.111.111-1',
  correo: 'admin@gmail.com',
  telefono: '+569 99999999',
  password: 'admin123',
  rol: 'admin',
}

// Crea el admin por defecto si no existe ninguno
export function crearAdminPorDefecto() {
  const usuarios = leerStorage('usuarios', [])
  const adminExiste = usuarios.find(function (u) {
    return u.rol === 'admin'
  })

  if (!adminExiste) {
    usuarios.push(ADMIN_DEFECTO)
    guardarStorage('usuarios', usuarios)
  }
}
