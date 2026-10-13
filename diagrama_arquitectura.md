# Diagrama de Arquitectura — AkumaTech (React)

Organización por capas del proyecto migrado a React.

---

## Arquitectura general

```mermaid
graph TB
    subgraph UI["Interfaz (React)"]
        MAIN["main.jsx<br/>Punto de entrada"]
        APP["App.jsx<br/>Navegación por estado"]
        PAGES["pages/<br/>Inicio · Login · Registro<br/>Carrito · Admin"]
        COMP["components/<br/>Header · Footer<br/>ProductoCard · Carrusel"]
    end

    subgraph ESTADO["Estado global (Context)"]
        CART["CarritoContext"]
        SESION["SesionContext"]
    end

    subgraph LOGICA["Lógica y datos"]
        DATA["data/productos.js"]
        UTILS["utils/<br/>validaciones.js<br/>storage.js"]
    end

    subgraph PERSISTENCIA["Persistencia"]
        LS["localStorage<br/>carrito · usuarios<br/>sesionActiva · productos"]
    end

    MAIN --> APP
    APP --> PAGES
    APP --> COMP
    PAGES --> CART
    PAGES --> SESION
    COMP --> CART
    COMP --> SESION
    CART --> LS
    SESION --> LS
    CART --> DATA
    PAGES --> UTILS
    UTILS --> LS
```

---

## Relación con el proyecto original (JS → React)

| JavaScript vanilla | React |
|--------------------|-------|
| `index.html` + `body.js` | `pages/Inicio.jsx` + `CarritoContext` |
| `login.js` / `registro.js` | `pages/Login.jsx` / `pages/Registro.jsx` |
| `carrito.js` | `pages/Carrito.jsx` |
| `carrusel.js` | `components/Carrusel.jsx` |
| `admin*.js` | `pages/Admin*.jsx` |
| `style.css` | `src/index.css` |
| `localStorage` directo | `utils/storage.js` + Context |
