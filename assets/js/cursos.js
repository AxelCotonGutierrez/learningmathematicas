function toggleBoton(botonId) {
    var boton = document.getElementById('activar_' + botonId);
    var filas = document.querySelectorAll('.fila_oculta[data-codigos*="' + botonId + '"]');
    var contenedorPrincipal = document.getElementById('contenedor-principal');
    var subcontenedor = document.querySelector('.subcontenedor');

    // Verifica si el botón actual está activo
    var botonActivo = boton.classList.contains('on');

    // Oculta o muestra las filas según el estado del botón
    filas.forEach(function(fila) {
        fila.style.display = botonActivo ? 'none' : 'table-row';
    });

    // Cambia el estado del botón
    boton.classList.toggle('on');

    // Verifica si hay alguna fila visible
    var algunaFilaVisible = Array.from(filas).some(function(fila) {
        return fila.style.display !== 'none';
    });

    // Cambia el estilo del borde directamente
    contenedorPrincipal.style.border = algunaFilaVisible ? '2px solid #000' : 'none';
    subcontenedor.style.border = algunaFilaVisible ? '1px solid #ddd' : 'none';
}
