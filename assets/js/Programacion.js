document.addEventListener('DOMContentLoaded', function() {
    // Escuchadores de eventos para los niveles primarios
    document.querySelectorAll('.nivel-primario').forEach(function(nivel) {
        nivel.addEventListener('click', function() {
            toggleNiveles('nivel-secundario');
        });
    });

    // Escuchadores de eventos para los niveles secundarios
    document.querySelectorAll('.nivel-secundario').forEach(function(subnivel) {
        subnivel.addEventListener('click', function() {
            toggleNiveles('nivel-terciario');
        });
    });

    // Función para alternar la visibilidad de los niveles
    function toggleNiveles(claseNivel) {
        document.querySelectorAll(`.${claseNivel}`).forEach(nivel => {
            nivel.style.display = nivel.style.display === 'none' ? '' : 'none';
        });
    }
});
