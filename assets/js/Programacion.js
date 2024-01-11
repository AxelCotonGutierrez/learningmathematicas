document.addEventListener('DOMContentLoaded', function() {
    // Escuchadores de eventos para los niveles primarios
    document.querySelectorAll('.nivel-primario').forEach(function(nivelPrimario) {
        nivelPrimario.addEventListener('click', function() {
            // Ocultar todos los niveles secundarios, terciarios y detalles
            document.querySelectorAll('.nivel-secundario, .nivel-terciario, [class*="-detalle"]').forEach(function(element) {
                element.style.display = 'none';
            });

            // Mostrar todos los niveles secundarios relacionados con este nivel primario
            document.querySelectorAll('[data-parent="' + this.id + '"]').forEach(function(subLevel) {
                subLevel.style.display = 'table-row';
            });
        });
    });

    // Escuchadores de eventos para los niveles secundarios
    document.querySelectorAll('.nivel-secundario').forEach(function(nivelSecundario) {
        nivelSecundario.addEventListener('click', function() {
            // Ocultar todos los niveles terciarios y detalles no relacionados con este nivel secundario
            document.querySelectorAll('.nivel-terciario, [class*="-detalle"]').forEach(function(element) {
                if (element.getAttribute('data-parent') !== nivelSecundario.id) {
                    element.style.display = 'none';
                }
            });

            // Mostrar todos los niveles terciarios relacionados con este nivel secundario
            document.querySelectorAll('[data-parent="' + this.id + '"]').forEach(function(terciario) {
                terciario.style.display = 'table-row';
            });
        });
    });

    // Escuchador de eventos para todos los niveles terciarios
    document.querySelectorAll('.nivel-terciario').forEach(function(nivelTerciario) {
        nivelTerciario.addEventListener('click', function() {
            // Alternar los detalles asociados con este nivel terciario
            var detallesClase = this.id + '-detalle';
            document.querySelectorAll('.' + detallesClase).forEach(function(detalle) {
                detalle.style.display = detalle.style.display === "none" ? "table-row" : "none";
            });
        });
    });
});
function mostrarMensaje() {
    alert('Próximamente');
}