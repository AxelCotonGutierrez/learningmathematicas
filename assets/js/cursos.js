// Array para almacenar los botones activos
var botonesActivos = [];

function toggleBoton(botonId) {
    var boton = document.getElementById('activar_' + botonId);
    var filas = document.querySelectorAll('.fila_oculta[data-codigos*="' + botonId + '"]');
    
    // Verifica si el botón actual está activo
    var botonActivo = boton.classList.contains('on');

    // Oculta o muestra las filas según el estado del botón
    filas.forEach(function(fila) {
        fila.style.display = botonActivo ? 'none' : 'table-row';
    });

    // Cambia el estado del botón y actualiza el array de botones activos
    boton.classList.toggle('on');
    if (botonActivo) {
        var index = botonesActivos.indexOf(botonId);
        if (index !== -1) {
            botonesActivos.splice(index, 1);
        }
    } else {
        botonesActivos.push(botonId);
    }

    // Llama a la función para gestionar la visibilidad de las filas
    gestionarVisibilidadFilas();
}

// Función para gestionar la visibilidad de las filas
function gestionarVisibilidadFilas() {
    var filas = document.querySelectorAll('.fila_oculta');
    
    filas.forEach(function (fila) {
        var codigos = fila.getAttribute('data-codigos').split(' ');
        
        // Verifica si alguna fila depende de un botón activo
        var filaVisible = codigos.some(function (codigo) {
            return botonesActivos.includes(codigo);
        });
        
        fila.style.display = filaVisible ? 'table-row' : 'none';
    });
}
