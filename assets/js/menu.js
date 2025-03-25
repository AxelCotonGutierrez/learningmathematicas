// Mostrar el menú desde la URL
function mostrarMenuDesdeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const menuParam = urlParams.get('menu');
    if (menuParam) mostrarMenu(menuParam);
  }
  
  // Mostrar el menú y cargar el JSON como diapositivas estilo Canvas
  function mostrarMenu(menuId) {
    const menus = document.getElementsByClassName('menu');
    for (let i = 0; i < menus.length; i++) {
      menus[i].style.display = 'none';
    }
    const menuSeleccionado = document.getElementById(menuId);
    if (menuSeleccionado) {
      menuSeleccionado.style.display = 'block';
      const contenedorIndex = menuSeleccionado.querySelector('.index-container');
      if (contenedorIndex) {
        const index = contenedorIndex.querySelector('#index1');
        if (index) {
          cargarMenuJSON(menuId, index);
        }
      }
    }
  }
  
  // Cargar menú desde JSON y generar las "slides"
  function cargarMenuJSON(menuId, contenedor) {
    fetch('/learningmathematicas/assets/js/jsonmenu/menu-' + menuId + '.json')
      .then(res => res.json())
      .then(data => {
        const simbolos = {
          CP: "📚",
          TD: "📄",
          T: "📘",
          V: "🎬",
          A: "🧰",
          J: "🎮",
          ET: "📝",
          ER: "✅"
        };
  
        contenedor.innerHTML = `<h1 style='text-align:center;'>${data.titulo}</h1>`;
        const slides = [];
  
        data.bloques.forEach((b, i) => {
          const slide = document.createElement("div");
          slide.className = "slide";
          if (i === 0) slide.classList.add("active");
          slide.id = `slide-${i}`;
          slide.innerHTML = `
            <h2>(${b.categoria}) ${simbolos[b.categoria] || ''} ${b.texto}</h2>
            <div class="contenido">
              ${b.contenido || `<iframe src='${b.url}' style='width:100%;height:500px;border:none;'></iframe>`}
            </div>
            <div class="nav-buttons">
              ${i > 0 ? `<button onclick='mostrarSlide(${i - 1})'>Anterior</button>` : ''}
              ${i < data.bloques.length - 1 ? `<button onclick='mostrarSlide(${i + 1})'>Siguiente</button>` : ''}
            </div>
          `;
          slides.push(slide);
          contenedor.appendChild(slide);
        });
      });
  }
  
  // Mostrar una slide concreta
  function mostrarSlide(n) {
    document.querySelectorAll(".slide").forEach(s => s.classList.remove("active"));
    document.getElementById(`slide-${n}`).classList.add("active");
  }
  
  document.addEventListener("DOMContentLoaded", mostrarMenuDesdeURL);