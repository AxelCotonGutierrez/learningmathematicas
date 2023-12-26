document.addEventListener('DOMContentLoaded', function() {
    // Comprueba si hay un fragmento de URL y muestra el nivel correspondiente
    var fragment = window.location.hash;
    if (fragment) {
        showLevelDetail(fragment.substring(1));
    }

    // Eventos de clic para botones de niveles principales y subniveles
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function() {
            var targetId = this.getAttribute('data-target');
            if (targetId.startsWith('sub-levels')) {
                toggleSubLevels(targetId);
            } else if (targetId.startsWith('level-')) {
                toggleLevelDetails(targetId);
            }
        });
    });
});

function showLevelDetail(levelId) {
    // Asegúrate de que el nivel y los subniveles correspondientes estén visibles
    var levelDetail = document.getElementById(levelId);
    if (levelDetail) {
        var parentSubLevelId = levelDetail.closest('.sub-levels').id;
        var parentMainLevelButton = document.querySelector(`[data-target='#${parentSubLevelId}']`);

        // Muestra los niveles y subniveles correspondientes
        if (parentMainLevelButton) {
            toggleSubLevels(parentSubLevelId);
            toggleLevelDetails(parentMainLevelButton.getAttribute('data-target'));
        }

        // Expande el detalle del nivel
        toggleLevelDetails(levelId);
    }
}

// Funciones existentes
function toggleSubLevels(subLevelId) {
    var subLevel = document.getElementById(subLevelId);
    if (subLevel.style.display === "none" || !subLevel.style.display) {
        subLevel.style.display = "block";
    } else {
        subLevel.style.display = "none";
    }
}

function toggleLevelDetails(levelId) {
    var levelDetail = document.getElementById(levelId);
    if (levelDetail.style.display === "none" || !levelDetail.style.display) {
        levelDetail.style.display = "block";
    } else {
        levelDetail.style.display = "none";
    }
}

// Función para manejar el cambio de URL (opcional)
window.onhashchange = function() {
    if (window.location.hash) {
        showLevelDetail(window.location.hash.substring(1));
    }
}
