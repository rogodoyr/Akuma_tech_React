# Diagrama de Arquitectura — AkumaTech Tienda Gamer

Organización técnica, capas y relaciones entre los archivos del proyecto.

---

## Arquitectura general del proyecto

```mermaid
graph TB
    subgraph NAVEGADOR["🌐 Navegador Web (Cliente)"]
        subgraph CAPA_PRESENTACION["📄 Capa de Presentación"]
            INDEX["index.html<br/>Página principal"]
            LOGIN["login.html<br/>Inicio de sesión"]
            REGISTRO["registro.html<br/>Registro"]
            CARRITO_HTML["carrito.html<br/>Carrito de compras"]
            ADMIN["admin.html<br/>Dashboard admin"]
            ADMIN_PROD["admin-productos.html<br/>CRUD productos"]
            ADMIN_USER["admin-usuarios.html<br/>CRUD usuarios"]
        end

        subgraph CAPA_ESTILOS["🎨 Capa de Estilos"]
            CSS["style.css<br/>~2300 líneas<br/>Tema oscuro, Flexbox, Grid<br/>Animaciones, Responsive"]
        end

        subgraph CAPA_LOGICA["⚙️ Capa de Lógica"]
            BODY["body.js<br/>Lógica compartida<br/>Productos, Carrito, Sesión"]
            CARRUSEL["carrusel.js<br/>Auto-play, Navegación<br/>Dots, Pausa hover"]
            LOGIN_JS["login.js<br/>Validación login<br/>Autenticación"]
            REGISTRO_JS["registro.js<br/>Validación registro<br/>RUT módulo 11"]
            CARRITO_JS["carrito.js<br/>CRUD carrito<br/>Descuentos, Envío"]
            ADMIN_JS["admin.js<br/>Verificar sesión admin<br/>Funciones base"]
            ADMIN_PROD_JS["admin-productos.js<br/>CRUD productos"]
            ADMIN_USER_JS["admin-usuarios.js<br/>CRUD usuarios"]
        end

        subgraph CAPA_DATOS["💾 Capa de Persistencia (localStorage)"]
            LS_USUARIOS["usuarios<br/>Array de objetos"]
            LS_SESION["sesionActiva<br/>Objeto de sesión"]
            LS_CARRITO["carrito<br/>Array de objetos"]
        end

        subgraph CAPA_ASSETS["🖼️ Capa de Assets"]
            IMG["img/<br/>WebP, PNG, JPG, WebM"]
            EXT["URLs externas<br/>spdigital, msi,<br/>solotodo, terabyteshop"]
        end
    end

    INDEX --> CSS
    LOGIN --> CSS
    REGISTRO --> CSS
    CARRITO_HTML --> CSS
    ADMIN --> CSS
    ADMIN_PROD --> CSS
    ADMIN_USER --> CSS

    INDEX --> BODY
    INDEX --> CARRUSEL
    LOGIN --> LOGIN_JS
    REGISTRO --> REGISTRO_JS
    CARRITO_HTML --> CARRITO_JS
    CARRITO_HTML --> BODY
    ADMIN --> ADMIN_JS
    ADMIN_PROD --> ADMIN_PROD_JS
    ADMIN_USER --> ADMIN_USER_JS

    BODY --> LS_CARRITO
    BODY --> LS_USUARIOS
    BODY --> LS_SESION
    LOGIN_JS --> LS_USUARIOS
    LOGIN_JS --> LS_SESION
    REGISTRO_JS --> LS_USUARIOS
    CARRITO_JS --> LS_CARRITO
    ADMIN_JS --> LS_SESION
    ADMIN_JS --> LS_USUARIOS
    ADMIN_PROD_JS --> LS_CARRITO
    ADMIN_USER_JS --> LS_USUARIOS

    INDEX --> IMG
    INDEX --> EXT
```

---

## Capas del sistema

### 1. Capa de Presentación (HTML)

Archivos `.html` que definen la estructura de cada página. No contienen lógica, solo marcado semántico, formularios y enlaces a CSS/JS.

| Archivo | Rol | Secciones principales |
|---------|-----|----------------------|
| `index.html` | Página de inicio | Header, nav, carrusel, productos destacados, footer |
| `login.html` | Autenticación | Formulario correo + contraseña |
| `registro.html` | Registro | Formulario multi-campo con validación |
| `carrito.html` | Compra | Lista de productos, controles de cantidad, resumen |
| `admin.html` | Dashboard admin | Estadísticas, enlaces a gestión |
| `admin-productos.html` | CRUD productos | Tabla de productos, formulario de creación/edición |
| `admin-usuarios.html` | CRUD usuarios | Tabla de usuarios, edición de roles |

### 2. Capa de Estilos (CSS)

Un único archivo `style.css` con toda la estilización del sitio:

| Sección | Contenido |
|---------|-----------|
| Configuración global | Reset `*`, tipografía, colores base, tema oscuro `#0f0f0f` |
| Header/Nav | Barra de navegación flex, logo con video, menú responsive |
| Carrusel | Slides absolutos, transición opacity, overlay con gradiente, dots, flechas |
| Productos | Grid responsivo de tarjetas, hover effects, botones con sombra verde |
| Formularios | Inputs estilizados, validación visual, mensajes de error |
| Carrito | Layout de lista + resumen lateral, controles de cantidad |
| Admin | Dashboard grid, sidebar, tablas de datos |
| Animaciones | `@keyframes neonGlow`, `fadeIn`, `pulse` |
| Responsive | `@media (max-width: 768px)` y `(max-width: 480px)` |

