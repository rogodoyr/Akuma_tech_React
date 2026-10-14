import Carrusel from '../components/Carrusel'
import ProductoCard from '../components/ProductoCard'
import { useCarrito } from '../context/CarritoContext'

// Página de inicio: carrusel + productos destacados
function Inicio() {
  const { productos } = useCarrito()

  return (
    <main>
      {/* CARRUSEL DE OFERTAS */}
      <Carrusel />

      {/* PRODUCTOS DESTACADOS */}
      <section className="productos-destacados" id="productos">
        
        <h2><strong>Productos Destacados</strong></h2>

        <div className="contenedor-productos">
          {productos.map(function (producto) {
            return <ProductoCard key={producto.id} producto={producto} />
          })}
        </div>
      </section>
    </main>
  )
}

export default Inicio
