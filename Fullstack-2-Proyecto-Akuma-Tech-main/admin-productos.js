// ==============================
// ADMIN-PRODUCTOS.JS - Gestión de productos
// ==============================


const formularioProducto = document.getElementById("admin-producto-form");

const tablaProductosBody = document.getElementById("tbody-productos");



// Cargar productos en la tabla

function cargarProductosAdmin() {

    tablaProductosBody.innerHTML = "";


    productos.forEach(function(producto) {

        const fila = document.createElement("tr");


        fila.innerHTML = `

            <td>${producto.id}</td>

            <td>${producto.nombre}</td>

            <td>$${producto.precio.toLocaleString("es-CL")}</td>

            <td>${producto.categoria || "Sin categoría"}</td>

            <td>

                <button class="btn-editar" onclick="editarProducto(${producto.id})">Editar</button>

                <button class="btn-eliminar" onclick="eliminarProducto(${producto.id})">Eliminar</button>

            </td>

        `;


        tablaProductosBody.appendChild(fila);

    });

}



// Guardar o actualizar producto

formularioProducto.addEventListener("submit", function(event) {

    event.preventDefault();


    const nombre = document.getElementById("admin-producto-nombre").value.trim();

    const precio = parseInt(document.getElementById("admin-producto-precio").value);

    const imagen = document.getElementById("admin-producto-imagen").value.trim();

    const categoria = document.getElementById("admin-producto-categoria").value;

    const descripcion = document.getElementById("admin-producto-descripcion").value.trim();

    const editando = document.getElementById("producto-editando").value;


    // Limpiar errores

    limpiarErroresProductos();


    // Validaciones

    let valido = true;


    if (nombre === "") {

        mostrarErrorProducto("error-admin-producto-nombre", "El nombre es obligatorio");

        valido = false;

    } else if (nombre.length > 200) {

        mostrarErrorProducto("error-admin-producto-nombre", "Máximo 200 caracteres");

        valido = false;

    }


    if (isNaN(precio) || precio <= 0) {

        mostrarErrorProducto("error-admin-producto-precio", "El precio debe ser mayor a 0");

        valido = false;

    }


    if (imagen === "") {

        mostrarErrorProducto("error-admin-producto-imagen", "La URL de imagen es obligatoria");

        valido = false;

    }


    if (categoria === "") {

        mostrarErrorProducto("error-admin-producto-categoria", "Selecciona una categoría");

        valido = false;

    }


    if (descripcion === "") {

        mostrarErrorProducto("error-admin-producto-descripcion", "La descripción es obligatoria");

        valido = false;

    } else if (descripcion.length > 500) {

        mostrarErrorProducto("error-admin-producto-descripcion", "Máximo 500 caracteres");

        valido = false;

    }


    if (!valido) {

        return;

    }


    if (editando !== "") {

        // Actualizar producto existente

        const id = parseInt(editando);

        const index = productos.findIndex(function(p) {

            return p.id === id;

        });


        if (index !== -1) {

            productos[index].nombre = nombre;

            productos[index].precio = precio;

            productos[index].imagen = imagen;

            productos[index].categoria = categoria;

            productos[index].descripcion = descripcion;

        }


        alert("Producto actualizado correctamente");

    } else {

        // Crear nuevo producto con ID autoincremental

        const nuevoId = productos.length > 0 ? Math.max(...productos.map(function(p) { return p.id; })) + 1 : 1;


        productos.push({

            id: nuevoId,

            nombre: nombre,

            precio: precio,

            imagen: imagen,

            categoria: categoria,

            descripcion: descripcion

        });


        alert("Producto agregado correctamente");

    }


    // Limpiar formulario y recargar tabla

    formularioProducto.reset();

    document.getElementById("producto-editando").value = "";

    document.getElementById("titulo-formulario-producto").textContent = "Agregar Nuevo Producto";


    cargarProductosAdmin();

    cargarEstadisticas();

});



// Editar producto

function editarProducto(id) {

    const producto = productos.find(function(p) {

        return p.id === id;

    });


    if (!producto) {

        return;

    }


    document.getElementById("admin-producto-nombre").value = producto.nombre;

    document.getElementById("admin-producto-precio").value = producto.precio;

    document.getElementById("admin-producto-imagen").value = producto.imagen;

    document.getElementById("admin-producto-categoria").value = producto.categoria || "";

    document.getElementById("admin-producto-descripcion").value = producto.descripcion || "";

    document.getElementById("producto-editando").value = id;


    document.getElementById("titulo-formulario-producto").textContent = "Editar Producto";


    // Scroll al formulario

    window.scrollTo({ top: 0, behavior: "smooth" });

}



// Eliminar producto

function eliminarProducto(id) {

    if (confirm("¿Estás seguro de eliminar este producto?")) {

        const index = productos.findIndex(function(p) {

            return p.id === id;

        });


        if (index !== -1) {

            productos.splice(index, 1);

        }


        cargarProductosAdmin();

        cargarEstadisticas();


        alert("Producto eliminado correctamente");

    }

}



// Cancelar edición de producto

function cancelarEdicionProducto() {

    formularioProducto.reset();

    document.getElementById("producto-editando").value = "";

    document.getElementById("titulo-formulario-producto").textContent = "Agregar Nuevo Producto";

    limpiarErroresProductos();

}



// Mostrar error en formulario de producto

function mostrarErrorProducto(elementoId, mensaje) {

    const elemento = document.getElementById(elementoId);

    if (elemento) {

        elemento.textContent = mensaje;

    }

}



// Limpiar errores de productos

function limpiarErroresProductos() {

    const errores = document.querySelectorAll("#admin-producto-form .mensaje-error");

    errores.forEach(function(error) {

        error.textContent = "";

    });

}



// Cargar productos al iniciar

cargarProductosAdmin();
