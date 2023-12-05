// load-menu.js

// Función para cargar el menú desde el archivo JSON
function loadMenu(menuId) {
    fetch('menus.json')  // Ajusta la ruta según la ubicación real de tu archivo JSON
      .then(response => response.json())
      .then(data => {
        const menuData = data[menuId];
        if (menuData) {
          // Llama a una función para construir el menú usando los datos cargados
          buildMenu(menuData);
        }
      })
      .catch(error => console.error('Error al cargar el menú:', error));
  }
  
  // Función para construir el menú a partir de los datos
  function buildMenu(menuData) {
    const indexContainer = document.querySelector('.index-container');
    // Elimina el contenido existente en el contenedor
    indexContainer.innerHTML = '';
  
    // Itera sobre los elementos del menú y crea los botones dinámicamente
    menuData.forEach(item => {
      const button = document.createElement('div');
      button.className = 'additional-button';
      button.innerHTML = item.content;
      // Añade los manejadores de eventos según sea necesario
      button.addEventListener('mouseover', () => eval(item.onmouseover));
      button.addEventListener('mouseout', () => eval(item.onmouseout));
      button.addEventListener('click', () => eval(item.onclick));
  
      // Añade el botón al contenedor
      indexContainer.appendChild(button);
    });
  }
  
  // Llama a la función para cargar el menú específico
  loadMenu('Contar');
  