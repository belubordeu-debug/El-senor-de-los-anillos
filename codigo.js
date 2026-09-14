document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú hamburguesa (abrir y cerrar con los iconos)
    const botonMenu = document.getElementById('boton');
    const menuNav = document.getElementById('menu');
    const botonCierre = document.getElementById('cierre');

    botonMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        menuNav.classList.toggle('activo');
    });

    botonCierre.addEventListener('click', () => {
        menuNav.classList.remove('activo');
    });

    document.addEventListener('click', (e) => {
        if (!menuNav.contains(e.target) && !botonMenu.contains(e.target)) {
            menuNav.classList.remove('activo');
        }
    });

    // 2. Carrusel de imágenes
    const diapositivas = document.querySelectorAll('.diapositiva-carrusel');
    const puntos = document.querySelectorAll('.punto');
    let indiceActual = 0;
    let intervaloCarrusel;

    function mostrarDiapositiva(indice) {
        diapositivas.forEach(d => d.classList.remove('activa'));
        puntos.forEach(p => p.classList.remove('active', 'activa'));
        
        diapositivas[indice].classList.add('activa');
        puntos[indice].classList.add('activo');
        indiceActual = indice;
    }

    function siguienteDiapositiva() {
        let siguienteIndice = (indiceActual + 1) % diapositivas.length;
        mostrarDiapositiva(siguienteIndice);
    }

    intervaloCarrusel = setInterval(siguienteDiapositiva, 4000);

    puntos.forEach(punto => {
        punto.addEventListener('click', () => {
            clearInterval(intervaloCarrusel);
            const indiceSeleccionado = parseInt(punto.getAttribute('data-diapositiva'));
            mostrarDiapositiva(indiceSeleccionado);
            intervaloCarrusel = setInterval(siguienteDiapositiva, 4000);
        });
    });

    // 3. Cajas desplegables (Acordeón de preguntas)
    const botonesDesplegables = document.querySelectorAll('.boton-desplegable');

    botonesDesplegables.forEach(boton => {
        boton.addEventListener('click', () => {
            boton.classList.toggle('activo');
            const contenidoRespuesta = boton.nextElementSibling;
            
            if (contenidoRespuesta.style.maxHeight) {
                contenidoRespuesta.style.maxHeight = null;
                contenidoRespuesta.style.border = '1px solid transparent';
            } else {
                contenidoRespuesta.style.border = '1px solid #c9bda9';
                contenidoRespuesta.style.maxHeight = contenidoRespuesta.scrollHeight + 'px';
            }
        });
    });
});