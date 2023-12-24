// Función para manejar los enlaces internos
function redirectToTagPage(tag) {
  localStorage.setItem('selectedTag', tag);
  window.location.href = '/learningmathematicas/tags/';
}

// Esperar a que el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
  // Manejar la navegación interna usando localStorage
  var selectedTagLocalStorage = localStorage.getItem('selectedTag');
  if (selectedTagLocalStorage) {
      showTagContent(selectedTagLocalStorage);
      localStorage.removeItem('selectedTag'); // Limpiar la etiqueta seleccionada
  }

  // Manejar el fragmento de URL para la navegación directa
  var urlParams = new URLSearchParams(window.location.search);
  var tagParam = urlParams.get('tag');
  if (tagParam) {
      showTagContent(slugify(tagParam));
  }
  console.log(tagParam);


  function showTagContent(tagSlug) {
    console.log("Mostrando contenido para: " + tagSlug); // Para depuración
    var selectedDiv = document.getElementById(tagSlug);
    if (selectedDiv) {
        console.log("Encontrado div: " + tagSlug); // Para depuración
        var relatedPostsDivs = document.querySelectorAll('.related-posts');
        relatedPostsDivs.forEach(function(div) {
            div.style.display = 'none';
        });
        selectedDiv.style.display = 'block';
    } else {
        console.log("Div no encontrado para: " + tagSlug); // Para depuración
    }
}



  function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Reemplaza espacios con -
        .replace(/[^\w\-]+/g, '')       // Elimina todos los caracteres que no sean palabra, guiones o guiones bajos
        .replace(/\-\-+/g, '-')         // Reemplaza múltiples - con un solo -
        .replace(/^-+/, '')             // Recorta - del inicio del texto
        .replace(/-+$/, '');            // Recorta - del final del texto
}

});
