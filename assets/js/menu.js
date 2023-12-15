// Función para mostrar el menú correspondiente
function mostrarMenuDesdeURL() {
    // Verificar si hay parámetros en la URL
    var urlParams = new URLSearchParams(window.location.search);
    var menuParam = urlParams.get('menu');

    // Mostrar el menú correspondiente al parámetro en la URL
    if (menuParam) {
        mostrarMenu(menuParam);
    }
}

// Función para mostrar el menú según el ID
function mostrarMenu(menuId) {
    // Oculta todos los menús
    var menus = document.getElementsByClassName('menu');
    for (var i = 0; i < menus.length; i++) {
        menus[i].style.display = 'none';
    }

    // Muestra el menú correspondiente al enlace seleccionado
    var menuSeleccionado = document.getElementById(menuId);
    if (menuSeleccionado) {
        menuSeleccionado.style.display = 'block';
    }
}
function toggleSpoiler(spoiler) {
    var content = spoiler.nextElementSibling;
    if (content.style.display === "none") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}
// Llamar a la función al cargar la página
mostrarMenuDesdeURL();

function buttonHover(button) {
    button.style.border = "2px solid #3679E5";
  
    // Buscar el contenedor '.content' más cercano al botón
    var contentContainer = button.closest('.index-container').querySelector('.content');
    contentContainer.style.display = "block";
  
    var targetContent = button.getAttribute('data-target') || button.innerText;
  
    // Limpiar y actualizar el contenido en el contenedor '.content' encontrado
    contentContainer.innerHTML = targetContent;
  }
  
  function buttonClick(targetIdOrUrl) {
          // Si el parámetro es una URL, carga solo el contenido del body en el contenedor de contenido
          if (isUrl(targetIdOrUrl)) {
              // Realiza una solicitud AJAX para obtener el contenido del body de la URL
              var xhr = new XMLHttpRequest();
              xhr.open('GET', targetIdOrUrl, true);
              xhr.onreadystatechange = function () {
                  if (xhr.readyState == 4 && xhr.status == 200) {
                      var bodyContent = extractBodyContent(xhr.responseText);
                      var content = document.getElementById('contenidoMenu');
                      content.innerHTML = bodyContent;
                      content.style.display = 'block';
                  }
              };
              xhr.send();
          } else {
              // Si no es una URL, asume que es un identificador interno y muestra el contenido correspondiente
              var content = document.getElementById(targetIdOrUrl);
              content.style.display = 'block';
          }
      }
  
     // Función para extraer el contenido del body de una página HTML a partir de la etiqueta <h1>
      function extractBodyContent(html) {
      var bodyStart = html.indexOf('<body>');
      var bodyEnd = html.indexOf('</body>');
  
      if (bodyStart !== -1 && bodyEnd !== -1) {
          var bodyContent = html.substring(bodyStart + 6, bodyEnd);
          var h1Start = bodyContent.indexOf('<h1>');
  
          if (h1Start !== -1) {
              var footerStart = bodyContent.indexOf('<footer>');
  
              if (footerStart !== -1) {
                  // Si hay un footer, ajusta la posición de finalización del contenido del body
                  bodyContent = bodyContent.substring(h1Start, footerStart);
              } else {
                  // Si no hay un footer, simplemente extrae desde la etiqueta <h1>
                  bodyContent = bodyContent.substring(h1Start);
              }
  
              return bodyContent;
          }
      }
  
      return html;
  }
  
      function isUrl(str) {
          // Función simple para verificar si una cadena parece ser una URL
          return str.startsWith('http') || str.startsWith('www');
      }
  
  function buttonOut(button) {
    if (button.classList.contains('additional-button')) {
      // Restaurar el color solo si es un botón adicional
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

// Usar esta función después de cargar e insertar el contenido
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var bodyContent = extractBodyContent(xhr.responseText);
        var content = document.getElementById('contenidoMenu');
        content.innerHTML = bodyContent;
        executeScripts(content); // Ejecutar los scripts después de insertar el contenido
        content.style.display = 'block';
    }
};

