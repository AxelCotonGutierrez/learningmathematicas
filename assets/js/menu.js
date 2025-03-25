// Mostrar el menú desde la URL
function mostrarMenuDesdeURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const menuParam = urlParams.get('menu');
  if (menuParam) mostrarMenu(menuParam);
}

// Mostrar el menú con estructura lateral
function mostrarMenu(menuId) {
  const menus = document.getElementsByClassName('menu');
  for (let i = 0; i < menus.length; i++) {
    menus[i].style.display = 'none';
  }

  const menuSeleccionado = document.getElementById(menuId);
  if (menuSeleccionado) {
    menuSeleccionado.style.display = 'flex';
    insertarBotonPantallaCompleta(); // Botón fullscreen

    const contenedorIndex = menuSeleccionado.querySelector('.index-container');
    if (contenedorIndex) {
      const index = contenedorIndex.querySelector('#index1');
      const visor = document.getElementById('visor');
      if (index && visor) {
        cargarMenuLateral(menuId, index, visor);
      }
    }
  }
}

// Cargar el JSON del menú y construir lista + visor
function cargarMenuLateral(menuId, listaContenedor, visorContenedor) {
  fetch('/learningmathematicas/assets/js/jsonmenu/menu-' + menuId + '.json')
    .then(res => res.json())
    .then(data => {
      listaContenedor.innerHTML = '';
      visorContenedor.innerHTML = '';

      // Título del tema
      const titulo = document.createElement('h1');
      titulo.textContent = data.titulo;
      titulo.style.textAlign = 'center';
      titulo.style.padding = '1rem';
      titulo.style.fontSize = '1.8rem';
      listaContenedor.appendChild(titulo);

      // Botones del menú
      data.bloques.forEach((bloque, index) => {
        const boton = document.createElement('button');
        boton.className = 'menu-boton';
        boton.textContent = bloque.texto;

        boton.addEventListener('click', () => {
          visorContenedor.innerHTML = ''; // Limpiar visor

          const contenido = document.createElement('div');
          contenido.className = 'visor-bloque';

          const titulo = document.createElement('h2');
          titulo.textContent = bloque.texto;

          const cuerpo = document.createElement('div');
          cuerpo.className = 'contenido';

          if (bloque.contenido) {
            cuerpo.innerHTML = bloque.contenido;
          } else if (bloque.url) {
            fetch(bloque.url)
              .then(response => response.text())
              .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const bodyContent = doc.body ? doc.body.innerHTML : '<p>Contenido no disponible.</p>';
                cuerpo.innerHTML = bodyContent;
              })
              .catch(error => {
                cuerpo.innerHTML = '<p style="color:red;">Error al cargar el contenido externo.</p>';
                console.error('Error al cargar la URL externa:', error);
              });
          } else {
            cuerpo.textContent = 'Contenido no disponible.';
          }

          contenido.appendChild(titulo);
          contenido.appendChild(cuerpo);
          visorContenedor.appendChild(contenido);
        });

        listaContenedor.appendChild(boton);
      });
    });
}

// Insertar botón de pantalla completa automáticamente
function insertarBotonPantallaCompleta() {
  const menuContenedor = document.querySelector('.menu');
  if (menuContenedor && !document.getElementById('fullscreen-toggle')) {
    const btnToggle = document.createElement('button');
    btnToggle.id = 'fullscreen-toggle';
    btnToggle.textContent = '🔳 Pantalla completa';

    const indexContainer = menuContenedor.querySelector('.index-container');
    if (indexContainer) {
      indexContainer.insertBefore(btnToggle, indexContainer.firstChild);
    }

    btnToggle.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        menuContenedor.requestFullscreen().then(() => {
          btnToggle.textContent = '❌ Salir de pantalla completa';
        });
      } else {
        document.exitFullscreen().then(() => {
          btnToggle.textContent = '🔳 Pantalla completa';
        });
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarMenuDesdeURL();
});
