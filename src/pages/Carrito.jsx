import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'
import { useSesion } from '../context/SesionContext'
import { formatearPrecio } from '../utils/validaciones'
import { opcionesEnvio } from '../data/productos'

// Página del carrito de compras
function Carrito({ navegar }) {
  const {
    carrito,
    subtotal,
    cantidadTotal,
    aumentarCantidad,
    disminuirCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    aplicarDescuento,
  } = useCarrito()

  const { sesion } = useSesion()

  const [envio, setEnvio] = useState('gratis')
  const [codigoDescuento, setCodigoDescuento] = useState('')
  const [descuento, setDescuento] = useState(0)
  const [mensajeDescuento, setMensajeDescuento] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [numeroPedido, setNumeroPedido] = useState('')

  // Buscar costo del envío seleccionado
  const opcionEnvio = opcionesEnvio.find(function (opcion) {
    return opcion.id === envio
  })
  const costoEnvio = opcionEnvio ? opcionEnvio.precio : 0

  const total = subtotal + costoEnvio - descuento

  function manejarDescuento() {
    const resultado = aplicarDescuento(codigoDescuento)

    setMensajeDescuento(resultado.mensaje)
    setTipoMensaje(resultado.ok ? 'exito' : 'error')

    if (resultado.ok) {
      setDescuento(Math.round((subtotal * resultado.porcentaje) / 100))
    } else {
      setDescuento(0)
    }
  }

  function manejarVaciar() {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
      vaciarCarrito()
    }
  }

  function manejarPago() {
    if (carrito.length === 0) {
      alert('El carrito está vacío')
      return
    }

    if (!sesion) {
      alert('Debes iniciar sesión para realizar la compra')
      navegar('login')
      return
    }

    // Generar número de pedido
    const numero = 'AK-' + Date.now().toString().slice(-8)
    setNumeroPedido(numero)
    setModalAbierto(true)

    // Limpiar carrito después del pago
    vaciarCarrito()
    setDescuento(0)
    setCodigoDescuento('')
    setMensajeDescuento('')
    setEnvio('gratis')
  }

  // Carrito vacío
  if (carrito.length === 0) {
    return (
      <main>
        <section className="carrito-page">
          <h1>Mi Carrito</h1>

          <div className="carrito-vacio">
            <div className="carrito-vacio-icono">🛒</div>
            <h2>Tu carrito está vacío</h2>
            <p>¿No sabes qué comprar? ¡Mira nuestros productos destacados!</p>
            <button
              type="button"
              className="btn-primary"
              onClick={function () {
                navegar('inicio')
              }}
            >
              Ver productos
            </button>
          </div>
        </section>

        {modalAbierto ? (
          <div className="modal" style={{ display: 'flex' }}>
            <div className="modal-contenido">
              <h2>¡Compra realizada!</h2>
              <p>
                Tu número de pedido es: <strong>{numeroPedido}</strong>
              </p>
              <button
                type="button"
                onClick={function () {
                  setModalAbierto(false)
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : null}
      </main>
    )
  }

  return (
    <main>
      <section className="carrito-page">
        <h1>Mi Carrito</h1>

        <div className="carrito-layout">
          {/* PRODUCTOS DEL CARRITO */}
          <div className="carrito-productos">
            <div id="contenedor-carrito">
              {carrito.map(function (producto) {
                const subtotalProducto = producto.precio * producto.cantidad

                return (
                  <div className="producto-carrito" key={producto.id}>
                    <img src={producto.imagen} alt={producto.nombre} width="120" height="120" />

                    <div>
                      <h3>{producto.nombre}</h3>
                      <p>Precio: {formatearPrecio(producto.precio)}</p>
                      <p>Cantidad: {producto.cantidad}</p>
                      <p>Subtotal: {formatearPrecio(subtotalProducto)}</p>

                      <button
                        type="button"
                        onClick={function () {
                          disminuirCantidad(producto.id)
                        }}
                      >
                        -
                      </button>

                      <button
                        type="button"
                        onClick={function () {
                          aumentarCantidad(producto.id)
                        }}
                      >
                        +
                      </button>

                      <button
                        type="button"
                        onClick={function () {
                          eliminarDelCarrito(producto.id)
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="carrito-acciones">
              <button
                type="button"
                className="btn-seguir-comprando"
                onClick={function () {
                  navegar('inicio')
                }}
              >
                ← Seguir comprando
              </button>

              <button type="button" className="btn-vaciar-carrito" onClick={manejarVaciar}>
                Vaciar carrito
              </button>
            </div>
          </div>

          {/* RESUMEN DE COMPRA */}
          <div className="carrito-resumen">
            <h2>Resumen de compra</h2>

            <div className="resumen-detalle">
              <div className="resumen-linea">
                <span>
                  Subtotal (<span id="cantidad-items">{cantidadTotal}</span> productos)
                </span>
                <span id="subtotal-carrito">{formatearPrecio(subtotal)}</span>
              </div>

              <div className="resumen-linea">
                <span>Envío</span>
                <span id="costo-envio">
                  {costoEnvio === 0 ? 'Gratis' : formatearPrecio(costoEnvio)}
                </span>
              </div>

              {descuento > 0 ? (
                <div className="resumen-linea resumen-descuento">
                  <span>Descuento</span>
                  <span id="descuento-carrito">-{formatearPrecio(descuento)}</span>
                </div>
              ) : null}

              <div className="resumen-separador"></div>

              <div className="resumen-linea resumen-total">
                <span>Total</span>
                <span id="total-carrito">{formatearPrecio(Math.max(total, 0))}</span>
              </div>
            </div>

            {/* CÓDIGO DE DESCUENTO */}
            <div className="codigo-descuento">
              <input
                type="text"
                id="codigo-descuento-input"
                placeholder="Código de descuento"
                value={codigoDescuento}
                onChange={function (e) {
                  setCodigoDescuento(e.target.value)
                }}
              />
              <button type="button" onClick={manejarDescuento}>
                Aplicar
              </button>
            </div>

            <p id="mensaje-descuento" className={'mensaje-descuento ' + tipoMensaje}>
              {mensajeDescuento}
            </p>

            {/* OPCIONES DE ENVÍO */}
            <div className="envio-opciones">
              {opcionesEnvio.map(function (opcion) {
                return (
                  <label className="envio-opcion" key={opcion.id}>
                    <input
                      type="radio"
                      name="envio"
                      value={opcion.id}
                      checked={envio === opcion.id}
                      onChange={function () {
                        setEnvio(opcion.id)
                      }}
                    />
                    <span className="envio-info">
                      <strong>{opcion.nombre}</strong>
                      <small>
                        {opcion.detalle} —{' '}
                        {opcion.precio === 0 ? 'Gratis' : formatearPrecio(opcion.precio)}
                      </small>
                    </span>
                  </label>
                )
              })}
            </div>

            {/* MÉTODO DE PAGO */}
            <div className="pago-opciones">
              <label className="pago-opcion">
                <input type="radio" name="pago" value="tarjeta" defaultChecked />
                <span className="pago-info">
                  <span className="pago-icono">💳</span>
                  Tarjeta de crédito
                </span>
              </label>

              <label className="pago-opcion">
                <input type="radio" name="pago" value="transferencia" />
                <span className="pago-info">
                  <span className="pago-icono">🏦</span>
                  Transferencia bancaria
                </span>
              </label>
            </div>

            <button type="button" className="btn-pagar" onClick={manejarPago}>
              <span className="btn-pagar-texto">Ir a pagar</span>
              <span className="btn-pagar-total" id="btn-total">
                {formatearPrecio(Math.max(total, 0))}
              </span>
            </button>

            <p className="pago-seguro">🔒 Pago seguro garantizado</p>
          </div>
        </div>
      </section>

      {/* MODAL DE CONFIRMACIÓN */}
      {modalAbierto ? (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-contenido">
            <h2>¡Compra realizada!</h2>
            <p>
              Tu número de pedido es: <strong id="numero-pedido">{numeroPedido}</strong>
            </p>
            <button
              type="button"
              onClick={function () {
                setModalAbierto(false)
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      ) : null}
    </main>
  )
}

export default Carrito
