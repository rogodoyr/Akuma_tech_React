// ==============================
// CARRITO.JS - Funcionalidades del carrito
// ==============================

// Indicar que carrito.js está cargado
window.mostrarCarritoCompleto = true;


let descuentoAplicado = 0;

let costoEnvio = 0;



// ==============================
// MOSTRAR CARRITO MEJORADO
// ==============================

function mostrarCarrito() {

    const contenedorCarrito = document.getElementById("contenedor-carrito");

    const totalCarrito = document.getElementById("total-carrito");

    const subtotalCarrito = document.getElementById("subtotal-carrito");

    const cantidadItems = document.getElementById("cantidad-items");

    const btnTotal = document.getElementById("btn-total");


    // Si estamos en index.html, contenedor-carrito no existe

    if (!contenedorCarrito) {

        return;

    }


    // Limpiar contenido

    contenedorCarrito.innerHTML = "";


    // Revisar si el carrito está vacío

    if (carrito.length === 0) {

        contenedorCarrito.innerHTML = `

            <div class="carrito-vacio">

                <div class="carrito-vacio-icono">🛒</div>

                <h2>Tu carrito está vacío</h2>

                <p>¿No sabes qué comprar? ¡Mira nuestros productos destacados!</p>

                <a href="index.html#productos" class="btn-primary">Ver productos</a>

            </div>

        `;


        if (totalCarrito) {

            totalCarrito.textContent = "$0";

        }

        if (subtotalCarrito) {

            subtotalCarrito.textContent = "$0";

        }

        if (cantidadItems) {

            cantidadItems.textContent = "0";

        }

        if (btnTotal) {

            btnTotal.textContent = "$0";

        }


        // Ocultar resumen si carrito vacío

        const resumen = document.querySelector(".carrito-resumen");

        if (resumen) {

            resumen.style.display = "none";

        }


        return;

    }


    // Mostrar resumen

    const resumen = document.querySelector(".carrito-resumen");

    if (resumen) {

        resumen.style.display = "block";

    }


    let subtotal = 0;

    let cantidadTotal = 0;


    carrito.forEach(function(producto) {

        const productoSubtotal = producto.precio * producto.cantidad;

        subtotal += productoSubtotal;

        cantidadTotal += producto.cantidad;


        contenedorCarrito.innerHTML += `

            <div class="carrito-item">

                <div class="carrito-item-imagen">

                    <img src="${producto.imagen}" alt="${producto.nombre}" width="100" height="100">

                </div>

                <div class="carrito-item-info">

                    <h3>${producto.nombre}</h3>

                    <p class="carrito-item-precio">$${producto.precio.toLocaleString("es-CL")}</p>

                    <p class="carrito-item-stock">✓ En stock</p>

                </div>

                <div class="carrito-item-cantidad">

                    <button class="btn-cantidad" onclick="disminuirCantidad(${producto.id})">−</button>

                    <span class="cantidad-numero">${producto.cantidad}</span>

                    <button class="btn-cantidad" onclick="aumentarCantidad(${producto.id})">+</button>

                </div>

                <div class="carrito-item-subtotal">

                    <p><strong>$${productoSubtotal.toLocaleString("es-CL")}</strong></p>

                </div>

                <button class="btn-eliminar-item" onclick="eliminarDelCarrito(${producto.id})" title="Eliminar">

                    ✕

                </button>

            </div>

        `;

    });


    // Calcular total con envío y descuento

    let total = subtotal - descuentoAplicado + costoEnvio;

    if (total < 0) total = 0;


    // Actualizar totales

    if (subtotalCarrito) {

        subtotalCarrito.textContent = "$" + subtotal.toLocaleString("es-CL");

    }

    if (cantidadItems) {

        cantidadItems.textContent = cantidadTotal;

    }

    if (totalCarrito) {

        totalCarrito.textContent = "$" + total.toLocaleString("es-CL");

    }

    if (btnTotal) {

        btnTotal.textContent = "$" + total.toLocaleString("es-CL");

    }

}



// ==============================
// VACIAR CARRITO
// ==============================

function vaciarCarrito() {

    if (carrito.length === 0) {

        return;

    }


    if (confirm("¿Estás seguro de vaciar el carrito?")) {

        carrito = [];

        guardarCarrito();

        actualizarCantidadCarrito();

        mostrarCarrito();

    }

}



