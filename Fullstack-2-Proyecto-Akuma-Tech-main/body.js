// 
// PRODUCTOS DE LA TIENDA
// 

const productos = [

    {
        id: 1,
        nombre: "Audífonos Razer BlackShark V2 X",
        precio: 39990,
        imagen: "https://media.spdigital.cl/thumbnails/products/4vdgea3g_d38e5d9c_thumbnail_4096.png"
    },

    {
        id: 2,
        nombre: "Mouse Logitech G Pro Wireless",
        precio: 29990,
        imagen: "img/mouse_logitech_whiteee.png"
    },

    {
        id: 3,
        nombre: "Teclado Mecánico HyperX Alloy FPS Pro",
        precio: 49990,
        imagen: "img/teclado_alloy_pro_fps.png"
    },

    {
        id: 4,
        nombre: "MSI GeForce RTX 5070 Ti FRIEREN Edition",
        precio: 1399990,
        imagen: "img/rtx20ti_transparente.png"
    },

    {
        id: 5,
        nombre: "Monitor Gamer OLED MSI MAG 272QP X24",
        precio: 453990,
        imagen: "https://storage-asset.msi.com/global/picture/product/product_175738613265ae8f1336fa1d0d2a172acec0f779a1.webp"
    },

    {
        id: 6,
        nombre: "AMD Ryzen 5 5600X",
        precio: 149990,
        imagen: "img/procesador_ryzen_56000x.png"
    },

    {
        id: 7,
        nombre: "Fuente de Poder Corsair RM850x",
        precio: 129990,
        imagen: "img/fuente.png"
    },



    {
        id: 8,
        nombre: "RTX 5080 Gaming Trio",
        precio: 1999990,
        imagen: "https://media.solotodo.com/media/products/2014734_picture_1738343912.png"
    },

    {
        id: 9,
        nombre: "Tarjeta Madre MSI B550 Tomahawk",
        precio: 199990,
        imagen: "https://img.terabyteshop.com.br/archive/306771404/placa-mae-msi-mag-b550-tomahawk01.png"
    },

    {
        id: 10,
        nombre: "Memoria RAM Corsair Vengeance LPX 32GB",
        precio: 149990,
        imagen: "https://media.spdigital.cl/thumbnails/products/crii92y0_8ab41b80_thumbnail_4096.png"
    },

    {

        id: 11,
        nombre: "Exodia Panel Zro - White (7 Ventiladores)",
        precio: 64990,
        imagen: "img/gabinete_exodia_white.png"
    },

    {
    id: 12,
    nombre: "Refrigeración Líquida XYZ AQUAPULSE AIO 240mm White",
    precio: 54990,
    imagen: "https://media.spdigital.cl/thumbnails/products/1763997187343-AP1_f31f7cf6_07c4fd48_thumbnail_512.jpg"
}
];



// 
// OBTENER EL CARRITO DESDE LOCALSTORAGE
// 

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



// 
// GUARDAR CARRITO
// 

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}



// 
// AGREGAR PRODUCTO AL CARRITO
// 

function agregarAlCarrito(idProducto) {

    // Buscar el producto según el ID
    const productoEncontrado = productos.find(function(producto) {

        return producto.id === idProducto;

    });


    // Si no encuentra el producto, termina la función
    if (!productoEncontrado) {

        return;

    }


    // Revisar si el producto ya existe en el carrito
    const productoEnCarrito = carrito.find(function(producto) {

        return producto.id === idProducto;

    });


    // Si ya existe, aumenta la cantidad
    if (productoEnCarrito) {

        productoEnCarrito.cantidad++;

    } else {

        // Si no existe, se agrega al carrito
        carrito.push({

            id: productoEncontrado.id,
            nombre: productoEncontrado.nombre,
            precio: productoEncontrado.precio,
            imagen: productoEncontrado.imagen,
            cantidad: 1

        });

    }


    // Guardar carrito
    guardarCarrito();


    // Actualizar contador
    actualizarCantidadCarrito();

    mostrarCarrito();

    alert("Producto añadido al carrito"); //saltara alerta al añadir un carrito

}



// 
// ACTUALIZAR NUMERO DEL CARRITO
// 

function actualizarCantidadCarrito() {

    const cantidadCarrito =
        document.getElementById("cantidad-carrito");


    // Evita errores si el elemento no existe
    if (!cantidadCarrito) {

        return;

    }


    let cantidadTotal = 0;


    carrito.forEach(function(producto) {

        cantidadTotal += producto.cantidad;

    });


    cantidadCarrito.textContent = cantidadTotal;

}



// MOSTRAR PRODUCTOS EN carrito.html //  

// Esta función es básica para index.html
// carrito.js la sobrescribe con la versión completa