### 3. Capa de Lógica (JavaScript)

Archivos `.js` que manejan toda la interactividad. Sin frameworks, vanilla JavaScript puro.

| Archivo | Dependencias | Responsabilidad |
|---------|-------------|-----------------|
| `body.js` | Ninguna | Catálogo de productos, carrito base, gestión de sesión, creación de admin |
| `carrusel.js` | Ninguna | Auto-play del carrusel, navegación, pausa al hover |
| `login.js` | `body.js` (sesión) | Validación de formulario, autenticación contra localStorage |
| `registro.js` | Ninguna | Validación multi-campo, algoritmo RUT módulo 11, validación teléfono |
| `carrito.js` | `body.js` (carrito) | CRUD completo del carrito, descuentos, envío, finalización de compra |
| `admin.js` | `body.js` (sesión) | Verificación de permisos admin, funciones base del dashboard |
| `admin-productos.js` | `admin.js` | CRUD de productos desde panel admin |
| `admin-usuarios.js` | `admin.js` | CRUD de usuarios desde panel admin |

### 4. Capa de Persistencia (localStorage)

No hay backend ni base de datos. Toda la data persiste en el navegador:

```
localStorage
├── "usuarios"        → [{nombre, rut, correo, password, telefono, rol}, ...]
├── "sesionActiva"    → {nombre, correo, rol}
└── "carrito"         → [{id, nombre, precio, imagen, cantidad}, ...]
```

### 5. Capa de Assets

Recursos estáticos almacenados localmente en `img/`:

| Formato | Uso |
|---------|-----|
| `.webm` | Video animado del logo (cara akuma.webm) |
| `.webp` | Imágenes de productos optimizadas |
| `.png` | Imágenes de productos y logos |
| `.jpg` | Imágenes de carrusel (delivery.jpg, estacion-trabajo.png) |

Imágenes externas se cargan directamente desde URLs de retailers (spdigital.cl, msi.com, solotodo.com, terabyteshop.com).

---

## Relaciones entre archivos

```mermaid
flowchart LR
    subgraph HTML
        index["index.html"]
        login["login.html"]
        registro["registro.html"]
        carrito["carrito.html"]
        admin["admin.html"]
        adminP["admin-productos.html"]
        adminU["admin-usuarios.html"]
    end

    subgraph JS
        body["body.js"]
        carrusel["carrusel.js"]
        loginJS["login.js"]
        regJS["registro.js"]
        carritoJS["carrito.js"]
        adminJS["admin.js"]
        adminPJS["admin-productos.js"]
        adminUJS["admin-usuarios.js"]
    end

    index --> body
    index --> carrusel
    login --> body
    login --> loginJS
    registro --> body
    registro --> regJS
    carrito --> body
    carrito --> carritoJS
    admin --> body
    admin --> adminJS
    adminP --> body
    adminP --> adminJS
    adminP --> adminPJS
    adminU --> body
    adminU --> adminJS
    adminU --> adminUJS

    style index fill:#00ff88,color:#000
    style body fill:#00ff88,color:#000
```

---

## Modelo de datos

```mermaid
erDiagram
    USUARIO {
        string nombre
        string rut
        string correo PK
        string password
        string telefono
        string rol
    }

    PRODUCTO {
        number id PK
        string nombre
        number precio
        string imagen
    }

    CARRITO_ITEM {
        number id FK
        string nombre
        number precio
        string imagen
        number cantidad
    }

    SESION {
        string nombre
        string correo FK
        string rol
    }

    USUARIO ||--o{ SESION : "inicia"
    PRODUCTO ||--o{ CARRITO_ITEM : "se agrega a"
```

---

## Roles y permisos

```mermaid
flowchart TD
    subgraph ROLES
        VISITANTE["👤 Visitante<br/>(sin sesión)"]
        USUARIO["👤 Usuario<br/>(logueado)"]
        ADMIN_USER["🛡️ Administrador"]
    end

    VISITANTE -->|"Puede:"| V1["Ver productos"]
    VISITANTE --> V2["Agregar al carrito"]
    VISITANTE --> V3["Ver carrusel"]
    VISITANTE -->|"No puede:"| V4["Finalizar compra"]
    VISITANTE --> V5["Acceder al panel admin"]

    USUARIO -->|"Puede:"| U1["Todo lo del visitante"]
    USUARIO --> U2["Finalizar compra"]
    USUARIO --> U3["Aplicar descuentos"]
    USUARIO -->|"No puede:"| U4["Acceder al panel admin"]

    ADMIN_USER -->|"Puede:"| A1["Todo lo del usuario"]
    ADMIN_USER --> A2["Gestionar productos"]
    ADMIN_USER --> A3["Gestionar usuarios"]
    ADMIN_USER --> A4["Ver estadísticas"]
    ADMIN_USER --> A5["Eliminar usuarios"]
```
