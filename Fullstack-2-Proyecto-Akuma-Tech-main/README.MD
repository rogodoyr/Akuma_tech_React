# AkumaTech - Tienda Gamer

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![LocalStorage](https://img.shields.io/badge/LocalStorage-Web_Storage_API-blue?style=for-the-badge)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

Tienda gamer online construida con HTML5, CSS3 y JavaScript vanilla. Proyecto Fullstack 2 — Duoc UC.

---

## Tabla de contenidos

- [Descripción general](#descripción-general)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Funcionalidades por archivo](#funcionalidades-por-archivo)
  - [index.html — Página principal](#indexhtml--página-principal)
  - [style.css — Estilos globales](#stylecss--estilos-globales)
  - [body.js — Lógica compartida](#bodyjs--lógica-compartida)
  - [carrusel.js — Carrusel de ofertas](#carruseljs--carrusel-de-ofertas)
  - [login.html / login.js — Inicio de sesión](#loginhtml--loginjs--inicio-de-sesión)
  - [registro.html / registro.js — Registro de usuarios](#registrohtml--registrojs--registro-de-usuarios)
  - [carrito.html / carrito.js — Carrito de compras](#carritohtml--carritojs--carrito-de-compras)
  - [admin.html / admin.js — Panel de administración](#adminhtml--adminjs--panel-de-administración)
  - [admin-productos.html / admin-productos.js — CRUD de productos](#admin-productoshtml--admin-productosjs--crud-de-productos)
  - [admin-usuarios.html / admin-usuarios.js — CRUD de usuarios](#admin-usuarioshtml--admin-usuariosjs--crud-de-usuarios)
- [Persistencia de datos](#persistencia-de-datos)
- [Diagrama de flujo](#diagrama-de-flujo)
- [Diagrama de arquitectura](#diagrama-de-arquitectura)
- [Cómo ejecutar](#cómo-ejecutar)

---

## Descripción general

AkumaTech es una tienda virtual de productos gamer que permite a los usuarios:

- Navegar un catálogo de 12 productos (periféricos, hardware, componentes PC)
- Agregar productos al carrito y gestionar cantidades
- Registrarse con validación de RUT chileno y dominios de correo permitidos
- Iniciar sesión con roles diferenciados (usuario / administrador)
- Realizar compras con código de descuento y simulación de envío
- Administrar productos y usuarios desde un panel exclusivo para administradores

No utiliza frameworks ni librerías externas. Toda la lógica es JavaScript puro con manipulación del DOM.

---

## Stack tecnológico

| Capa | Tecnología | Detalle |
|------|-----------|---------|
| **Marcado** | HTML5 | Estructura semántica, formularios con validación nativa, video embebido |
| **Estilos** | CSS3 | Flexbox, Grid, variables, animaciones `@keyframes`, `backdrop-filter`, media queries, gradients |
| **Lógica** | JavaScript ES5/ES6 | Manipulación del DOM, eventos, `localStorage`, `JSON.parse/stringify`, template literals, expresiones regulares |
| **Persistencia** | Web Storage API (`localStorage`) | Carrito, usuarios, sesiones activas, configuración de admin — sin backend |
| **Multimedia** | HTML5 `<video>` | Logo animado en formato WebM |
| **Imágenes** | WebP / PNG | Imágenes locales optimizadas + URLs externas (spdigital, msi, solotodo, terabyteshop) |
| **Control de versiones** | Git | Repositorio local con `.gitignore` |
| **Validación** | Algoritmo módulo 11 | Validación de RUT chileno con dígito verificador |

---

## Estructura del proyecto

```
Fullstack-2-Proyecto-Akuma-Tech/
│
├── index.html                 # Página principal (inicio)
├── style.css                  # Todos los estilos del sitio (~2300 líneas)
├── body.js                    # Lógica compartida: productos, carrito, sesión, admin por defecto
├── carrusel.js                # Carrusel de ofertas (auto-play, navegación, dots)
│
├── login.html                 # Formulario de inicio de sesión
├── login.js                   # Validación y autenticación de login
│
├── registro.html              # Formulario de registro de usuarios
├── registro.js                # Validación de campos + algoritmo RUT + teléfono
│
├── carrito.html               # Página del carrito de compras
├── carrito.js                 # CRUD del carrito, descuentos, envío, resumen de compra
│
├── admin.html                 # Dashboard del administrador
├── admin.js                   # Verificación de sesión admin + funciones base
├── admin-productos.html       # Gestión de productos (admin)
├── admin-productos.js         # CRUD de productos desde panel admin
├── admin-usuarios.html        # Gestión de usuarios (admin)
├── admin-usuarios.js          # CRUD de usuarios desde panel admin
│
├── img/                       # Assets de imágenes y video
│   ├── cara akuma.webm        # Video animado del logo
│   ├── Vulcan_II_XP_US_Heroshot_copy.webp
│   ├── estacion-trabajo.png
│   ├── delivery.jpg
│   ├── mouse_logitech_whiteee.png
│   ├── teclado_alloy_pro_fps.png
│   ├── rtx20ti_transparente.png
│   ├── procesador_ryzen_56000x.png
│   ├── fuente.png
│   ├── gabinete_exodia_white.png
│   └── ...
│
├── diagrama_de_flujo.md       # Diagrama de flujo del sistema
├── diagrama_arquitectura.md   # Diagrama de arquitectura del proyecto
└── .gitignore
```

---

## Funcionalidades por archivo

### index.html — Página principal

- **Header**: Logo animado con video WebM embebido + nombre "AkumaTech" con efecto neón
- **Barra de navegación**: Inicio, Productos, Iniciar Sesión, Registro, Carrito (con contador dinámico)
- **Carrusel de ofertas**: 3 slides con imágenes de fondo, overlay oscuro, navegación por flechas y dots, auto-play cada 7 segundos con pausa al hover
- **Productos destacados**: Grid de 12 tarjetas de producto con imagen, nombre, precio formateado y botón "Agregar al carrito"
- **Footer**: Información de contacto y redes sociales

### style.css — Estilos globales

- **Reset global**: `* { margin: 0; padding: 0; box-sizing: border-box; }`
- **Tema oscuro**: Fondo `#0f0f0f`, texto blanco, acentos en verde neón `#00ff88`
- **Nav**: Flexbox con `justify-content: space-between`, padding responsivo
- **Carrusel**: Slides posicionados con `position: absolute`, transición `opacity 0.8s`, overlay con `linear-gradient` + `backdrop-filter`, dots con escala al activo
- **Tarjetas de producto**: Grid responsivo, hover con `translateY` y sombra verde
- **Formularios**: Estilos para inputs, validación visual, mensajes de error en rojo
- **Carrito**: Diseño de tabla/lista con botones de cantidad, resumen lateral
- **Admin**: Layout de dashboard con sidebar y tabla de datos
- **Animaciones**: `@keyframes neonGlow`, `@keyframes fadeIn`, `@keyframes pulse`
- **Responsive**: Media queries a `768px` y `480px`

### body.js — Lógica compartida

- **Catálogo de productos**: Array de 12 objetos con `id`, `nombre`, `precio`, `imagen`
- **Gestión del carrito**:
  - `agregarAlCarrito(id)` — Busca producto, verifica duplicados, incrementa cantidad o agrega nuevo
  - `guardarCarrito()` — Serializa carrito a `localStorage`
  - `actualizarCantidadCarrito()` — Actualiza el badge del nav
  - `mostrarCarrito()` — Renderiza carrito en `carrito.html` (versión base, sobrescrita por `carrito.js`)
  - `aumentarCantidad(id)` / `disminuirCantidad(id)` / `eliminarDelCarrito(id)`
- **Gestión de sesión**:
  - `verificarSesion()` — Lee `sesionActiva` de localStorage, modifica el nav según rol (usuario o admin)
  - `cerrarSesion()` — Elimina sesión y redirige a index
- **Admin por defecto**:
  - `crearAdminPorDefecto()` — Crea usuario admin (`admin@gmail.com` / `admin123`) si no existe en localStorage

### carrusel.js — Carrusel de ofertas

- **Variables**: `slideActual` (índice), `intervaloCarrusel` (referencia del setInterval), `TIEMPO_CAMBIO` (7000ms)
- **Funciones**:
  - `iniciarCarrusel()` — Selecciona slides y dots, muestra el primero, inicia auto-play, registra eventos `mouseenter`/`mouseleave`
  - `mostrarSlide(index)` — Oculta todos los slides, activa el slide y dot correspondiente al índice
  - `cambiarSlide(direccion)` — Navega +1 o -1 con wrap-around circular, reinicia el auto-play
  - `irASlide(index)` — Navega directo a un slide (usado por los dots)
  - `iniciarAutoPlay()` / `detenerAutoPlay()` / `reiniciarAutoPlay()` — Control del `setInterval`
- **Evento**: `DOMContentLoaded` → `iniciarCarrusel()`

### login.html / login.js — Inicio de sesión

- **Formulario**: Correo + contraseña con mensajes de error en tiempo real
- **Validaciones**:
  - Correo obligatorio, máximo 100 caracteres, dominios permitidos: `@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com`
  - Contraseña obligatoria, entre 4 y 10 caracteres
- **Autenticación**: Busca usuario en array `usuarios` de localStorage por correo + contraseña
- **Sesión**: Guarda `sesionActiva` con `nombre`, `correo`, `rol`
- **Redirección**: Admin → `admin.html`, Usuario → `index.html`

### registro.html / registro.js — Registro de usuarios

- **Formulario**: Nombre, RUT, correo, contraseña, confirmar contraseña, teléfono
- **Validaciones**:
  - Nombre: obligatorio, máximo 100 caracteres
  - RUT: obligatorio, validación con algoritmo módulo 11 (cálculo de dígito verificador)
  - Correo: obligatorio, máximo 100 caracteres, dominios permitidos
  - Contraseña: obligatoria, 4-10 caracteres, confirmación debe coincidir
  - Teléfono: obligatorio, formatos aceptados (`+569XXXXXXXX`, `9XXXXXXXX`)
- **Persistencia**: Agrega al array `usuarios` de localStorage, verifica duplicados por correo

### carrito.html / carrito.js — Carrito de compras

- **Renderizado**: Versión completa que sobrescribe `mostrarCarrito()` de body.js (detectada por flag `window.mostrarCarritoCompleto`)
- **Funciones**:
  - `mostrarCarrito()` — Renderiza productos con imagen, nombre, precio, controles de cantidad (+/-), botón eliminar, subtotales
  - `aumentarCantidad(id)` / `disminuirCantidad(id)` / `eliminarDelCarrito(id)`
  - `aplicarDescuento()` — Código de descuento con porcentaje configurable
  - `calcularEnvio()` — Costo de envío según monto total
  - `finalizarCompra()` — Resumen de compra, limpia carrito, redirige
- **Resumen lateral**: Subtotal, descuento, envío, total final

### admin.html / admin.js — Panel de administración

- **Protección**: `verificarSesionAdmin()` — Verifica que exista sesión activa con rol "admin"
- **Dashboard**: Estadísticas de productos, usuarios y ventas (lectura desde localStorage)
- **Navegación**: Enlaces a gestión de productos y usuarios
- **Cierre de sesión**: `cerrarSesionAdmin()`

### admin-productos.html / admin-productos.js — CRUD de productos

- **Funciones**: Listar, crear, editar y eliminar productos del catálogo
- **Persistencia**: Modifica el array `productos` en localStorage

### admin-usuarios.html / admin-usuarios.js — CRUD de usuarios

- **Funciones**: Listar, editar rol y eliminar usuarios registrados
- **Persistencia**: Modifica el array `usuarios` en localStorage

---

## Persistencia de datos

Toda la persistencia se maneja con `localStorage` del navegador. No hay base de datos ni backend.

| Clave en localStorage | Tipo | Contenido |
|----------------------|------|-----------|
| `usuarios` | `Array<Object>` | Usuarios registrados (nombre, rut, correo, password, telefono, rol) |
| `sesionActiva` | `Object` | Sesión del usuario logueado (nombre, correo, rol) |
| `carrito` | `Array<Object>` | Productos en el carrito (id, nombre, precio, imagen, cantidad) |

> **Nota**: Al ser `localStorage`, los datos son por navegador y persisten hasta que se borre el caché. No hay sincronización entre dispositivos.

---

## Diagrama de flujo

Ver [diagrama_de_flujo.md](diagrama_de_flujo.md) para el diagrama completo del flujo de navegación y lógica del sistema.

---

## Diagrama de arquitectura

Ver [diagrama_arquitectura.md](diagrama_arquitectura.md) para el diagrama de arquitectura y organización del proyecto.

---

## Cómo ejecutar

1. Clonar o descargar el repositorio
2. Abrir `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge)
3. No se requiere servidor local ni instalación de dependencias

**Credenciales de administrador por defecto:**
- Correo: `admin@gmail.com`
- Contraseña: `admin123`
