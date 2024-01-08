document.addEventListener('DOMContentLoaded', function() {
    // Escuchadores de eventos para los niveles primarios y secundarios
    document.querySelectorAll('.nivel-primario, .nivel-secundario').forEach(function(nivel) {
        nivel.addEventListener('click', function() {
            // Encuentra el nivel o subnivel asociado y alterna su visibilidad
            var targetId = this.getAttribute('data-target');
            toggleSubLevels(targetId);
        });
    });

    // Escuchador de eventos para el nivel terciario "Contar"
    var nivelContar = document.getElementById('terciario-contar');
    if (nivelContar) {
        nivelContar.addEventListener('click', function() {
            // Alterna los detalles de "Contar"
            toggleLevelDetails('detalle-contar');
        });
    }
});

function toggleSubLevels(subLevelId) {
    var subLevel = document.getElementById(subLevelId);
    if (subLevel) {
        subLevel.style.display = subLevel.style.display === "none" ? "table-row" : "none";
    }

    // Ocultar también los detalles de "Contar" si se está ocultando un subnivel
    if (subLevelId === 'subnivel-matematicas' && subLevel.style.display === "none") {
        var detallesContar = document.querySelectorAll('.detalle-contar');
        detallesContar.forEach(function(detalle) {
            detalle.style.display = "none";
        });
    }
}

function toggleLevelDetails(levelClass) {
    var levelDetails = document.querySelectorAll('.' + levelClass);
    levelDetails.forEach(function(detail) {
        detail.style.display = detail.style.display === "none" ? "table-row" : "none";
    });
}
