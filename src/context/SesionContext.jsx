import { createContext, useContext, useEffect, useState } from 'react'
import {
  leerStorage,
  guardarStorage,
  eliminarStorage,
  crearAdminPorDefecto,
} from '../utils/storage'

// Contexto de sesión y usuarios
const SesionContext = createContext(null)

export function SesionProvider({ children }) {
  const [sesion, setSesion] = useState(function () {
    return leerStorage('sesionActiva', null)
  })

  const [usuarios, setUsuarios] = useState(function () {
    return leerStorage('usuarios', [])
  })

  // Al cargar: crear admin por defecto y recargar usuarios
  useEffect(function () {
    crearAdminPorDefecto()
    setUsuarios(leerStorage('usuarios', []))
  }, [])

  // Registrar un nuevo usuario
  function registrarUsuario(datos) {
    const lista = leerStorage('usuarios', [])

    const correoExistente = lista.find(function (u) {
      return u.correo === datos.correo
    })

    if (correoExistente) {
      return { ok: false, mensaje: 'Este correo ya está registrado.' }
    }

    const nuevoUsuario = {
      nombre: datos.nombre,
      rut: datos.rut,
      correo: datos.correo,
      password: datos.password,
      telefono: datos.telefono,
      rol: 'usuario',
    }

    lista.push(nuevoUsuario)
    guardarStorage('usuarios', lista)
    setUsuarios(lista)

    return { ok: true, mensaje: '¡Registro exitoso! Ahora puedes iniciar sesión.' }
  }

  // Iniciar sesión
  function iniciarSesion(correo, password) {
    const lista = leerStorage('usuarios', [])

    const usuarioEncontrado = lista.find(function (usuario) {
      return usuario.correo === correo && usuario.password === password
    })

    if (!usuarioEncontrado) {
      return { ok: false, mensaje: 'Correo o contraseña incorrectos.' }
    }

    const datosSesion = {
      nombre: usuarioEncontrado.nombre,
      correo: usuarioEncontrado.correo,
      rol: usuarioEncontrado.rol || 'usuario',
    }

    guardarStorage('sesionActiva', datosSesion)
    setSesion(datosSesion)

    return { ok: true, mensaje: '¡Inicio de sesión exitoso! Bienvenido ' + usuarioEncontrado.nombre }
  }

  // Cerrar sesión
  function cerrarSesion() {
    eliminarStorage('sesionActiva')
    setSesion(null)
  }

  // Verificar si es admin
  function esAdmin() {
    return sesion !== null && sesion.rol === 'admin'
  }

  // Actualizar lista de usuarios (para admin)
  function guardarUsuarios(lista) {
    guardarStorage('usuarios', lista)
    setUsuarios(lista)
  }

  const valor = {
    sesion: sesion,
    usuarios: usuarios,
    iniciarSesion: iniciarSesion,
    cerrarSesion: cerrarSesion,
    registrarUsuario: registrarUsuario,
    esAdmin: esAdmin,
    guardarUsuarios: guardarUsuarios,
  }

  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>
}

// Hook para usar la sesión desde cualquier componente
export function useSesion() {
  const contexto = useContext(SesionContext)
  if (!contexto) {
    throw new Error('useSesion debe usarse dentro de SesionProvider')
  }
  return contexto
}
