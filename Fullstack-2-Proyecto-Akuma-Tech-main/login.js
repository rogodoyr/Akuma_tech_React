const formularioLogin = document.getElementById("login-form");


formularioLogin.addEventListener("submit", function(event) {

    event.preventDefault();


    const correo = document.getElementById("correo").value.trim();

    const password = document.getElementById("password").value;


    const errorCorreo = document.getElementById("error-correo");

    const errorPassword = document.getElementById("error-password");


    // Limpiar mensajes anteriores

    errorCorreo.textContent = "";

    errorPassword.textContent = "";


    let formularioValido = true;


    // DOMINIOS PERMITIDOS

    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];


    const correoValido = dominiosPermitidos.some(function(dominio) {

        return correo.endsWith(dominio);

    });


    // VALIDAR CORREO

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


    // VALIDAR CONTRASEÑA

    if (password === "") {

        errorPassword.textContent = "La contraseña es obligatoria.";

        formularioValido = false;

    } else if (password.length < 4 || password.length > 10) {

        errorPassword.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";

        formularioValido = false;

    }


    // SI LA VALIDACIÓN ES CORRECTA, VERIFICAR USUARIO

    if (formularioValido) {

        // Obtener usuarios registrados de LOCALSTORAGE

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


        // Buscar usuario por correo y contraseña

        const usuarioEncontrado = usuarios.find(function(usuario) {

            return usuario.correo === correo && usuario.password === password;

        });


        if (usuarioEncontrado) {

            // Guardar sesión activa en LOCALSTORAGE

            localStorage.setItem("sesionActiva", JSON.stringify({

                nombre: usuarioEncontrado.nombre,

                correo: usuarioEncontrado.correo,

                rol: usuarioEncontrado.rol || "usuario"

            }));


            alert("¡Inicio de sesión exitoso! Bienvenido " + usuarioEncontrado.nombre);


            // Redirigir según el rol

            if (usuarioEncontrado.rol === "admin") {

                window.location.href = "admin.html";

            } else {

                window.location.href = "index.html";

            }

        } else {

            errorCorreo.textContent = "Correo o contraseña incorrectos.";

            errorPassword.textContent = "Correo o contraseña incorrectos.";

        }

    }

});
