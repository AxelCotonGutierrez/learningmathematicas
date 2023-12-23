function redirectToTagPage(tag) {
    localStorage.setItem('selectedTag', tag);
    window.location.href = '/learningmathematicas/tags/';
  }
  
  // El resto del código que maneja la lógica en la página de tags
  document.addEventListener('DOMContentLoaded', function() {
    var selectedTag = localStorage.getItem('selectedTag');
    if (selectedTag) {
      var selectedDiv = document.getElementById(selectedTag);
      if (selectedDiv) {
        selectedDiv.style.display = 'block';
      }
      localStorage.removeItem('selectedTag'); // Limpiar la etiqueta seleccionada
    }
  });
  