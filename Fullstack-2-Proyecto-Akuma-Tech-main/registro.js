const formularioRegistro = document.getElementById("registro-form");


formularioRegistro.addEventListener("submit", function(event) {

    event.preventDefault();


    const nombre = document.getElementById("nombre").value.trim();

    const rut = document.getElementById("rut").value.trim();

    const correo = document.getElementById("correo").value.trim();

    const password = document.getElementById("password").value;

    const confirmarPassword = document.getElementById("confirmar-password").value;

    const telefono = document.getElementById("telefono").value.trim();


    const errorNombre = document.getElementById("error-nombre");

    const errorRut = document.getElementById("error-rut");

    const errorCorreo = document.getElementById("error-correo");

    const errorPassword = document.getElementById("error-password");

    const errorConfirmarPassword = document.getElementById("error-confirmar-password");

    const errorTelefono = document.getElementById("error-telefono");


    // Limpiar mensajes anteriores

    errorNombre.textContent = "";

    errorRut.textContent = "";

    errorCorreo.textContent = "";

    errorPassword.textContent = "";

    errorConfirmarPassword.textContent = "";

    errorTelefono.textContent = "";


    let formularioValido = true;


    // DOMINIOS PERMITIDOS

    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];


    // ==============================
    // VALIDAR NOMBRE
    // ==============================

    if (nombre === "") {

        errorNombre.textContent = "El nombre es obligatorio.";

        formularioValido = false;

    } else if (nombre.length > 100) {

        errorNombre.textContent = "El nombre no puede superar los 100 caracteres.";

        formularioValido = false;

    }


    // ==============================
    // VALIDAR RUT
    // ==============================

    if (rut === "") {

        errorRut.textContent = "El RUT es obligatorio.";

        formularioValido = false;

    } else if (!validarRut(rut)) {

        errorRut.textContent = "El RUT no es válido. Use el formato: 12.345.678-9";

        formularioValido = false;

    }


    // ==============================
    // VALIDAR CORREO
    // ==============================

    const correoValido = dominiosPermitidos.some(function(dominio) {

        return correo.endsWith(dominio);

    });


    if (correo === "") {

        errorCorreo.textContent = "El correo es obligatorio.";

        formularioValido = false;

    } else if (correo.length > 100) {

        errorCorreo.textContent = "El correo no puede superar los 100 caracteres.";

        formularioValido = false;

    } else if (!correoValido) {

        errorCorreo.textContent = "Solo se permiten correos con formato @duoc.cl, @profesor.duoc.cl o @gmail.com.";

        formularioValido = false;

    }


    // ==============================
    // VALIDAR CONTRASEÑA
    // ==============================

    if (password === "") {

        errorPassword.textContent = "La contraseña es obligatoria.";

        formularioValido = false;

    } else if (password.length < 4 || password.length > 10) {

        errorPassword.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";

        formularioValido = false;

    }


    // ==============================
    // VALIDAR CONFIRMAR CONTRASEÑA
    // ==============================

    if (confirmarPassword === "") {

        errorConfirmarPassword.textContent = "Debe confirmar la contraseña.";

        formularioValido = false;

    } else if (confirmarPassword !== password) {

        errorConfirmarPassword.textContent = "Las contraseñas no coinciden.";

        formularioValido = false;

    }


    // ==============================
    // VALIDAR TELÉFONO
    // ==============================

    if (telefono === "") {

        errorTelefono.textContent = "El teléfono es obligatorio.";

        formularioValido = false;

    } else if (!validarTelefono(telefono)) {

        errorTelefono.textContent = "El teléfono no es válido. Use el formato: +569 12345678 o 9 12345678";

        formularioValido = false;

    }


    // ==============================
    // REGISTRO CORRECTO
    // ==============================

    if (formularioValido) {

        // Guardar usuario en LOCALSTORAGE

        const usuario = {

            nombre: nombre,

            rut: rut,

            correo: correo,

            password: password,

            telefono: telefono

        };


        // Obtener usuarios existentes o crear array vacío

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


        // Verificar si el correo ya está registrado

        const correoExistente = usuarios.find(function(u) {

            return u.correo === correo;

        });


        if (correoExistente) {

            errorCorreo.textContent = "Este correo ya está registrado.";

            return;

        }


        // Agregar nuevo usuario

        usuarios.push(usuario);


        // Guardar en LOCALSTORAGE

        localStorage.setItem("usuarios", JSON.stringify(usuarios));


        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");


        // Redirigir al login

        window.location.href = "login.html";

    }

});



// ==============================
// FUNCIÓN VALIDAR RUT CHILENO
// ==============================

function validarRut(rut) {

    // Eliminar puntos y guión

    const rutLimpio = rut.replace(/\./g, "").replace("-", "");


    // Verificar formato básico (7 u 8 dígitos + 1 verificador)

    if (!/^\d{7,8}[0-9kK]$/.test(rutLimpio)) {

        return false;

    }


    // Separar cuerpo y dígito verificador

    const cuerpo = rutLimpio.slice(0, -1);

    const dv = rutLimpio.slice(-1).toLowerCase();


    // Calcular dígito verificador esperado

    let suma = 0;

    let multiplicador = 2;


    for (let i = cuerpo.length - 1; i >= 0; i--) {

        suma += parseInt(cuerpo[i]) * multiplicador;

        multiplicador++;

        if (multiplicador > 7) {

            multiplicador = 2;

        }

    }


    const resto = suma % 11;

    const dvEsperado = 11 - resto;


    let dvCalculado;

    if (dvEsperado === 11) {

        dvCalculado = "0";

    } else if (dvEsperado === 10) {

        dvCalculado = "k";

    } else {

        dvCalculado = String(dvEsperado);

    }


    return dv === dvCalculado;

}



// ==============================
// FUNCIÓN VALIDAR TELÉFONO
// ==============================

function validarTelefono(telefono) {

    // Formatos válidos:
    // +569 12345678
    // +56 9 12345678
    // 9 12345678
    // 912345678

    const telefonoLimpio = telefono.replace(/\s/g, "");


    // Verificar diferentes formatos

    const formatosValidos = [

        /^\+569\d{8}$/,      // +56912345678

        /^\+56\d{9}$/,       // +56912345678

        /^9\d{8}$/,          // 912345678

        /^\d{9}$/            // 912345678 (sin código país)

    ];


    return formatosValidos.some(function(formato) {

        return formato.test(telefonoLimpio);

    });

}
