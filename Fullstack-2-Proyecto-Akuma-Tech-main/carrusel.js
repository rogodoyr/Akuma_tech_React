// ==============================
// CARRUSEL.JS - Carrusel de ofertas
// ==============================

let slideActual = 0;

let intervaloCarrusel;

const TIEMPO_CAMBIO = 7000; // 7 segundos



// Inicializar carrusel

function iniciarCarrusel() {

    const slides = document.querySelectorAll(".carrusel-slide");

    const dots = document.querySelectorAll(".dot");


    if (slides.length === 0) {

        return;

    }


    // Mostrar primer slide

    mostrarSlide(0);


    // Iniciar auto-play

    iniciarAutoPlay();


    // Pausar al pasar el mouse

    const carrusel = document.querySelector(".carrusel");


    if (carrusel) {

        carrusel.addEventListener("mouseenter", detenerAutoPlay);

        carrusel.addEventListener("mouseleave", iniciarAutoPlay);

    }

}



// Mostrar slide específico

function mostrarSlide(index) {

    const slides = document.querySelectorAll(".carrusel-slide");

    const dots = document.querySelectorAll(".dot");


    // Ocultar todos los slides

    slides.forEach(function(slide) {

        slide.classList.remove("active");

    });


    // Desactivar todos los dots

    dots.forEach(function(dot) {

        dot.classList.remove("active");

    });


    // Mostrar slide actual

    if (slides[index]) {

        slides[index].classList.add("active");

    }


    // Activar dot actual

    if (dots[index]) {

        dots[index].classList.add("active");

    }


    slideActual = index;

}



// Cambiar slide (anterior/siguiente)

function cambiarSlide(direccion) {

    const slides = document.querySelectorAll(".carrusel-slide");

    let nuevoSlide = slideActual + direccion;


    // Si pasa del último, ir al primero

    if (nuevoSlide >= slides.length) {

        nuevoSlide = 0;

    }


    // Si pasa del primero, ir al último

    if (nuevoSlide < 0) {

        nuevoSlide = slides.length - 1;

    }


    mostrarSlide(nuevoSlide);

    reiniciarAutoPlay();

}



// Ir a slide específico (dots)

function irASlide(index) {

    mostrarSlide(index);

    reiniciarAutoPlay();

}



// Iniciar auto-play

function iniciarAutoPlay() {

    intervaloCarrusel = setInterval(function() {

        cambiarSlide(1);

    }, TIEMPO_CAMBIO);

}



// Detener auto-play

function detenerAutoPlay() {

    clearInterval(intervaloCarrusel);

}



// Reiniciar auto-play

function reiniciarAutoPlay() {

    detenerAutoPlay();

    iniciarAutoPlay();

}



// Iniciar carrusel al cargar la página

document.addEventListener("DOMContentLoaded", function() {

    iniciarCarrusel();

});
