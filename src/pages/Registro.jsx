import { useState } from 'react'
import { useSesion } from '../context/SesionContext'
import {
  validarNombre,
  mensajeRut,
  validarCorreo,
  validarPassword,
  confirmarPassword,
  mensajeTelefono,
} from '../utils/validaciones'

// Página de registro de usuarios
function Registro({ navegar }) {
  const { registrarUsuario } = useSesion()

  const [nombre, setNombre] = useState('')
  const [rut, setRut] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [telefono, setTelefono] = useState('')

  const [errores, setErrores] = useState({
    nombre: '',
    rut: '',
    correo: '',
    password: '',
    confirmar: '',
    telefono: '',
  })

  function manejarSubmit(event) {
    event.preventDefault()

    // Validar todos los campos
    const nuevosErrores = {
      nombre: validarNombre(nombre.trim()),
      rut: mensajeRut(rut.trim()),
      correo: validarCorreo(correo.trim()),
      password: validarPassword(password),
      confirmar: confirmarPassword(password, confirmar),
      telefono: mensajeTelefono(telefono.trim()),
    }

    setErrores(nuevosErrores)

    const hayErrores = Object.values(nuevosErrores).some(function (error) {
      return error !== ''
    })

    if (hayErrores) {
      return
    }

    // Registrar usuario
    const resultado = registrarUsuario({
      nombre: nombre.trim(),
      rut: rut.trim(),
      correo: correo.trim(),
      password: password,
      telefono: telefono.trim(),
    })

    if (resultado.ok) {
      alert(resultado.mensaje)
      navegar('login')
    } else {
      setErrores({ ...nuevosErrores, correo: resultado.mensaje })
    }
  }

  return (
    <main>
      <section className="login">
        <h1>Crear Cuenta</h1>

        <form id="registro-form" onSubmit={manejarSubmit}>
          {/* NOMBRE */}
          <label htmlFor="nombre">Nombre completo:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            maxLength={100}
            required
            placeholder="Ingresa tu nombre completo"
            value={nombre}
            onChange={function (e) {
              setNombre(e.target.value)
            }}
          />
          <p id="error-nombre" className="mensaje-error">
            {errores.nombre}
          </p>

          {/* RUT */}
          <label htmlFor="rut">RUT:</label>
          <input
            type="text"
            id="rut"
            name="rut"
            required
            placeholder="Ejemplo: 12.345.678-9"
            value={rut}
            onChange={function (e) {
              setRut(e.target.value)
            }}
          />
          <p id="error-rut" className="mensaje-error">
            {errores.rut}
          </p>

          {/* CORREO */}
          <label htmlFor="correo">Correo electrónico:</label>
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
            {errores.correo}
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
            {errores.password}
          </p>

          {/* CONFIRMAR CONTRASEÑA */}
          <label htmlFor="confirmar-password">Confirmar contraseña:</label>
          <input
            type="password"
            id="confirmar-password"
            name="confirmar-password"
            minLength={4}
            maxLength={10}
            required
            placeholder="Confirma tu contraseña"
            value={confirmar}
            onChange={function (e) {
              setConfirmar(e.target.value)
            }}
          />
          <p id="error-confirmar-password" className="mensaje-error">
            {errores.confirmar}
          </p>

          {/* TELÉFONO */}
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            required
            placeholder="+569 12345678"
            value={telefono}
            onChange={function (e) {
              setTelefono(e.target.value)
            }}
          />
          <p id="error-telefono" className="mensaje-error">
            {errores.telefono}
          </p>

          <button type="submit">Crear Cuenta</button>
        </form>
      </section>
    </main>
  )
}

export default Registro
