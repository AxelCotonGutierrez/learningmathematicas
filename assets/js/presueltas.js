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
          event.stopPropagation(); // 👉 evitar que dispare el spoiler
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
          event.stopPropagation(); // 👉 evitar que dispare el spoiler
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
  
  document.addEventListener('DOMContentLoaded', generarAudioEnPreguntasSpoiler);