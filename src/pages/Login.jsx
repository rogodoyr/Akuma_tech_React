import { useState } from 'react'
import { useSesion } from '../context/SesionContext'
import { validarCorreo, validarPassword } from '../utils/validaciones'

// Página de inicio de sesión
function Login({ navegar }) {
  const { iniciarSesion } = useSesion()

  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [errorCorreo, setErrorCorreo] = useState('')
  const [errorPassword, setErrorPassword] = useState('')

  function manejarSubmit(event) {
    event.preventDefault()

    // Limpiar mensajes anteriores
    setErrorCorreo('')
    setErrorPassword('')

    // Validar campos
    const errorCorreoTexto = validarCorreo(correo.trim())
    const errorPasswordTexto = validarPassword(password)

    if (errorCorreoTexto) {
      setErrorCorreo(errorCorreoTexto)
    }
    if (errorPasswordTexto) {
      setErrorPassword(errorPasswordTexto)
    }

    if (errorCorreoTexto || errorPasswordTexto) {
      return
    }

    // Intentar iniciar sesión
    const resultado = iniciarSesion(correo.trim(), password)

    if (resultado.ok) {
      alert(resultado.mensaje)
      navegar('inicio')
    } else {
      setErrorCorreo(resultado.mensaje)
      setErrorPassword(resultado.mensaje)
    }
  }

  return (
    <main>
      <section className="login">
        <h1>Iniciar Sesión</h1>

        <form id="login-form" onSubmit={manejarSubmit}>
          {/* CORREO */}
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            maxLength={100}
            required
            placeholder="Ingresa tu correo"
            value={correo}
            onChange={function (e) {
              setCorreo(e.target.value)
            }}
          />
          <p id="error-correo" className="mensaje-error">
            {errorCorreo}
          </p>

          {/* CONTRASEÑA */}
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            minLength={4}
            maxLength={10}
            required
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={function (e) {
              setPassword(e.target.value)
            }}
          />
          <p id="error-password" className="mensaje-error">
            {errorPassword}
          </p>

          <button type="submit">Iniciar Sesión</button>
        </form>
      </section>
    </main>
  )
}

export default Login