// ==============================
// APLICAR CÓDIGO DE DESCUENTO
// ==============================

function aplicarDescuento() {

    const input = document.getElementById("codigo-descuento-input");

    const mensaje = document.getElementById("mensaje-descuento");

    const lineaDescuento = document.querySelector(".resumen-descuento");

    const descuentoSpan = document.getElementById("descuento-carrito");


    if (!input || !mensaje) {

        return;

    }


    const codigo = input.value.trim().toUpperCase();


    // Códigos de descuento de ejemplo

    const codigosDescuento = {

        "AKUMA10": 10,

        "GAMER20": 20,

        "BIENVENIDO15": 15,

        "DESCUENTO5": 5

    };


    if (codigo === "") {

        mensaje.textContent = "Ingresa un código de descuento";

        mensaje.className = "mensaje-descuento error";

        return;

    }


    if (codigosDescuento[codigo]) {

        const porcentaje = codigosDescuento[codigo];

        const subtotal = calcularSubtotal();

        descuentoAplicado = Math.round(subtotal * porcentaje / 100);


        mensaje.textContent = `¡Código aplicado! ${porcentaje}% de descuento`;

        mensaje.className = "mensaje-descuento exito";


        if (lineaDescuento) {

            lineaDescuento.style.display = "flex";

        }

        if (descuentoSpan) {

            descuentoSpan.textContent = "-$" + descuentoAplicado.toLocaleString("es-CL");

        }


        mostrarCarrito();

    } else {

        mensaje.textContent = "Código no válido";

        mensaje.className = "mensaje-descuento error";

        descuentoAplicado = 0;


        if (lineaDescuento) {

            lineaDescuento.style.display = "none";

        }

    }

}



// ==============================
// CALCULAR SUBTOTAL
// ==============================

function calcularSubtotal() {

    let subtotal = 0;

    carrito.forEach(function(producto) {

        subtotal += producto.precio * producto.cantidad;

    });

    return subtotal;

}



// ==============================
// SELECCIÓN DE ENVÍO
// ==============================

function configurarEnvio() {

    const opcionesEnvio = document.querySelectorAll('input[name="envio"]');

    const costoEnvioSpan = document.getElementById("costo-envio");


    opcionesEnvio.forEach(function(opcion) {

        opcion.addEventListener("change", function() {

            switch (this.value) {

                case "gratis":

                    costoEnvio = 0;

                    if (costoEnvioSpan) costoEnvioSpan.textContent = "Gratis";

                    break;

                case "express":

                    costoEnvio = 4990;

                    if (costoEnvioSpan) costoEnvioSpan.textContent = "$4.990";

                    break;

                case "same-day":

                    costoEnvio = 9990;

                    if (costoEnvioSpan) costoEnvioSpan.textContent = "$9.990";

                    break;

            }

            mostrarCarrito();

        });

    });

}



// ==============================
// REALIZAR PAGO
// ==============================

function realizarPago() {

    if (carrito.length === 0) {

        alert("El carrito está vacío");

        return;

    }


    // Verificar si hay sesión activa

    const sesionActiva = JSON.parse(localStorage.getItem("sesionActiva"));


    if (!sesionActiva) {

        alert("Debes iniciar sesión para realizar la compra");

        window.location.href = "login.html";

        return;

    }


    // Generar número de pedido

    const numeroPedido = "AK-" + Date.now().toString().slice(-8);


    // Mostrar modal de confirmación

    const modal = document.getElementById("modal-pago");

    const numeroPedidoSpan = document.getElementById("numero-pedido");


    if (modal && numeroPedidoSpan) {

        numeroPedidoSpan.textContent = numeroPedido;

        modal.style.display = "flex";

    }


    // Limpiar carrito después del pago

    carrito = [];

    guardarCarrito();

    actualizarCantidadCarrito();

    descuentoAplicado = 0;

    costoEnvio = 0;

}



// ==============================
// CERRAR MODAL
// ==============================

function cerrarModal() {

    const modal = document.getElementById("modal-pago");

    if (modal) {

        modal.style.display = "none";

    }

    mostrarCarrito();

}



// ==============================
// INICIALIZAR
// ==============================

document.addEventListener("DOMContentLoaded", function() {

    configurarEnvio();

    mostrarCarrito();

});
