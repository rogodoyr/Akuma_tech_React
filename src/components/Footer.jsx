// Pie de página con información de contacto y enlaces
function Footer({ navegar }) {
  return (
    <footer>
      <div className="footer-contenido">
        <div className="footer-seccion">
          <h3>Nosotros</h3>
          <p>
            AkumaTech es tu tienda gamer de confianza. Ofrecemos los mejores componentes,
            periféricos y accesorios para armar tu setup gamer ideal.
          </p>
        </div>

        <div className="footer-seccion">
          <h3>Contacto</h3>
          <p>📧 info@akumatech.com</p>
          <p>📞 +569 12345678</p>
          <p>📍 Santiago, Chile</p>
        </div>

        <div className="footer-seccion">
          <h3>Enlaces útiles</h3>
          <a
            href="#"
            onClick={function (e) {
              e.preventDefault()
              navegar('inicio')
            }}
          >
            Inicio
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