function mostrarCarrito() {

    const contenedorCarrito =
        document.getElementById("contenedor-carrito");


    const totalCarrito =
        document.getElementById("total-carrito");


    // Si estamos en index.html,
    // contenedor-carrito no existe.
    // Por eso terminamos esta función.
    if (!contenedorCarrito) {

        return;

    }


    // Si existe carrito.js, no ejecutar esta versión
    if (typeof window.mostrarCarritoCompleto !== "undefined") {

        return;

    }


    // Limpiar contenido
    contenedorCarrito.innerHTML = "";


    // Revisar si el carrito está vacío
    if (carrito.length === 0) {

        contenedorCarrito.innerHTML =
            "<p>Tu carrito está vacío.</p>";


        if (totalCarrito) {

            totalCarrito.textContent = "$0";

        }


        return;

    }


    let total = 0;


    carrito.forEach(function(producto) {


        const subtotal =
            producto.precio * producto.cantidad;


        total += subtotal;


        contenedorCarrito.innerHTML += `

            <div class="producto-carrito">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    width="120"
                    height="120"
                >


                <div>

                    <h3>
                        ${producto.nombre}
                    </h3>


                    <p>
                        Precio:
                        $${producto.precio.toLocaleString("es-CL")}
                    </p>


                    <p>
                        Cantidad:
                        ${producto.cantidad}
                    </p>


                    <p>
                        Subtotal:
                        $${subtotal.toLocaleString("es-CL")}
                    </p>


                    <button onclick="disminuirCantidad(${producto.id})">
                        -
                    </button>


                    <button onclick="aumentarCantidad(${producto.id})">
                        +
                    </button>


                    <button onclick="eliminarDelCarrito(${producto.id})">
                        Eliminar
                    </button>

                </div>

            </div>

        `;

    });



    // Mostrar total del carrito
    if (totalCarrito) {

        totalCarrito.textContent =
            "$" + total.toLocaleString("es-CL");

    }

}



// 
// AUMENTAR CANTIDAD
// 

function aumentarCantidad(idProducto) {

    const producto = carrito.find(function(producto) {

        return producto.id === idProducto;

    });


    if (producto) {

        producto.cantidad++;

    }


    guardarCarrito();

    actualizarCantidadCarrito();

    mostrarCarrito();

}



// DISMINUIR CANTIDAD // 


function disminuirCantidad(idProducto) {

    const producto = carrito.find(function(producto) {

        return producto.id === idProducto;

    });


    if (!producto) {

        return;

    }


    producto.cantidad--;


    // Si llega a 0, se elimina //
    if (producto.cantidad <= 0) {

        eliminarDelCarrito(idProducto);

        return;

    }


    guardarCarrito();

    actualizarCantidadCarrito();

    mostrarCarrito();

}



// ELIMINAR PRODUCTO // 


function eliminarDelCarrito(idProducto) {

    carrito = carrito.filter(function(producto) {

        return producto.id !== idProducto;

    });


    guardarCarrito();

    actualizarCantidadCarrito();

    mostrarCarrito();

}



// EJECUTAR AL CARGAR LA PAGINA // 
 
 

actualizarCantidadCarrito();

mostrarCarrito();

verificarSesion();

crearAdminPorDefecto();



// ==============================
// GESTIÓN DE SESIÓN
// ==============================

function verificarSesion() {

    const sesionActiva = JSON.parse(localStorage.getItem("sesionActiva"));

    const nav = document.querySelector("nav ul");


    if (!nav) {

        return;

    }


    if (sesionActiva) {

        // Reemplazar enlace de Iniciar Sesión con nombre de usuario

        const enlaces = nav.querySelectorAll("li");


        enlaces.forEach(function(li) {

            const enlace = li.querySelector("a");


            if (enlace && enlace.getAttribute("href") === "login.html") {

                li.innerHTML = '<a href="#"><strong>👤 ' + sesionActiva.nombre + '</strong></a>';

            }


            if (enlace && enlace.getAttribute("href") === "registro.html") {

                // Si es admin, mostrar enlace al panel de admin

                if (sesionActiva.rol === "admin") {

                    li.innerHTML = '<a href="admin.html"><strong>Panel Admin</strong></a>';

                } else {

                    li.innerHTML = '<a href="#" onclick="cerrarSesion()"><strong>Cerrar Sesión</strong></a>';

                }

            }

        });

        // Si es admin, agregar enlace de Cerrar Sesión después del carrito

        if (sesionActiva.rol === "admin") {

            const enlaceCarrito = nav.querySelector('a[href="carrito.html"]');

            if (enlaceCarrito) {

                const liCarrito = enlaceCarrito.parentElement;

                const liLogout = document.createElement("li");

                liLogout.innerHTML = '<a href="#" onclick="cerrarSesion()"><strong>Cerrar Sesión</strong></a>';

                liCarrito.parentNode.insertBefore(liLogout, liCarrito.nextSibling);

            }

        }

    }

}



function cerrarSesion() {

    localStorage.removeItem("sesionActiva");

    alert("Sesión cerrada correctamente");

    window.location.href = "index.html";

}



// ==============================
// CREAR ADMIN POR DEFECTO
// ==============================

function crearAdminPorDefecto() {

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


    // Verificar si ya existe un admin

    const adminExiste = usuarios.find(function(u) {

        return u.rol === "admin";

    });


    if (!adminExiste) {

        // Crear usuario administrador por defecto

        usuarios.push({

            nombre: "Administrador",

            rut: "11.111.111-1",

            correo: "admin@gmail.com",

            telefono: "+569 99999999",

            password: "admin123",

            rol: "admin"

        });


        localStorage.setItem("usuarios", JSON.stringify(usuarios));

    }

}