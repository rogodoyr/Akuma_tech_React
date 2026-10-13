import { useState } from 'react'
import { SesionProvider } from './context/SesionContext'
import { CarritoProvider } from './context/CarritoContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Carrito from './pages/Carrito'
import Admin from './pages/Admin'
import AdminProductos from './pages/AdminProductos'
import AdminUsuarios from './pages/AdminUsuarios'
import './App.css'

// Componente principal: controla la navegación entre páginas
function App() {
  const [pagina, setPagina] = useState('inicio')

  function navegar(destino) {
    setPagina(destino)
    window.scrollTo(0, 0)
  }

  function renderizarPagina() {
    if (pagina === 'login') {
      return <Login navegar={navegar} />
    }
    if (pagina === 'registro') {
      return <Registro navegar={navegar} />
    }
    if (pagina === 'carrito') {
      return <Carrito navegar={navegar} />
    }
    if (pagina === 'admin') {
      return <Admin navegar={navegar} />
    }
    if (pagina === 'admin-productos') {
      return <AdminProductos navegar={navegar} />
    }
    if (pagina === 'admin-usuarios') {
      return <AdminUsuarios navegar={navegar} />
    }
    return <Inicio />
  }

  return (
    <SesionProvider>
      <CarritoProvider>
        <Header navegar={navegar} />
        {renderizarPagina()}
        <Footer navegar={navegar} />
      </CarritoProvider>
    </SesionProvider>
  )
}

export default App
