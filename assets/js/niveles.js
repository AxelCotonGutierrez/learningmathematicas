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
            var sectionId = this.getAttribute('data-target') || this.getAttribute('href').substring(1);
            toggleSection(sectionId);
        });
    });
});

function showLevel(levelId) {
    // Encontrar el nivel y las secciones padre correspondientes
    var levelSection = document.getElementById(levelId);
    var parentSections = getParentSections(levelSection);

    // Mostrar todas las secciones padre y el nivel
    parentSections.forEach(section => {
        if (section && !section.classList.contains('show')) {
            section.classList.add('show');
        }
    });
    if (levelSection && !levelSection.classList.contains('show')) {
        levelSection.classList.add('show');
    }
}

function getParentSections(element) {
    var parents = [];
    while (element) {
        if (element.matches('.collapse')) {
            parents.push(element);
        }
        element = element.parentElement;
    }
    return parents.reverse();
}

function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.classList.toggle('show');
    }
}
