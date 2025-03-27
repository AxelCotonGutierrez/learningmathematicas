function mostrarMenuDesdeURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const menuParam = urlParams.get('menu');
  if (menuParam) mostrarMenu(menuParam);
}

function mostrarMenu(menuId) {
  const menus = document.getElementsByClassName('menu');
  for (let i = 0; i < menus.length; i++) {
    menus[i].style.display = 'none';
  }

  const menuSeleccionado = document.getElementById(menuId);
  if (menuSeleccionado) {
    menuSeleccionado.style.display = 'flex';

    const contenedorIndex = menuSeleccionado.querySelector('.index-container');
    const index = contenedorIndex.querySelector('#index1');
    const visor = document.getElementById('visor');

    if (index && visor) {
      insertarBotonPantallaCompleta(); // botón se inserta antes de cargar el contenido
      cargarMenuLateral(menuId, contenedorIndex, visor);
    }
  }
}

function cargarMenuLateral(menuId, listaContenedor, visorContenedor) {
  fetch('/learningmathematicas/assets/js/jsonmenu/menu-' + menuId + '.json')
    .then(res => res.json())
    .then(data => {
      const index1 = listaContenedor.querySelector('#index1');
      if (index1) index1.innerHTML = '';
      visorContenedor.innerHTML = '';

      // 1. Título del menú
      if (!document.getElementById('titulo-menu')) {
        const titulo = document.createElement('h1');
        titulo.id = 'titulo-menu';
        titulo.textContent = data.titulo;
        titulo.style.textAlign = 'center';
        titulo.style.padding = '1rem';
        titulo.style.fontSize = '1.8rem';
        titulo.style.color = '#f0c040';
        listaContenedor.insertBefore(titulo, index1);
      }

      // 2. Botón hamburguesa (solo en móvil, una sola vez)
      if (window.innerWidth <= 768 && !document.getElementById('menu-toggle')) {
        const botonHamburguesa = document.createElement('button');
        botonHamburguesa.id = 'menu-toggle';
        botonHamburguesa.className = 'hamburguesa';
        botonHamburguesa.textContent = '☰ Menú';
        listaContenedor.insertBefore(botonHamburguesa, index1);

        botonHamburguesa.addEventListener('click', () => {
          listaContenedor.classList.toggle('mostrar');
        });
      }

      // 3. Mostrar título en visor principal
      const portada = document.createElement('div');
      portada.className = 'visor-portada';
      const tituloGrande = document.createElement('h1');
      tituloGrande.textContent = data.titulo;
      tituloGrande.className = 'titulo-portada';
      portada.appendChild(tituloGrande);
      visorContenedor.appendChild(portada);

      // 4. Botones del menú
      data.bloques.forEach((bloque, index) => {
        const boton = document.createElement('button');
        boton.className = 'menu-boton';
        boton.textContent = bloque.texto;

        boton.addEventListener('click', () => {
          visorContenedor.innerHTML = '';

          const bloqueDiv = document.createElement('div');
          bloqueDiv.className = 'visor-bloque';

          const titulo = document.createElement('h2');
          titulo.textContent = bloque.texto;

          const cuerpo = document.createElement('div');
          cuerpo.className = 'contenido';

          // Contenido
          if (bloque.contenido) {
            const intro = document.createElement('div');
            intro.innerHTML = bloque.contenido;
            cuerpo.appendChild(intro);
          }

          if (bloque.video) {
            const iframe = document.createElement('iframe');
            iframe.src = bloque.video;
            iframe.allowFullscreen = true;
            iframe.className = 'video-embed';
            cuerpo.appendChild(iframe);
          } else if (bloque.imagen && bloque.link) {
            const enlace = document.createElement('a');
            enlace.href = bloque.link;
            enlace.target = '_blank';
            const img = document.createElement('img');
            img.src = bloque.imagen;
            img.alt = 'Actividad';
            img.className = 'actividad-img';
            enlace.appendChild(img);
            cuerpo.appendChild(enlace);
          } else if (bloque.textoExtra) {
            const extra = document.createElement('div');
            extra.innerHTML = bloque.textoExtra;
            cuerpo.appendChild(extra);
          }

          bloqueDiv.appendChild(titulo);
          bloqueDiv.appendChild(cuerpo);
          visorContenedor.appendChild(bloqueDiv);

          // Ocultar menú en móvil
          if (window.innerWidth <= 768) {
            listaContenedor.classList.remove('mostrar');
          }
        });

        index1.appendChild(boton);
      });
    });
}

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
