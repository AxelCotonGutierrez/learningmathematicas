document.addEventListener('DOMContentLoaded', function() {
    // Comprueba si hay un fragmento de URL y muestra el nivel correspondiente
    var fragment = window.location.hash;
    if (fragment) {
        showLevelDetail(fragment.substring(1));
    }
});

function showLevelDetail(levelId) {
    // Encuentra el contenedor del nivel y los contenedores de subniveles asociados
    var levelDetail = document.getElementById(levelId);
    if (levelDetail) {
        var subLevelContainer = levelDetail.closest('.level-details');
        var mainLevelContainer = subLevelContainer.closest('.sub-levels');

        // Expande los subniveles y el nivel principal correspondiente
        toggleSubLevels(mainLevelContainer.id);
        toggleSubLevels(subLevelContainer.id);

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
