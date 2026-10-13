# AkumaTech — Tienda Gamer (React)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vitest](https://img.shields.io/badge/Vitest-729B1B?style=for-the-badge&logo=vitest&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

Migración a **React** de la tienda gamer AkumaTech. Proyecto **Fullstack II** — Duoc UC.

Permite navegar un catálogo de 12 productos, gestionar carrito y compras, registrarse con validación de RUT chileno, iniciar sesión con roles y administrar productos/usuarios.

---

## Tabla de contenidos

- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Diagramas](#diagramas)
- [Cómo ejecutar](#cómo-ejecutar)
- [Tests](#tests)
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
| **Persistencia** | `localStorage` | Carrito, usuarios, sesión y productos |
| **Tests** | Vitest + Testing Library | `describe` / `it` / `expect` |
| **Accesibilidad** | jest-axe | Pruebas de accesibilidad automatizadas |
| **Mocking** | `vi.fn()` / `vi.mock()` | Funciones y módulos simulados |

---

## Estructura del proyecto

```
src/
├── assets/img/           # imágenes y video del logo
├── components/           # componentes reutilizables
│   ├── Header.jsx        # nav, logo, sesión y contador del carrito
│   ├── Footer.jsx        # contacto y enlaces
│   ├── ProductoCard.jsx  # tarjeta de producto del catálogo
│   └── Carrusel.jsx      # carrusel de ofertas (auto-play 7s)
├── pages/                # páginas de la aplicación
│   ├── Inicio.jsx        # carrusel + productos destacados
│   ├── Login.jsx         # inicio de sesión
│   ├── Registro.jsx      # registro de usuarios (RUT, teléfono)
│   ├── Carrito.jsx       # carrito, descuento, envío y pago
│   ├── Admin.jsx         # panel de administración
│   ├── AdminProductos.jsx# CRUD de productos
│   └── AdminUsuarios.jsx # CRUD de usuarios
├── context/              # estado global
│   ├── CarritoContext.jsx
│   └── SesionContext.jsx
├── data/
│   └── productos.js      # catálogo + códigos de descuento + envíos
├── utils/
│   ├── validaciones.js   # RUT módulo 11, correo, teléfono, contraseña
│   └── storage.js        # helpers de localStorage
├── tests/                # pruebas (Vitest)
│   ├── Validaciones.test.js
│   ├── Renderizado.test.jsx
│   ├── Mock.test.js
│   ├── AccionesUsuario.test.jsx
│   ├── Rutas.test.jsx
│   └── Accesibilidad.test.jsx
├── App.jsx               # navegación entre páginas
├── main.jsx              # punto de entrada
├── index.css             # estilos globales de la tienda
└── setupTests.js         # configuración de Testing Library
```

---

## Funcionalidades

- Catálogo de 12 productos gamer (periféricos y hardware)
- Carrito con cantidades, subtotal, descuento y opciones de envío
- Registro con validación de **RUT (módulo 11)**, correo y teléfono chileno
- Login con roles: **usuario** / **administrador**
- Panel admin: estadísticas y CRUD de productos y usuarios
- Códigos de descuento: `AKUMA10`, `GAMER20`, `BIENVENIDO15`, `DESCUENTO5`

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
npm run test:coverage # reporte de cobertura
```

Tipos de pruebas incluidas (según guía de clase):

| Carpeta / archivo | Tipo |
|-------------------|------|
| `Validaciones.test.js` | Unitarias (`expect(...).toBe(...)`) |
| `Renderizado.test.jsx` | Renderizado (`getByText`, `queryByText`) |
| `Mock.test.js` | Mocking (`vi.fn`, `vi.mock`, `fetch`) |
| `AccionesUsuario.test.jsx` | Acciones de usuario (`userEvent`, `fireEvent`) |
| `Rutas.test.jsx` | Navegación entre páginas |
| `Accesibilidad.test.jsx` | Accesibilidad (jest-axe) |

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
- `dist/` y `node_modules/` no se suben al repositorio (ver `.gitignore`).
