import { formatearPrecio } from '../utils/validaciones'
import { useCarrito } from '../context/CarritoContext'

// Tarjeta de producto del catálogo
function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito()

  function manejarAgregar() {
    agregarAlCarrito(producto.id)
    alert('Producto añadido al carrito')
  }

  return (
    <div className="producto">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="imagen-producto"
        width="200"
        height="200"
      />

      <h3>{producto.nombre}</h3>

      <p>{producto.descripcion}</p>

      <p>
        <strong>{formatearPrecio(producto.precio)}</strong>
      </p>

      <button type="button">Ver producto</button>

      <button type="button" onClick={manejarAgregar}>
        Añadir al carrito
      </button>
    </div>
  )
}

export default ProductoCard
