document.addEventListener('DOMContentLoaded', function() {
    // Verificar si la URL tiene un fragmento (por ejemplo, #level-1)
    var hash = window.location.hash;
    if (hash) {
        showLevel(hash.substring(1));
    }

    // Evento de clic para mostrar/ocultar secciones
    document.querySelectorAll('#accordion .card-link, #accordion .level-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Previene cualquier desplazamiento
            var sectionId = this.getAttribute('data-target');
            toggleSection(sectionId);
        });
    });
});

function showLevel(levelId) {
    // Ocultar todos los niveles
    document.querySelectorAll('.level-content').forEach(level => {
        level.classList.remove('show');
    });
    // Mostrar el nivel seleccionado
    var selectedLevel = document.getElementById(levelId);
    if (selectedLevel) {
        selectedLevel.classList.add('show');
    }
}

function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.classList.toggle('show');
    }
}
