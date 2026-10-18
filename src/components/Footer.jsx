// Pie de página con información de contacto y enlaces
function Footer({ navegar }) {
  return (
    <footer>
      <div className="footer-contenido">
        <div className="footer-seccion">
          <h3><strong>Nosotros</strong></h3>
          <p><strong>AkumaTech es tu tienda gamer de confianza. 
            Te ofrecemos los mejores productos y servicios con envios a todo el pais.</strong></p>

        </div>

        <div className="footer-seccion">
          <h3><strong>Contacto</strong></h3>
          <p>📧 info@akumatech.com</p>
          <p>📞 +569 12345678</p>
          <p>📍 Santiago La Florida, Chile</p>
        </div>

        <div className="footer-seccion">
          <h3><strong>Enlaces útiles</strong></h3>
          <a
            href="#"
            onClick={function (e) {
              e.preventDefault()
              navegar('inicio')
            }}
          >
            <strong>Inicio</strong>
          </a>
          <a
            href="#"
            onClick={function (e) {
              e.preventDefault()
              navegar('inicio')
            }}
          >
            Productos
          </a>
          <a
            href="#"
            onClick={function (e) {
              e.preventDefault()
              navegar('login')
            }}
          >
            Iniciar Sesión
          </a>
          <a
            href="#"
            onClick={function (e) {
              e.preventDefault()
              navegar('registro')
            }}
          >
            Registro
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© 2026 AkumaTech - Tienda de Tecnología. Todos los derechos reservados.</small>
      </div>
    </footer>
  )
}

export default Footer
