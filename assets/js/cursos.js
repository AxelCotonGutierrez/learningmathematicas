function toggleBoton(botonId) {
    var boton = document.getElementById('activar_' + botonId);
    var filas = document.querySelectorAll('.fila_oculta[data-codigos*="' + botonId + '"]');
    var contenedorPrincipal = document.getElementById('contenedor-principal');

    // Verifica si el botón actual está activo
    var botonActivo = boton.classList.contains('on');

    // Oculta o muestra las filas según el estado del botón
    filas.forEach(function(fila) {
        fila.style.display = botonActivo ? 'none' : 'table-row';
    });

    // Cambia el estado del botón
    boton.classList.toggle('on');

    // Verifica si hay al menos un botón activo
    var algunBotonActivo = document.querySelector('.boton_menu_cursos.on');

    // Agrega o quita la clase según el estado de los botones
    contenedorPrincipal.classList.toggle('sin-borde', !algunBotonActivo);
}