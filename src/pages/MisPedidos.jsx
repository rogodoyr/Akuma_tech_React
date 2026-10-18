import { useState, useEffect } from 'react'
import { useSesion } from '../context/SesionContext'
import { formatearPrecio } from '../utils/validaciones' // Reutilizamos tu función para los precios

function MisPedidos({ navegar }) {
  const { sesion } = useSesion()
  const [misPedidos, setMisPedidos] = useState([])

  // Cargar los pedidos del usuario al entrar a la página
  useEffect(() => {
    if (sesion) {
      const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos_akuma')) || []
      // Filtramos para mostrar solo los pedidos del usuario actual
      const pedidosDelUsuario = pedidosGuardados.filter(
        (pedido) => pedido.usuarioCorreo === sesion.correo
      )
      // Los invertimos para que los más nuevos salgan arriba
      setMisPedidos(pedidosDelUsuario.reverse())
    }
  }, [sesion])

  // Si el usuario no ha iniciado sesión, mostrar acceso denegado
  if (!sesion) {
    return (
      <main>
        <section className="admin-panel">
          <h1>Acceso denegado</h1>
          <p>Debes iniciar sesión para ver tus pedidos.</p>
          <button type="button" onClick={() => navegar('login')}>
            Iniciar Sesión
          </button>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section className="carrito-page">
        <h1>Mis Pedidos</h1>
        
        {misPedidos.length === 0 ? (
          <div className="carrito-vacio" style={{ marginTop: '2rem' }}>
            <div className="carrito-vacio-icono">📦</div>
            <h2>Aún no tienes pedidos registrados en tu historial.</h2>
            <p>Tus futuras compras aparecerán aquí.</p>
            <button type="button" className="btn-primary" onClick={() => navegar('inicio')}>
              Ir a comprar
            </button>
          </div>
        ) : (
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {misPedidos.map((pedido) => (
              <div key={pedido.id} style={{ border: '1px solid #333', padding: '1.5rem', borderRadius: '8px', backgroundColor: '#111' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #444', paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, color: '#e50914' }}>Pedido: {pedido.id}</h3>
                  <span style={{ color: '#aaa' }}>Fecha: {pedido.fecha}</span>
                </div>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  {pedido.productos.map((producto, index) => (
                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
                      <span>{producto.cantidad}x {producto.nombre}</span>
                      <span>{formatearPrecio(producto.precio * producto.cantidad)}</span>
                    </li>
                  ))}
                </ul>
                
                <div style={{ textAlign: 'right', fontSize: '1.2rem' }}>
                  <strong>Total pagado: {formatearPrecio(pedido.total)}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default MisPedidos