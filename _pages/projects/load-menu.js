// Función para cargar el menú específico
const loadMenu = async (menuId) => {
    const response = await fetch('menus.json');
    const menus = await response.json();
  
    const menu = menus[menuId];
  
    if (menu) {
      const indexContainer = document.querySelector('.index');
      indexContainer.innerHTML = `<h1 style="text-align: center;">${menuId}</h1>`;
      
      const buttonsContainer = document.querySelector('.button-container');
      buttonsContainer.innerHTML = ''; // Limpiar contenido anterior
  
      // Crear botones dinámicamente
      menu.forEach((buttonData) => {
        const button = document.createElement('div');
        button.classList.add('additional-button');
        button.innerHTML = `<b>${buttonData.label}</b>`;
        
        // Asignar atributos a los eventos
        button.onmouseover = () => eval(buttonData.onmouseover);
        button.onmouseout = () => eval(buttonData.onmouseout);
        button.onclick = () => eval(buttonData.onclick);
  
        buttonsContainer.appendChild(button);
      });
    } else {
      console.error(`Menu with ID '${menuId}' not found.`);
    }
  };
  
  // Cargar menú al cargar la página (puedes cambiar el nombre del menú según sea necesario)
  loadMenu('Contar');
  