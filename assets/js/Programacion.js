document.addEventListener('DOMContentLoaded', function() {
    // Escuchadores de eventos para los niveles primarios y secundarios
    document.querySelectorAll('.nivel-primario, .nivel-secundario').forEach(function(nivel) {
        nivel.addEventListener('click', function() {
            // Encuentra el nivel o subnivel asociado y alterna su visibilidad
            var targetId = this.getAttribute('data-target');
            toggleSubLevels(targetId);
        });
    });

    // Escuchador de eventos para todos los niveles terciarios
    document.querySelectorAll('.nivel-terciario').forEach(function(nivelTerciario) {
        nivelTerciario.addEventListener('click', function() {
            // Encuentra y alterna los detalles asociados con este nivel terciario
            var detallesClase = nivelTerciario.id + '-detalle';
            toggleLevelDetails(detallesClase);
        });
    });
});

function toggleSubLevels(subLevelId) {
    var subLevel = document.getElementById(subLevelId);
    if (subLevel) {
        subLevel.style.display = subLevel.style.display === "none" ? "table-row" : "none";
    }
}

function toggleLevelDetails(detallesClase) {
    document.querySelectorAll('.' + detallesClase).forEach(function(detail) {
        detail.style.display = detail.style.display === "none" ? "table-row" : "none";
    });
}
