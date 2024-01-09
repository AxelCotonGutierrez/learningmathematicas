document.addEventListener('DOMContentLoaded', function() {
    // Escuchadores de eventos para los niveles primarios
    document.querySelectorAll('.nivel-primario').forEach(function(nivelPrimario) {
        nivelPrimario.addEventListener('click', function() {
            // Ocultar todos los niveles secundarios, terciarios y detalles
            document.querySelectorAll('.nivel-secundario, .nivel-terciario').forEach(function(element) {
                element.style.display = 'none';
            });
            document.querySelectorAll('[class$="-detalle"]').forEach(function(detail) {
                detail.style.display = 'none';
            });

            // Mostrar solo el nivel secundario relacionado
            var targetId = this.getAttribute('data-target');
            toggleSubLevels(targetId, true);
        });
    });

    // Escuchadores de eventos para los niveles secundarios
    document.querySelectorAll('.nivel-secundario').forEach(function(nivelSecundario) {
        nivelSecundario.addEventListener('click', function() {
            var targetId = this.getAttribute('data-target');
            toggleSubLevels(targetId);
        });
    });

    // Escuchador de eventos para todos los niveles terciarios
    document.querySelectorAll('.nivel-terciario').forEach(function(nivelTerciario) {
        nivelTerciario.addEventListener('click', function() {
            var detallesClase = nivelTerciario.id + '-detalle';
            toggleLevelDetails(detallesClase);
        });
    });
});

function toggleSubLevels(subLevelId, isPrimary = false) {
    var subLevel = document.getElementById(subLevelId);
    if (subLevel) {
        if (isPrimary) {
            // Si es nivel primario, mostrar directamente el subnivel
            subLevel.style.display = "table-row";
        } else {
            // Para niveles secundarios, alternar la visibilidad
            subLevel.style.display = subLevel.style.display === "none" ? "table-row" : "none";
        }
    }
}

function toggleLevelDetails(detallesClase) {
    document.querySelectorAll('.' + detallesClase).forEach(function(detail) {
        detail.style.display = detail.style.display === "none" ? "table-row" : "none";
    });
}
