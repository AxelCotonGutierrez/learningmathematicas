document.addEventListener("DOMContentLoaded", function() {
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
    } else {
        console.error("Placeholder para el footer NO encontrado.");
    }
});
