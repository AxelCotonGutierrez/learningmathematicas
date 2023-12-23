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
  