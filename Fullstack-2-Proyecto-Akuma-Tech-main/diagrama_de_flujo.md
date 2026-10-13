# Diagrama de Flujo — AkumaTech Tienda Gamer

Diagrama de flujo que describe la navegación del usuario y la lógica interna del sistema.

---

## Flujo principal de navegación

```mermaid
flowchart TD
    A([🌐 Usuario abre index.html]) --> B[Se carga body.js y carrusel.js]
    B --> C{¿Hay sesión activa?}

    C -->|Sí| D{¿Rol del usuario?}
    C -->|No| E[Se muestra nav estándar: Inicio, Productos, Login, Registro, Carrito]

    D -->|admin| F[Nav muestra: Inicio, Productos, 👤 Admin, Panel Admin, Carrito, Cerrar Sesión]
    D -->|usuario| G[Nav muestra: Inicio, Productos, 👤 Nombre, Cerrar Sesión, Carrito]

    E --> H[Página principal cargada]
    F --> H
    G --> H

    H --> I[Carrusel de ofertas - 3 slides - auto-play 7s]
    H --> J[Productos destacados - 12 tarjetas]
    H --> K[Footer]

    I --> L{¿Usuario interactúa con carrusel?}
    L -->|Click flecha/dot| M[Cambia slide, reinicia auto-play]
    L -->|Mouse sobre carrusel| N[Pausa auto-play]
    L -->|Mouse sale| O[Reanuda auto-play]

    J --> P{¿Click en Agregar al Carrito?}
    P --> Q[agregarAlCarrito id]
    Q --> R{¿Producto ya existe en carrito?}
    R -->|Sí| S[Incrementa cantidad]
    R -->|No| T[Agrega producto nuevo al carrito]
    S --> U[Guardar en localStorage]
    T --> U
    U --> V[Actualizar badge del carrito en nav]
    V --> W[Mostrar alerta: Producto añadido al carrito]
```

---

## Flujo de autenticación

```mermaid
flowchart TD
    A([Página de Login]) --> B[Usuario ingresa correo y contraseña]
    B --> C{¿Campos vacíos?}
    C -->|Sí| D[Mostrar errores en tiempo real]
    D --> B

    C -->|No| E{¿Correo cumple dominios permitidos?}
    E -->|No| F[Error: Solo @duoc.cl, @profesor.duoc.cl, @gmail.com]
    F --> B

    E -->|Sí| G{¿Contraseña 4-10 caracteres?}
    G -->|No| H[Error: Contraseña debe tener 4-10 caracteres]
    H --> B

    G -->|Sí| I[Buscar usuario en localStorage por correo + password]
    I --> J{¿Usuario encontrado?}

    J -->|No| K[Error: Correo o contraseña incorrectos]
    K --> B

    J -->|Sí| L[Guardar sesionActiva en localStorage]
    L --> M{¿Rol del usuario?}
    M -->|admin| N[Redirigir a admin.html]
    M -->|usuario| O[Redirigir a index.html]
```

---

## Flujo de registro

```mermaid
flowchart TD
    A([Página de Registro]) --> B[Usuario completa formulario]
    B --> C{¿Validación de campos OK?}

    C -->|No| D[Mostrar errores por campo]
    D --> B

    C -->|Sí| E[Algoritmo módulo 11 para RUT]
    E --> F{¿RUT válido?}
    F -->|No| G[Error: RUT no válido]
    G --> B

    F -->|Sí| H{¿Teléfono formato válido?}
    H -->|No| I[Error: Formato de teléfono inválido]
    I --> B

    H -->|Sí| J[Verificar si correo ya existe en localStorage]
    J --> K{¿Correo duplicado?}
    K -->|Sí| L[Error: Este correo ya está registrado]
    L --> B

    K -->|No| M[Agregar usuario al array usuarios]
    M --> N[Guardar en localStorage]
    N --> O[Alerta: Registro exitoso]
    O --> P[Redirigir a login.html]
```

---

## Flujo del carrito de compras

```mermaid
flowchart TD
    A([Página carrito.html]) --> B[carrito.js sobrescribe mostrarCarrito]
    B --> C[Leer carrito desde localStorage]
    C --> D{¿Carrito vacío?}

    D -->|Sí| E[Mostrar mensaje vacío + enlace a productos]
    D -->|No| F[Renderizar lista de productos]

    F --> G[Mostrar resumen: subtotal, descuento, envío, total]

    G --> H{¿Acción del usuario?}
    H -->|Cambiar cantidad +| I[aumentarCantidad]
    H -->|Cambiar cantidad -| J[disminuirCantidad]
    H -->|Eliminar producto| K[eliminarDelCarrito]
    H -->|Aplicar descuento| L[aplicarDescuento]
    H -->|Finalizar compra| M[finalizarCompra]

    I --> N[Guardar en localStorage → Re-renderizar]
    J --> N
    K --> N
    L --> N

    M --> O[Mostrar resumen de compra]
    O --> P[Vaciar carrito en localStorage]
    P --> Q[Redirigir a index.html]
```

---

## Flujo del panel de administración

```mermaid
flowchart TD
    A([admin.html]) --> B[verificarSesionAdmin]
    B --> C{¿Sesión activa?}

    C -->|No| D[Alerta: Debes iniciar sesión]
    D --> E[Redirigir a login.html]

    C -->|Sí| F{¿Rol es admin?}
    F -->|No| G[Alerta: No tienes permisos]
    G --> H[Redirigir a index.html]

    F -->|Sí| I[Mostrar dashboard con estadísticas]

    I --> J{¿Sección a gestionar?}
    J -->|Productos| K[admin-productos.html]
    J -->|Usuarios| L[admin-usuarios.html]
    J -->|Cerrar Sesión| M[Eliminar sesionActiva → Redirigir index.html]

    K --> N[CRUD de productos: Listar, Crear, Editar, Eliminar]
    L --> O[CRUD de usuarios: Listar, Editar rol, Eliminar]

    N --> P[Guardar cambios en localStorage]
    O --> P
```

---

## Validación de RUT chileno (Algoritmo Módulo 11)

```mermaid
flowchart TD
    A([Input: RUT del usuario]) --> B[Eliminar puntos y guión]
    B --> C{¿Formato: 7-8 dígitos + verificador?}
    C -->|No| D[RUT inválido]
    C -->|Sí| E[Separar cuerpo y dígito verificador]

    E --> F[Suma ponderada: dígito × multiplicador]
    F --> G[Multiplicador: 2,3,4,5,6,7 → se reinicia a 2]
    G --> H[Calcular: resto = suma mod 11]
    H --> I[dv_esperado = 11 - resto]

    I --> J{¿dv_esperado?}
    J -->|11| K[dv = 0]
    J -->|10| L[dv = k]
    J -->|Otro| M[dv = 11 - resto]

    K --> N{¿dv calculado = dv ingresado?}
    L --> N
    M --> N

    N -->|Sí| O[RUT válido ✅]
    N -->|No| P[RUT inválido ❌]
```
