import { useState } from 'react'
import { useSesion } from '../context/SesionContext'
import {
  validarNombre,
  mensajeRut,
  validarCorreo,
  validarPassword,
  mensajeTelefono,
} from '../utils/validaciones'

// CRUD de usuarios (solo admin)
function AdminUsuarios({ navegar }) {
  const { usuarios, guardarUsuarios, sesion, esAdmin } = useSesion()

  const [formulario, setFormulario] = useState({
    correo: null,
    nombre: '',
    rut: '',
    correoNuevo: '',
    password: '',
    telefono: '',
    rol: 'usuario',
  })

  const [error, setError] = useState('')

  // Si no es admin, mostrar mensaje
  if (!sesion || !esAdmin()) {
    return (
      <main>
        <section className="admin-panel">
          <h1>Acceso restringido</h1>
          <p>Debes iniciar sesión como administrador.</p>
          <button
            type="button"
            onClick={function () {
              navegar('login')
            }}
          >
            Iniciar Sesión
          </button>
        </section>
      </main>
    )
  }

  function limpiarFormulario() {
    setFormulario({
      correo: null,
      nombre: '',
      rut: '',
      correoNuevo: '',
      password: '',
      telefono: '',
      rol: 'usuario',
    })
    setError('')
  }

  function manejarSubmit(event) {
    event.preventDefault()

    // Validar campos
    const errorNombre = validarNombre(formulario.nombre.trim())
    const errorRut = mensajeRut(formulario.rut.trim())
    const errorCorreo = validarCorreo(formulario.correoNuevo.trim())
    const errorPassword = validarPassword(formulario.password)
    const errorTelefono = mensajeTelefono(formulario.telefono.trim())

    const primerError =
      errorNombre || errorRut || errorCorreo || errorPassword || errorTelefono

    if (primerError) {
      setError(primerError)
      return
    }

    // Si estamos editando
    if (formulario.correo !== null) {
      const listaActualizada = usuarios.map(function (usuario) {
        if (usuario.correo === formulario.correo) {
          return {
            ...usuario,
            nombre: formulario.nombre.trim(),
            rut: formulario.rut.trim(),
            correo: formulario.correoNuevo.trim(),
            password: formulario.password,
            telefono: formulario.telefono.trim(),
            rol: formulario.rol,
          }
        }
        return usuario
      })

      guardarUsuarios(listaActualizada)
    } else {
      // Verificar que el correo no exista
      const correoExistente = usuarios.find(function (u) {
        return u.correo === formulario.correoNuevo.trim()
      })

      if (correoExistente) {
        setError('Este correo ya está registrado.')
        return
      }

      guardarUsuarios([
        ...usuarios,
        {
          nombre: formulario.nombre.trim(),
          rut: formulario.rut.trim(),
          correo: formulario.correoNuevo.trim(),
          password: formulario.password,
          telefono: formulario.telefono.trim(),
          rol: formulario.rol,
        },
      ])
    }

    limpiarFormulario()
  }

  function editarUsuario(correo) {
    const usuario = usuarios.find(function (u) {
      return u.correo === correo
    })

    if (usuario) {
      setFormulario({
        correo: usuario.correo,
        nombre: usuario.nombre,
        rut: usuario.rut,
        correoNuevo: usuario.correo,
        password: usuario.password,
        telefono: usuario.telefono,
        rol: usuario.rol || 'usuario',
      })
      setError('')
    }
  }

  function eliminarUsuario(correo) {
    // No permitir eliminar al admin por defecto ni a uno mismo
    if (correo === 'admin@gmail.com') {
      alert('No puedes eliminar al administrador por defecto.')
      return
    }

    if (correo === sesion.correo) {
      alert('No puedes eliminar tu propia cuenta.')
      return
    }

    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      guardarUsuarios(
        usuarios.filter(function (u) {
          return u.correo !== correo
        })
      )
    }
  }

  return (
    <main>
      <section className="admin-panel">
        <h1>Gestionar Usuarios</h1>

        <button
          type="button"
          onClick={function () {
            navegar('admin')
          }}
        >
          ← Volver al panel
        </button>

        {/* FORMULARIO */}
        <form onSubmit={manejarSubmit}>
          <h2>{formulario.correo !== null ? 'Editar usuario' : 'Nuevo usuario'}</h2>

          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={formulario.nombre}
            onChange={function (e) {
              setFormulario({ ...formulario, nombre: e.target.value })
            }}
            placeholder="Nombre completo"
          />

          <label htmlFor="rut">RUT:</label>
          <input
            type="text"
            id="rut"
            value={formulario.rut}
            onChange={function (e) {
              setFormulario({ ...formulario, rut: e.target.value })
            }}
            placeholder="12.345.678-9"
          />

          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            value={formulario.correoNuevo}
            onChange={function (e) {
              setFormulario({ ...formulario, correoNuevo: e.target.value })
            }}
            placeholder="usuario@gmail.com"
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={formulario.password}
            onChange={function (e) {
              setFormulario({ ...formulario, password: e.target.value })
            }}
            placeholder="4 a 10 caracteres"
          />

          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            value={formulario.telefono}
            onChange={function (e) {
              setFormulario({ ...formulario, telefono: e.target.value })
            }}
            placeholder="+569 12345678"
          />

          <label htmlFor="rol">Rol:</label>
          <select
            id="rol"
            value={formulario.rol}
            onChange={function (e) {
              setFormulario({ ...formulario, rol: e.target.value })
            }}
          >
            <option value="usuario">Usuario</option>
            <option value="admin">Administrador</option>
          </select>

          {error ? <p className="mensaje-error">{error}</p> : null}

          <button type="submit">{formulario.correo !== null ? 'Guardar cambios' : 'Agregar usuario'}</button>

          {formulario.correo !== null ? (
            <button type="button" onClick={limpiarFormulario}>
              Cancelar edición
            </button>
          ) : null}
        </form>

        {/* TABLA DE USUARIOS */}
        <h2>Lista de usuarios</h2>

        <table className="tabla-admin">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(function (usuario) {
              return (
                <tr key={usuario.correo}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.rol || 'usuario'}</td>
                  <td>
                    <button
                      type="button"
                      onClick={function () {
                        editarUsuario(usuario.correo)
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={function () {
                        eliminarUsuario(usuario.correo)
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default AdminUsuarios
