import { createContext, useContext, useEffect, useState } from 'react'
import { leerStorage, guardarStorage } from '../utils/storage'
import { productos as catalogoInicial, codigosDescuento } from '../data/productos'

// Contexto del carrito de compras
const CarritoContext = createContext(null)

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(function () {
    return leerStorage('carrito', [])
  })

  const [productos, setProductos] = useState(function () {
    return leerStorage('productos', catalogoInicial)
  })

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(function () {
    guardarStorage('carrito', carrito)
  }, [carrito])

  // Agregar un producto al carrito
  function agregarAlCarrito(idProducto) {
    const productoEncontrado = productos.find(function (producto) {
      return producto.id === idProducto
    })

    if (!productoEncontrado) {
      return false
    }

    setCarrito(function (carritoActual) {
      const existe = carritoActual.find(function (producto) {
        return producto.id === idProducto
      })

      if (existe) {
        return carritoActual.map(function (producto) {
          if (producto.id === idProducto) {
            return { ...producto, cantidad: producto.cantidad + 1 }
          }
          return producto
        })
      }

      return [
        ...carritoActual,
        {
          id: productoEncontrado.id,
          nombre: productoEncontrado.nombre,
          precio: productoEncontrado.precio,
          imagen: productoEncontrado.imagen,
          cantidad: 1,
        },
      ]
    })

    return true
  }

  // Aumentar cantidad de un producto
  function aumentarCantidad(idProducto) {
    setCarrito(function (carritoActual) {
      return carritoActual.map(function (producto) {
        if (producto.id === idProducto) {
          return { ...producto, cantidad: producto.cantidad + 1 }
        }
        return producto
      })
    })
  }

  // Disminuir cantidad (si llega a 0 se elimina)
  function disminuirCantidad(idProducto) {
    setCarrito(function (carritoActual) {
      const producto = carritoActual.find(function (p) {
        return p.id === idProducto
      })

      if (!producto) {
        return carritoActual
      }

      if (producto.cantidad <= 1) {
        return carritoActual.filter(function (p) {
          return p.id !== idProducto
        })
      }

      return carritoActual.map(function (p) {
        if (p.id === idProducto) {
          return { ...p, cantidad: p.cantidad - 1 }
        }
        return p
      })
    })
  }

  // Eliminar producto del carrito
  function eliminarDelCarrito(idProducto) {
    setCarrito(function (carritoActual) {
      return carritoActual.filter(function (producto) {
        return producto.id !== idProducto
      })
    })
  }

  // Vaciar todo el carrito
  function vaciarCarrito() {
    setCarrito([])
  }

  // Cantidad total de productos en el carrito
  const cantidadTotal = carrito.reduce(function (total, producto) {
    return total + producto.cantidad
  }, 0)

  // Subtotal del carrito
  const subtotal = carrito.reduce(function (total, producto) {
    return total + producto.precio * producto.cantidad
  }, 0)

  // Aplicar código de descuento (devuelve { ok, mensaje, porcentaje })
  function aplicarDescuento(codigo) {
    const codigoUpper = codigo.trim().toUpperCase()

    if (codigoUpper === '') {
      return { ok: false, mensaje: 'Ingresa un código de descuento', porcentaje: 0 }
    }

    const porcentaje = codigosDescuento[codigoUpper]

    if (!porcentaje) {
      return { ok: false, mensaje: 'Código no válido', porcentaje: 0 }
    }

    return {
      ok: true,
      mensaje: '¡Código aplicado! ' + porcentaje + '% de descuento',
      porcentaje: porcentaje,
    }
  }

  // Guardar productos (para admin)
  function guardarProductos(listaProductos) {
    setProductos(listaProductos)
    guardarStorage('productos', listaProductos)
  }

  const valor = {
    carrito: carrito,
    productos: productos,
    cantidadTotal: cantidadTotal,
    subtotal: subtotal,
    agregarAlCarrito: agregarAlCarrito,
    aumentarCantidad: aumentarCantidad,
    disminuirCantidad: disminuirCantidad,
    eliminarDelCarrito: eliminarDelCarrito,
    vaciarCarrito: vaciarCarrito,
    aplicarDescuento: aplicarDescuento,
    guardarProductos: guardarProductos,
  }

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}

// Hook para usar el carrito desde cualquier componente
export function useCarrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  }
  return contexto
}
