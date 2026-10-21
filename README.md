# AkumaTech — Tienda Gamer (React)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vitest](https://img.shields.io/badge/Vitest-729B1B?style=for-the-badge&logo=vitest&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

Migración a **React** de la tienda gamer AkumaTech. Proyecto **Fullstack II** — Duoc UC.

Permite navegar un catálogo de 14 productos, gestionar carrito y compras, registrarse con validación de RUT chileno, iniciar sesión con roles, ver el historial de pedidos y administrar productos/usuarios.

---

## Tabla de contenidos

- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Diagramas](#diagramas)
- [Cómo ejecutar](#cómo-ejecutar)
- [Tests](#tests)
- [Cobertura](#cobertura)
- [Credenciales de prueba](#credenciales-de-prueba)

---

## Stack tecnológico

| Capa | Tecnología | Detalle |
|------|-----------|---------|
| **UI** | React 19 | Componentes funcionales, hooks (`useState`, `useEffect`, `useContext`) |
| **Build** | Vite 8 | Dev server con HMR, build de producción |
| **Lenguaje** | JavaScript (JSX) | Sin TypeScript, pensado para aprendizaje |
| **Estilos** | CSS3 | Flexbox, Grid, variables, animaciones, responsive |
| **Estado** | React Context | `CarritoContext` y `SesionContext` |
| **Persistencia** | `localStorage` | Carrito, usuarios, sesión, productos y pedidos |
| **Tests** | Vitest 3 + Testing Library | `describe` / `it` / `expect`, `renderHook`, `userEvent` |
| **Accesibilidad** | jest-axe | Pruebas de accesibilidad automatizadas |
| **Mocking** | `vi.fn()` / `vi.spyOn()` | Alertas, confirm y funciones simuladas |
| **Cobertura** | `@vitest/coverage-v8` | Reportes texto / HTML / JSON |

---

## Estructura del proyecto

```
src/
├── assets/img/            # imágenes y video del logo
├── components/            # componentes reutilizables
│   ├── Header.jsx         # nav, logo, sesión y contador del carrito
│   ├── Footer.jsx         # contacto y enlaces
│   ├── ProductoCard.jsx   # tarjeta de producto del catálogo
│   └── Carrusel.jsx       # carrusel de ofertas (auto-play 7s)
├── pages/                 # páginas de la aplicación
│   ├── Inicio.jsx         # carrusel + productos destacados
│   ├── Login.jsx          # inicio de sesión
│   ├── Registro.jsx       # registro de usuarios (RUT, teléfono)
│   ├── Carrito.jsx        # carrito, descuento, envío y pago
│   ├── MisPedidos.jsx     # historial de pedidos del usuario
│   ├── Admin.jsx          # panel de administración
│   ├── AdminProductos.jsx # CRUD de productos
│   └── AdminUsuarios.jsx  # CRUD de usuarios
├── context/               # estado global
│   ├── CarritoContext.jsx # carrito, catálogo y descuentos
│   └── SesionContext.jsx  # sesión, usuarios y roles
├── data/
│   └── productos.js       # catálogo + códigos de descuento + envíos
├── utils/
│   ├── validaciones.js    # RUT módulo 11, correo, teléfono, contraseña
│   └── storage.js         # helpers de localStorage
├── tests/                 # pruebas (Vitest) — 13 archivos, 134 tests
│   ├── Validaciones.test.js      # unitarias de validaciones
│   ├── Storage.test.js           # unitarias de localStorage
│   ├── CarritoContext.test.jsx   # lógica del carrito
│   ├── SesionContext.test.jsx    # sesión, roles y registro
│   ├── Renderizado.test.jsx      # renderizado de componentes
│   ├── Mock.test.js              # mocking (vi.fn / vi.mock)
│   ├── AccionesUsuario.test.jsx  # formularios y clics
│   ├── Registro.test.jsx         # submit y validación del registro
│   ├── Rutas.test.jsx            # navegación entre páginas
│   ├── Componentes.test.jsx      # Header, Footer, Carrusel, ProductoCard
│   ├── PaginasAdmin.test.jsx     # Admin, AdminProductos, AdminUsuarios
│   ├── CarritoPedidos.test.jsx   # checkout y MisPedidos
│   └── Accesibilidad.test.jsx    # accesibilidad (jest-axe)
├── App.jsx                # navegación entre páginas
├── main.jsx               # punto de entrada
├── index.css              # estilos globales de la tienda
└── setupTests.js          # mock de localStorage + Testing Library
```

---

## Funcionalidades

- Catálogo de 14 productos gamer (periféricos y hardware)
- Carrito con cantidades, subtotal, descuento y opciones de envío
- Registro con validación de **RUT (módulo 11)**, correo y teléfono chileno
- Login con roles: **usuario** / **administrador**
- Historial de pedidos por usuario con "volver a comprar"
- Panel admin: estadísticas y CRUD de productos y usuarios
- Códigos de descuento: `AKUMA10` (10%), `GAMER30` (30%), `BIENVENIDO15` (15%), `DESCUENTO5` (5%), `CYBERAKUMA40` (40%)

---

## Diagramas

| Documento | Contenido |
|-----------|-----------|
| [diagrama_arquitectura.md](./diagrama_arquitectura.md) | Capas del proyecto y relaciones entre módulos |
| [diagrama_de_flujo.md](./diagrama_de_flujo.md) | Flujo de navegación, carrito y autenticación |

---

## Cómo ejecutar

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar en desarrollo
npm run dev

# 3. Build de producción (genera la carpeta dist/)
npm run build

# 4. Vista previa del build
npm run preview
```

---

## Tests

```bash
npm test              # ejecuta todos los tests una vez
npm run test:watch    # se re-ejecutan al guardar
npm run test:coverage # reporte de cobertura (genera coverage/)
```

### Tipos de pruebas incluidas

| Archivo | Tipo | Qué cubre |
|---------|------|-----------|
| `Validaciones.test.js` | Unitarias | Correo, contraseña, nombre, RUT, teléfono, formato de precio |
| `Storage.test.js` | Unitarias | `leerStorage` / `guardarStorage` / `eliminarStorage` / admin por defecto |
| `CarritoContext.test.jsx` | Unitarias + hooks | Agregar, cantidades, eliminar, vaciar, descuento, catálogo |
| `SesionContext.test.jsx` | Unitarias + hooks | Registro, login, logout, `esAdmin`, `guardarUsuarios` |
| `Renderizado.test.jsx` | Renderizado | `ProductoCard` y `Footer` (`getByText`, `queryByText`) |
| `Mock.test.js` | Mocking | `vi.fn`, `vi.mock`, `fetch` simulado |
| `AccionesUsuario.test.jsx` | Acciones de usuario | Formulario de Login (`userEvent`, `fireEvent`) |
| `Registro.test.jsx` | Acciones + validación | Submit del registro, errores y correo duplicado |
| `Rutas.test.jsx` | Navegación | Inicio → Login → Registro → Carrito → Inicio |
| `Componentes.test.jsx` | Interacción | Header, Footer, Carrusel (flechas/dots), ProductoCard |
| `PaginasAdmin.test.jsx` | CRUD + roles | Acceso restringido, alta/edición/borrado de productos y usuarios |
| `CarritoPedidos.test.jsx` | Flujos | Descuento, vaciar, checkout, modal de compra, MisPedidos |
| `Accesibilidad.test.jsx` | Accesibilidad | jest-axe sobre la aplicación completa |

### Convenciones usadas

- `getByText` / `getByRole` / `getByLabelText` → falla si no encuentra
- `findByText` → espera a que aparezca (asíncrono)
- `queryByText` → devuelve `null` si no existe (no falla)
- `renderHook` + `act` → probar contextos sin renderizar páginas
- `vi.spyOn(window, 'alert' | 'confirm')` → aislar diálogos del navegador

---

## Cobertura

Al ejecutar `npm run test:coverage` se genera el reporte HTML en `coverage/index.html`.

| Métrica | % | Umbral mínimo |
|---------|---|---------------|
| Statements | **97.3%** | 90% |
| Branches | **93.1%** | 85% |
| Functions | **94.2%** | 85% |
| Lines | **97.3%** | 90% |

Los umbrales están configurados en `vite.config.js` (`test.coverage.thresholds`): si el coverage baja de esos valores, el comando falla.

Quedan excluidos del reporte los archivos que no son lógica de la app: `vite.config.js`, `eslint.config.js`, `src/main.jsx` y los propios tests.

> `coverage/` no se sube al repositorio (está en `.gitignore`). Cada quien lo genera localmente.

---

## Credenciales de prueba

| Rol | Correo | Contraseña |
|-----|--------|------------|
| Administrador | `admin@gmail.com` | `admin123` |

El admin se crea automáticamente al abrir la app si no existe.

---

## Notas del proyecto

- La navegación se maneja con **estado** en `App.jsx` (sin react-router), a propósito: código simple para aprender React.
- Los datos viven en `localStorage` (sin backend), igual que el proyecto original en JavaScript.
- `dist/`, `node_modules/`, `coverage/` y `.mimocode/` no se suben al repositorio (ver `.gitignore`).
