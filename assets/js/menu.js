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
  
    // Si el menú tiene versión JSON, cargarla:
    const contenedorIndex = menuSeleccionado.querySelector('.index-container');
    if (contenedorIndex) {
      const index = contenedorIndex.querySelector('#index1');
      if (index) {
        cargarMenuJSON(menuId, index); // <--- esta es la llamada al fetch
      }
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
    if (isUrl(targetIdOrUrl)) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', targetIdOrUrl, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var bodyContent = extractBodyContent(xhr.responseText);
                var content = document.getElementById('contenidoMenu');
                content.innerHTML = bodyContent;
                executeScripts(content);
                content.style.display = 'block';
            }
        };
        xhr.send();
    } else {
        var content = document.getElementById(targetIdOrUrl);
        content.style.display = 'block';
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
function cargarMenuJSON(menuId) {
    fetch('/learningmathematicas/assets/js/jsonmenu/menu-' + menuId + '.json')
      .then(res => res.json())
      .then(data => {
        const contenedor = document.getElementById("index1");
        contenedor.innerHTML = `
          <h1 style="text-align: center;">${data.titulo}</h1>
          <div class="button-container" id="botonera"></div>
          <div class="content" id="content"><h2>Texto de Sección 1</h2></div>
        `;
  
        const botonera = document.getElementById("botonera");
  
        const simbolos = {
          CP: "📚",
          TD: "📄",
          S: "🧮",
          V: "🎬",
          A: "🧰",
          ET: "📝",
          ER: "✅"
        };
  
        data.bloques.forEach(b => {
          const btn = document.createElement("div");
          btn.className = "additional-button";
          btn.innerHTML = `<b>(${b.categoria}) ${simbolos[b.categoria] || ""} ${b.texto}</b>`;
  
          if (b.url) {
            btn.setAttribute("onclick", `buttonClick('${b.url}')`);
          }
  
          if (b.contenido) {
            btn.setAttribute("data-target", b.contenido);
            btn.setAttribute("onmouseover", "buttonHover(this)");
            btn.setAttribute("onmouseout", "buttonOut(this)");
          }
  
          botonera.appendChild(btn);
        });
      });
  }
  