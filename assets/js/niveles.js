document.addEventListener('DOMContentLoaded', function() {
    // Verificar si la URL tiene un fragmento (por ejemplo, #nivel1)
    var hash = window.location.hash;
    if (hash) {
        showLevel(hash.substring(1));
    }

    // Evento de clic para mostrar/ocultar secciones
    document.querySelectorAll('.level-group a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSection(this.getAttribute('href').substring(1));
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

function toggleSection(sectionId, event) {
    event.preventDefault();  // Prevenir el comportamiento predeterminado del enlace

    var section = document.getElementById(sectionId);
    if (section.classList.contains('show')) {
        section.classList.remove('show');
    } else {
        section.classList.add('show');
    }
}
