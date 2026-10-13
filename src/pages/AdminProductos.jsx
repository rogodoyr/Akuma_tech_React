import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'
import { useSesion } from '../context/SesionContext'
import { formatearPrecio } from '../utils/validaciones'

// CRUD de productos (solo admin)
function AdminProductos({ navegar }) {
  const { productos, guardarProductos } = useCarrito()
  const { sesion, esAdmin } = useSesion()

  const [formulario, setFormulario] = useState({
    id: null,
    nombre: '',
    precio: '',
    imagen: '',
    descripcion: '',
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
    setFormulario({ id: null, nombre: '', precio: '', imagen: '', descripcion: '' })
    setError('')
  }

  function manejarSubmit(event) {
    event.preventDefault()

    // Validaciones básicas
    if (formulario.nombre.trim() === '') {
      setError('El nombre es obligatorio.')
      return
    }

    const precio = parseInt(formulario.precio)
    if (isNaN(precio) || precio <= 0) {
      setError('El precio debe ser un número mayor a 0.')
      return
    }

    if (formulario.imagen.trim() === '') {
      setError('La imagen es obligatoria.')
      return
    }

    // Si estamos editando
    if (formulario.id !== null) {
      const listaActualizada = productos.map(function (producto) {
        if (producto.id === formulario.id) {
          return {
            ...producto,
            nombre: formulario.nombre.trim(),
            precio: precio,
            imagen: formulario.imagen.trim(),
            descripcion: formulario.descripcion.trim(),
          }
        }
        return producto
      })

      guardarProductos(listaActualizada)
    } else {
      // Producto nuevo
      const nuevoId =
        productos.length > 0
          ? Math.max.apply(
              null,
              productos.map(function (p) {
                return p.id
              })
            ) + 1
          : 1

      guardarProductos([
        ...productos,
        {
          id: nuevoId,
          nombre: formulario.nombre.trim(),
          precio: precio,
          imagen: formulario.imagen.trim(),
          descripcion: formulario.descripcion.trim(),
        },
      ])
    }

    limpiarFormulario()
  }

  function editarProducto(id) {
    const producto = productos.find(function (p) {
      return p.id === id
    })

    if (producto) {
      setFormulario({
        id: producto.id,
        nombre: producto.nombre,
        precio: String(producto.precio),
        imagen: producto.imagen,
        descripcion: producto.descripcion || '',
      })
      setError('')
    }
  }

  function eliminarProducto(id) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      guardarProductos(
        productos.filter(function (p) {
          return p.id !== id
        })
      )
    }
  }

  return (
    <main>
      <section className="admin-panel">
        <h1>Gestionar Productos</h1>

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
          <h2>{formulario.id !== null ? 'Editar producto' : 'Nuevo producto'}</h2>

          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={formulario.nombre}
            onChange={function (e) {
              setFormulario({ ...formulario, nombre: e.target.value })
            }}
            placeholder="Nombre del producto"
          />

          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            value={formulario.precio}
            onChange={function (e) {
              setFormulario({ ...formulario, precio: e.target.value })
            }}
            placeholder="39990"
          />

          <label htmlFor="imagen">URL de la imagen:</label>
          <input
            type="text"
            id="imagen"
            value={formulario.imagen}
            onChange={function (e) {
              setFormulario({ ...formulario, imagen: e.target.value })
            }}
            placeholder="https://... o /img/..."
          />

          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={formulario.descripcion}
            onChange={function (e) {
              setFormulario({ ...formulario, descripcion: e.target.value })
            }}
            placeholder="Descripción del producto"
          />

          {error ? <p className="mensaje-error">{error}</p> : null}

          <button type="submit">{formulario.id !== null ? 'Guardar cambios' : 'Agregar producto'}</button>

          {formulario.id !== null ? (
            <button type="button" onClick={limpiarFormulario}>
              Cancelar edición
            </button>
          ) : null}
        </form>

        {/* TABLA DE PRODUCTOS */}
        <h2>Lista de productos</h2>

        <table className="tabla-admin">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="tbody-productos">
            {productos.map(function (producto) {
              return (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{formatearPrecio(producto.precio)}</td>
                  <td>
                    <button
                      type="button"
                      onClick={function () {
                        editarProducto(producto.id)
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={function () {
                        eliminarProducto(producto.id)
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

export default AdminProductos
