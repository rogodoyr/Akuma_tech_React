// ==============================
// ADMIN-USUARIOS.JS - Gestión de usuarios
// ==============================


const formularioUsuario = document.getElementById("admin-usuario-form");

const tablaUsuariosBody = document.getElementById("tbody-usuarios");



// Cargar usuarios en la tabla

function cargarUsuarios() {

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


    tablaUsuariosBody.innerHTML = "";


    usuarios.forEach(function(usuario, index) {

        const fila = document.createElement("tr");


        fila.innerHTML = `

            <td>${usuario.nombre}</td>

            <td>${usuario.rut}</td>

            <td>${usuario.correo}</td>

            <td>${usuario.telefono}</td>

            <td><span class="rol-badge rol-${usuario.rol}">${usuario.rol}</span></td>

            <td>

                <button class="btn-editar" onclick="editarUsuario(${index})">Editar</button>

                <button class="btn-eliminar" onclick="eliminarUsuario(${index})">Eliminar</button>

            </td>

        `;


        tablaUsuariosBody.appendChild(fila);

    });

}



// Guardar o actualizar usuario

formularioUsuario.addEventListener("submit", function(event) {

    event.preventDefault();


    const nombre = document.getElementById("admin-nombre").value.trim();

    const rut = document.getElementById("admin-rut").value.trim();

    const correo = document.getElementById("admin-correo").value.trim();

    const telefono = document.getElementById("admin-telefono").value.trim();

    const password = document.getElementById("admin-password").value;

    const rol = document.getElementById("admin-rol").value;

    const editando = document.getElementById("usuario-editando").value;


    // Limpiar errores

    limpiarErroresAdmin();


    // Validaciones

    let valido = true;


    if (nombre === "") {

        mostrarErrorAdmin("error-admin-nombre", "El nombre es obligatorio");

        valido = false;

    } else if (nombre.length > 100) {

        mostrarErrorAdmin("error-admin-nombre", "Máximo 100 caracteres");

        valido = false;

    }


    if (rut === "") {

        mostrarErrorAdmin("error-admin-rut", "El RUT es obligatorio");

        valido = false;

    } else if (!validarRut(rut)) {

        mostrarErrorAdmin("error-admin-rut", "RUT no válido. Formato: 12.345.678-9");

        valido = false;

    }


    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

    const correoValido = dominiosPermitidos.some(function(d) {

        return correo.endsWith(d);

    });


    if (correo === "") {

        mostrarErrorAdmin("error-admin-correo", "El correo es obligatorio");

        valido = false;

    } else if (correo.length > 100) {

        mostrarErrorAdmin("error-admin-correo", "Máximo 100 caracteres");

        valido = false;

    } else if (!correoValido) {

        mostrarErrorAdmin("error-admin-correo", "Dominios permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com");

        valido = false;

    }


    if (telefono === "") {

        mostrarErrorAdmin("error-admin-telefono", "El teléfono es obligatorio");

        valido = false;

    } else if (!validarTelefono(telefono)) {

        mostrarErrorAdmin("error-admin-telefono", "Formato no válido");

        valido = false;

    }


    if (password === "") {

        mostrarErrorAdmin("error-admin-password", "La contraseña es obligatoria");

        valido = false;

    } else if (password.length < 4 || password.length > 10) {

        mostrarErrorAdmin("error-admin-password", "Debe tener entre 4 y 10 caracteres");

        valido = false;

    }


    if (rol === "") {

        mostrarErrorAdmin("error-admin-rol", "Selecciona un rol");

        valido = false;

    }


    if (!valido) {

        return;

    }


    // Obtener usuarios existentes

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


    if (editando !== "") {

        // Actualizar usuario existente

        const index = parseInt(editando);

        usuarios[index] = {

            nombre: nombre,

            rut: rut,

            correo: correo,

            telefono: telefono,

            password: password,

            rol: rol

        };


        alert("Usuario actualizado correctamente");

    } else {

        // Verificar si el correo ya existe

        const existe = usuarios.find(function(u) {

            return u.correo === correo;

        });


        if (existe) {

            mostrarErrorAdmin("error-admin-correo", "Este correo ya está registrado");

            return;

        }


        // Crear nuevo usuario

        usuarios.push({

            nombre: nombre,

            rut: rut,

            correo: correo,

            telefono: telefono,

            password: password,

            rol: rol

        });


        alert("Usuario creado correctamente");

    }


    // Guardar en LOCALSTORAGE

    localStorage.setItem("usuarios", JSON.stringify(usuarios));


    // Limpiar formulario y recargar tabla

    formularioUsuario.reset();

    document.getElementById("usuario-editando").value = "";

    document.getElementById("titulo-formulario").textContent = "Crear Nuevo Usuario";


    cargarUsuarios();

    cargarEstadisticas();

});



// Editar usuario

function editarUsuario(index) {

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios[index];


    if (!usuario) {

        return;

    }


    document.getElementById("admin-nombre").value = usuario.nombre;

    document.getElementById("admin-rut").value = usuario.rut;

    document.getElementById("admin-correo").value = usuario.correo;

    document.getElementById("admin-telefono").value = usuario.telefono;

    document.getElementById("admin-password").value = usuario.password;

    document.getElementById("admin-rol").value = usuario.rol;

    document.getElementById("usuario-editando").value = index;


    document.getElementById("titulo-formulario").textContent = "Editar Usuario";


    // Scroll al formulario

    window.scrollTo({ top: 0, behavior: "smooth" });

}



// Eliminar usuario

function eliminarUsuario(index) {

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


    if (confirm("¿Estás seguro de eliminar este usuario?")) {

        usuarios.splice(index, 1);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));


        cargarUsuarios();

        cargarEstadisticas();


        alert("Usuario eliminado correctamente");

    }

}



// Cancelar edición

function cancelarEdicion() {

    formularioUsuario.reset();

    document.getElementById("usuario-editando").value = "";

    document.getElementById("titulo-formulario").textContent = "Crear Nuevo Usuario";

    limpiarErroresAdmin();

}



// Mostrar error en formulario admin

function mostrarErrorAdmin(elementoId, mensaje) {

    const elemento = document.getElementById(elementoId);

    if (elemento) {

        elemento.textContent = mensaje;

    }

}



// Limpiar todos los errores

function limpiarErroresAdmin() {

    const errores = document.querySelectorAll(".mensaje-error");

    errores.forEach(function(error) {

        error.textContent = "";

    });

}



// Cargar usuarios al iniciar

cargarUsuarios();
