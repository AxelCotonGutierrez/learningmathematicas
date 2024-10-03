document.addEventListener("DOMContentLoaded", function() {
    // Código del encabezado
    const headerHTML = `
    <div class="menu">
        <button class="menu-toggle">☰</button>
        <ul>
            <li><a href="https://axelcotongutierrez.github.io/learningmathematicas/">
                <img src="cb.jpg"> 
            </a></li>
            <li><a href="/learningmathematicas/projects/Cursos/">Cursos y Materias</a></li>
            <li><a href="/learningmathematicas/projects/Niveles/">Niveles</a></li>
            <li><a href="/learningmathematicas/">Entradas</a></li>
            <li><a href="/learningmathematicas/tags">Etiquetas</a></li>
            <li><a href="/learningmathematicas/about">Blog</a></li>
            <li><a href="#">Utilidades</a>
                <ul>
                    <li><a href="/learningmathematicas/projects/Utilidades/Glosario.html">Glosario</a></li>
                    <li><a href="/learningmathematicas/projects/Utilidades/Programacion.html">Programación</a></li>
                    <li><a href="/learningmathematicas/projects/Utilidades/Soroban.html">Soroban</a></li>
                </ul>
            </li>
        </ul>
    </div>
    <a href="https://axelcotongutierrez.github.io/learningmathematicas/">
        <img src="https://axelcotongutierrez.github.io/learningmathematicas/assets/images//top.jpg" alt="Blog Mathematica" style="display: block; margin: 0 auto; width: 100%; height: auto;">
    </a>
    `;
    
    const headerElement = document.createElement('header');
    headerElement.innerHTML = headerHTML;
    document.body.insertBefore(headerElement, document.body.firstChild);

    // Navegación: Lógica para el menú
    var menuToggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('.menu');
      
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
});


// Código del pie de página
const footerHTML = `
<footer class="footer">
    <ul class="footer-links">
        <li><a href="http://github.com/AxelCotonGutierrez"> <img src="githubinverseicon.jpg"></a></li>
        <li><a href="https://www.youtube.com/@learningmathematicas"> <img src="youtubeinverseicon.jpg"></i></a></li>
    </ul>
</footer>
`;


// Insertar el pie de página en el placeholder
const footerPlaceholder = document.getElementById('footer-placeholder');
if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerHTML;
}
