# Diagrama de Flujo — AkumaTech (React)

Flujos principales de la aplicación: navegación, carrito y autenticación.

---

## Flujo principal de navegación

```mermaid
flowchart TD
    A([Usuario abre la app]) --> B[App.jsx renderiza Header + página]
    B --> C{¿Hay sesión activa?}

    C -->|No| D[Nav: Inicio · Productos · Login · Registro · Carrito]
    C -->|Sí, usuario| E[Nav: Inicio · 👤 Nombre · Cerrar Sesión · Carrito]
    C -->|Sí, admin| F[Nav: Inicio · 👤 Admin · Panel Admin · Cerrar Sesión · Carrito]

    D --> G[Inicio: Carrusel + 12 productos]
    E --> G
    F --> G

    G --> H{¿Qué hace el usuario?}
    H -->|Ver productos| I[ProductoCard]
    H -->|Ir al carrito| J[Página Carrito]
    H -->|Login / Registro| K[Formularios con validación]
    H -->|Panel Admin| L[CRUD productos / usuarios]
```

---

## Flujo del carrito

```mermaid
flowchart TD
    A([Click en Añadir al carrito]) --> B[Buscar producto por id]
    B --> C{¿Ya está en el carrito?}
    C -->|Sí| D[Sumar +1 a la cantidad]
    C -->|No| E[Agregar producto con cantidad 1]
    D --> F[Guardar en localStorage]
    E --> F
    F --> G[Actualizar contador del Header]

    H([Página Carrito]) --> I{¿Carrito vacío?}
    I -->|Sí| J[Mostrar carrito vacío]
    I -->|No| K[Mostrar productos + resumen]
    K --> L[Aplicar código de descuento]
    K --> M[Elegir tipo de envío]
    L --> N[Calcular total]
    M --> N
    N --> O{¿Click en Ir a pagar?}
    O -->|Sin sesión| P[Ir a Login]
    O -->|Con sesión| Q[Mostrar modal con N° de pedido]
    Q --> R[Vaciar carrito]
```

---

## Flujo de autenticación

```mermaid
flowchart TD
    A([Login]) --> B[Ingresar correo y contraseña]
    B --> C{¿Campos válidos?}
    C -->|No| D[Mostrar errores]
    D --> B
    C -->|Sí| E{¿Usuario existe en localStorage?}
    E -->|No| F[Error: correo o contraseña incorrectos]
    E -->|Sí| G[Guardar sesiónActiva]
    G --> H{¿Rol?}
    H -->|admin| I[Ir al Panel Admin]
    H -->|usuario| J[Ir al Inicio]

    K([Registro]) --> L[Validar nombre, RUT, correo, contraseña, teléfono]
    L --> M{¿RUT válido módulo 11?}
    M -->|No| N[Mostrar error de RUT]
    M -->|Sí| O{¿Correo ya registrado?}
    O -->|Sí| P[Error: correo ya existe]
    O -->|No| Q[Guardar usuario en localStorage]
    Q --> R[Ir a Login]
```
