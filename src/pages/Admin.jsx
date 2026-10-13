import { useCarrito } from '../context/CarritoContext'
import { useSesion } from '../context/SesionContext'

// Panel principal de administración
function Admin({ navegar }) {
  const { productos, carrito } = useCarrito()
  const { usuarios, sesion, cerrarSesion, esAdmin } = useSesion()

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

  function manejarCerrarSesion() {
    cerrarSesion()
    navegar('inicio')
  }

  return (
    <main>
      <section className="admin-panel">
        <h1>Panel de Administración</h1>

        {/* ESTADÍSTICAS */}
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Usuarios registrados</h3>
            <p id="total-usuarios" className="stat-number">
              {usuarios.length}
            </p>
          </div>

          <div className="stat-card">
            <h3>Productos</h3>
            <p id="total-productos" className="stat-number">
              {productos.length}
            </p>
          </div>

          <div className="stat-card">
            <h3>Items en carrito</h3>
            <p id="total-carritos" className="stat-number">
              {carrito.length}
            </p>
          </div>
        </div>

        {/* ACCIONES RÁPIDAS */}
        <div className="admin-acciones">
          <h2>Acciones Rápidas</h2>

          <div className="acciones-grid">
            <button
              type="button"
              className="accion-card"
              onClick={function () {
                navegar('admin-usuarios')
              }}
            >
              👥 Gestionar Usuarios
            </button>

            <button
              type="button"
              className="accion-card"
              onClick={function () {
                navegar('admin-productos')
              }}
            >
              📦 Gestionar Productos
            </button>

            <button
              type="button"
              className="accion-card"
              onClick={function () {
                navegar('inicio')
              }}
            >
              🏠 Volver a la Tienda
            </button>

            <button type="button" className="accion-card" onClick={manejarCerrarSesion}>
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Admin
