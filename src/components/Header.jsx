import { useSesion } from '../context/SesionContext'
import { useCarrito } from '../context/CarritoContext'


// Encabezado con logo, navegación y contador del carrito
function Header({ navegar }) {
  const { sesion, cerrarSesion, esAdmin } = useSesion()
  const { cantidadTotal } = useCarrito()

  function manejarCerrarSesion() {
    cerrarSesion()
    navegar('inicio')
  }

  return (
    <header>
      <nav>
        {/* LOGO CON VIDEO */}
        <div className="logo-container">
          <span className="logo-text neon-glow">Akuma</span>
          <a
            href="#"
            className="logo-video-link"
            aria-label="Ir al inicio de AkumaTech"
            onClick={function (e) {
              e.preventDefault()
              navegar('inicio')
            }}
          >
            <video className="logo-video" autoPlay loop muted playsInline>
              <source src="/img/cara akuma.webm" type="video/webm" />
            </video>
          </a>
          <span className="logo-text neon-glow">Tech</span>
        </div>

        {/* MENU DE NAVEGACION */}
        <ul>
          <li>
            <a
              href="#"
              onClick={function (e) {
                e.preventDefault()
                navegar('inicio')
              }}
            >
              <strong>Inicio</strong>
            </a>
          </li>

          <li>
            <a
              href="#"
              onClick={function (e) {
                e.preventDefault()
                navegar('inicio')
                setTimeout(function () {
                  const seccion = document.getElementById('productos')
                  if (seccion) {
                    seccion.scrollIntoView({ behavior: 'smooth' })
                  }
                }, 100)
              }}
            >
              <strong>Productos</strong>
            </a>
          </li>

          {sesion ? (
            <>
              <li>
                <a href="#">
                  <strong>👤 {sesion.nombre}</strong>
                </a>
              </li>

              {esAdmin() ? (
                <li>
                  <a
                    href="#"
                    onClick={function (e) {
                      e.preventDefault()
                      navegar('admin')
                    }}
                  >
                    <strong>Panel Admin</strong>
                  </a>
                </li>
              ) : null}

              <li>
                <a href="#" onClick={manejarCerrarSesion}>
                  <strong>Cerrar Sesión</strong>
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a
                  href="#"
                  onClick={function (e) {
                    e.preventDefault()
                    navegar('login')
                  }}
                >
                  <strong>Iniciar Sesión</strong>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={function (e) {
                    e.preventDefault()
                    navegar('registro')
                  }}
                >
                  <strong>Registro</strong>
                </a>
              </li>
            </>
          )}

          {/* CARRITO */}
          <li>
            <a
              href="#"
              className="enlace-carrito"
              onClick={function (e) {
                e.preventDefault()
                navegar('carrito')
              }}
            >
              🛒<strong>Carrito</strong>
              <span id="cantidad-carrito">{cantidadTotal}</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
