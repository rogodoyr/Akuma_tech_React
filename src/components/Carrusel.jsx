import { useEffect, useState } from 'react'

// Carrusel de ofertas con auto-play y navegación
function Carrusel({ navegar }) {
  const [slideActual, setSlideActual] = useState(0)

  const slides = [
    {
      id: 0,
      imagen: '/img/estacion-trabajo.png',
      badge: '🔥 Oferta de la semana',
      titulo: 'Hasta 30% de descuento',
      texto: 'En periféricos gamer seleccionados',
      boton: 'Ver ofertas',
    },
    {
      id: 1,
      imagen: '/img/Vulcan_II_XP_US_Heroshot_copy.webp',
      badge: '🆕 Próximamente',
      titulo: 'Turtle Beach Vulcan II XP',
      texto: 'Lanzamiento previsto para el próximo 25 de octubre de 2026 a unos $120 USD',
      boton: 'Más información',
    },
    {
      id: 2,
      imagen: '/img/delivery.jpg',
      badge: '🚚 Envío gratis',
      titulo: 'Envío sin costo',
      texto: 'En compras superiores a $50.000',
      boton: 'Comprar ahora',
    },
  ]

  // Auto-play cada 7 segundos
  useEffect(function () {
    const intervalo = setInterval(function () {
      setSlideActual(function (actual) {
        return (actual + 1) % slides.length
      })
    }, 7000)

    return function () {
      clearInterval(intervalo)
    }
  }, [slides.length])

  function cambiarSlide(direccion) {
    setSlideActual(function (actual) {
      return (actual + direccion + slides.length) % slides.length
    })
  }

  function irASlide(index) {
    setSlideActual(index)
  }

  return (
    <section className="carrusel">
      <div className="carrusel-container">
        {slides.map(function (slide, index) {
          return (
            <div
              key={slide.id}
              className={
                'carrusel-slide' + (index === slideActual ? ' active' : '')
              }
              style={{
                background: 'url(' + slide.imagen + ') center/cover no-repeat',
              }}
            >
              <div className="carrusel-overlay"></div>
              <div className="slide-contenido" style={{ position: 'relative', zIndex: 2 }}>
                <span className="slide-badge">{slide.badge}</span>
                <h2>{slide.titulo}</h2>
                <p>{slide.texto}</p>
                <a
                  href="#productos"
                  className="slide-boton"
                  onClick={function (e) {
                    e.preventDefault()
                    if (index === 0) {
                      const seccion = document.getElementById('productos')
                      if (seccion) {
                        seccion.scrollIntoView({ behavior: 'smooth' })
                      }
                    }
                  }}
                >
                  {slide.boton}
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {/* Flechas de navegación */}
      <button
        type="button"
        className="carrusel-flecha carrusel-flecha-izq"
        onClick={function () {
          cambiarSlide(-1)
        }}
      >
        ❮
      </button>
      <button
        type="button"
        className="carrusel-flecha carrusel-flecha-der"
        onClick={function () {
          cambiarSlide(1)
        }}
      >
        ❯
      </button>

      {/* Indicadores (dots) */}
      <div className="carrusel-dots">
        {slides.map(function (slide, index) {
          return (
            <span
              key={slide.id}
              className={'dot' + (index === slideActual ? ' active' : '')}
              onClick={function () {
                irASlide(index)
              }}
            ></span>
          )
        })}
      </div>
    </section>
  )
}

export default Carrusel
