// Función para mostrar el menú correspondiente
function mostrarMenuDesdeURL() {
    var urlParams = new URLSearchParams(window.location.search);
    var menuParam = urlParams.get('menu');
    if (menuParam) {
        mostrarMenu(menuParam);
    }
}

// Función para mostrar el menú según el ID
function mostrarMenu(menuId) {
    var menus = document.getElementsByClassName('menu');
    for (var i = 0; i < menus.length; i++) {
        menus[i].style.display = 'none';
    }
    var menuSeleccionado = document.getElementById(menuId);
    if (menuSeleccionado) {
        menuSeleccionado.style.display = 'block';
    }
}

// Función para alternar la visibilidad del spoiler
function toggleSpoiler(spoiler) {
    var content = spoiler.nextElementSibling;
    if (content.style.display === "none") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}

// Llamar a mostrarMenuDesdeURL al cargar la página
mostrarMenuDesdeURL();

function buttonHover(button) {
    button.style.border = "2px solid #3679E5";
    var contentContainer = button.closest('.index-container').querySelector('.content');
    contentContainer.style.display = "block";
    var targetContent = button.getAttribute('data-target') || button.innerText;
    contentContainer.innerHTML = targetContent;
}

function buttonClick(targetIdOrUrl) {
    // Primero, limpiamos el contenido existente
    var content = document.getElementById('contenidoMenu');
    content.innerHTML = '';

    // Luego, procedemos como antes
    if (isUrl(targetIdOrUrl)) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', targetIdOrUrl, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var bodyContent = extractBodyContent(xhr.responseText);
                content.innerHTML = bodyContent;
                executeScripts(content);
                content.style.display = 'block';
            }
        };
        xhr.send();
    } else {
        var selectedContent = document.getElementById(targetIdOrUrl);
        selectedContent.style.display = 'block';
    }
}


function extractBodyContent(html) {
    var bodyStart = html.indexOf('<body>');
    var bodyEnd = html.indexOf('</body>');
    if (bodyStart !== -1 && bodyEnd !== -1) {
        var bodyContent = html.substring(bodyStart + 6, bodyEnd);
        var h1Start = bodyContent.indexOf('<h1>');
        if (h1Start !== -1) {
            var footerStart = bodyContent.indexOf('<footer>');
            if (footerStart !== -1) {
                bodyContent = bodyContent.substring(h1Start, footerStart);
            } else {
                bodyContent = bodyContent.substring(h1Start);
            }
            return bodyContent;
        }
    }
    return html;
}

function isUrl(str) {
    return str.startsWith('http') || str.startsWith('www');
}

function buttonOut(button) {
    if (button.classList.contains('additional-button')) {
        button.style.border = "none";
    }
    document.getElementById('content').style.display = "none";
}

function executeScripts(containerElement) {
    var scripts = containerElement.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        var originalScript = scripts[i];
        var scriptCopy = document.createElement('script');
        if (originalScript.src) {
            scriptCopy.src = originalScript.src;
        } else {
            scriptCopy.text = originalScript.text;
        }
        document.head.appendChild(scriptCopy);
        document.head.removeChild(scriptCopy);
    }
}
