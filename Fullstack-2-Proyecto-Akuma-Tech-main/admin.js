// ==============================
// ADMIN.JS - Funciones base del administrador
// ==============================


// Verificar si hay sesión de admin activa

function verificarSesionAdmin() {

    const sesionActiva = JSON.parse(localStorage.getItem("sesionActiva"));


    if (!sesionActiva) {

        alert("Debes iniciar sesión como administrador");

        window.location.href = "login.html";

        return false;

    }


    // Verificar si el usuario tiene rol de admin

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioActual = usuarios.find(function(u) {

        return u.correo === sesionActiva.correo;

    });


    if (!usuarioActual || usuarioActual.rol !== "admin") {

        alert("No tienes permisos de administrador");

        window.location.href = "index.html";

        return false;

    }


    return true;

}



// Cerrar sesión del admin

function cerrarSesionAdmin() {

    localStorage.removeItem("sesionActiva");

    alert("Sesión de administrador cerrada");

    window.location.href = "index.html";

}



// Cargar estadísticas del panel

function cargarEstadisticas() {

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const totalUsuarios = document.getElementById("total-usuarios");

    const totalProductos = document.getElementById("total-productos");

    const totalCarritos = document.getElementById("total-carritos");


    if (totalUsuarios) {

        totalUsuarios.textContent = usuarios.length;

    }


    if (totalProductos) {

        totalProductos.textContent = productos.length;

    }


    // Contar carritos activos (usuarios con items en carrito)

    let carritosActivos = 0;

    for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i);

        if (key.startsWith("carrito_")) {

            const carrito = JSON.parse(localStorage.getItem(key));

            if (carrito && carrito.length > 0) {

                carritosActivos++;

            }

        }

    }


    if (totalCarritos) {

        totalCarritos.textContent = carritosActivos;

    }

}



// Ejecutar al cargar la página

if (window.location.pathname.includes("admin")) {

    verificarSesionAdmin();

    cargarEstadisticas();

}
