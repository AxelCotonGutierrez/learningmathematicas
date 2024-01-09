document.addEventListener('DOMContentLoaded', function() {
    // Escuchadores de eventos para los niveles primarios
    document.querySelectorAll('.nivel-primario').forEach(function(nivelPrimario) {
        nivelPrimario.addEventListener('click', function() {
            // Ocultar todos los niveles secundarios, terciarios y detalles
            ocultarTodosLosNiveles();

            // Mostrar los niveles secundarios relacionados con el primario
            var nivelSecundarioId = this.getAttribute('data-target');
            mostrarNivelSecundario(nivelSecundarioId);
        });
    });

    // Escuchadores de eventos para los niveles secundarios
    document.querySelectorAll('.nivel-secundario').forEach(function(nivelSecundario) {
        nivelSecundario.addEventListener('click', function() {
            // Ocultar todos los detalles
            ocultarTodosLosDetalles();

            // Mostrar todos los niveles terciarios asociados con el nivel secundario
            var nivelTerciarioIds = this.getAttribute('data-target').split(',');
            nivelTerciarioIds.forEach(function(id) {
                mostrarNivelTerciario(id);
            });
        });
    });

    // Escuchador de eventos para todos los niveles terciarios
    document.querySelectorAll('.nivel-terciario').forEach(function(nivelTerciario) {
        nivelTerciario.addEventListener('click', function() {
            toggleLevelDetails(this.id + '-detalle');
        });
    });
});

function ocultarTodosLosNiveles() {
    document.querySelectorAll('.nivel-secundario, .nivel-terciario').forEach(function(element) {
        element.style.display = 'none';
    });
}

function ocultarTodosLosDetalles() {
    document.querySelectorAll('[class$="-detalle"]').forEach(function(detail) {
        detail.style.display = 'none';
    });
}

function mostrarNivelSecundario(id) {
    var elemento = document.getElementById(id);
    if (elemento) {
        elemento.style.display = "table-row";
    }
}

function mostrarNivelTerciario(id) {
    var elementos = document.querySelectorAll('[data-parent="' + id + '"]');
    elementos.forEach(function(elemento) {
        elemento.style.display = "table-row";
    });
}

function toggleLevelDetails(clase) {
    document.querySelectorAll('.' + clase).forEach(function(detail) {
        detail.style.display = detail.style.display === "none" ? "table-row" : "none";
    });
}
