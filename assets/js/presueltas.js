function leerTexto(texto) {
  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "es-ES";
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

function toggleSpoiler(spoiler) {
  const content = spoiler.nextElementSibling;

  if (content.style.display === "none" || content.style.display === "") {
    content.style.display = "block";

    if (!content.querySelector('.audio-button')) {
      const texto = content.innerText.trim();
      const boton = document.createElement('button');
      boton.className = 'audio-button';
      boton.innerHTML = '🔊 Escuchar';
      boton.style.margin = '10px 0';
      boton.onclick = (event) => {
        event.stopPropagation();
        leerTexto(texto);
      };

      content.appendChild(document.createElement('br'));
      content.appendChild(boton);
    }
  } else {
    content.style.display = "none";
  }
}

function generarAudioEnPreguntasSpoiler() {
  const spoilers = document.querySelectorAll('div.spoiler');

  spoilers.forEach(spoiler => {
    if (!spoiler.querySelector('.audio-button')) {
      const texto = spoiler.innerText.trim();
      const botonAudio = document.createElement('button');
      botonAudio.className = 'audio-button';
      botonAudio.innerHTML = '🔊 Escuchar';
      botonAudio.style.margin = '10px 0';
      botonAudio.onclick = (event) => {
        event.stopPropagation();
        leerTexto(texto);
      };

      spoiler.appendChild(document.createElement('br'));
      spoiler.appendChild(botonAudio);
    }

    const siguiente = spoiler.nextElementSibling;
    if (siguiente && siguiente.classList.contains('spoiler-content')) {
      siguiente.style.display = "none";
    }
  });
}

// === Carga JSON desde ?presuelta=... ===
function mostrarPreguntasDesdeURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const presueltaParam = urlParams.get('presuelta');
  if (presueltaParam) {
    cargarPreguntasResueltas(presueltaParam);
  }
}

function cargarPreguntasResueltas(presueltaId) {
  fetch('/learningmathematicas/assets/js/jsonpresueltas/presuelta-' + presueltaId + '.json')
    .then(res => res.json())
    .then(data => {
      const visor = document.getElementById('visor');
      if (!visor) return;

      visor.innerHTML = '';

      // Título principal
      const titulo = document.createElement('h1');
      titulo.textContent = data.titulo;
      titulo.className = 'titulo-portada';
      visor.appendChild(titulo);

      // Añadir bloques de preguntas
      data.bloques.forEach((bloque) => {
        const bloqueDiv = document.createElement('div');
        bloqueDiv.className = 'bloque-pregunta';

        if (bloque.textoExtra) {
          bloqueDiv.innerHTML = bloque.textoExtra;
        }

        visor.appendChild(bloqueDiv);
      });

      // Activar spoilers y botones de audio
      generarAudioEnPreguntasSpoiler();
    });
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarPreguntasDesdeURL();
  generarAudioEnPreguntasSpoiler();
});
