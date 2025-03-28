let selectedQuestions = [];

function leerTexto(texto) {
  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "es-ES";
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

function selectRandomQuestions(preguntas) {
  for (let i = preguntas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [preguntas[i], preguntas[j]] = [preguntas[j], preguntas[i]];
  }
  selectedQuestions = preguntas.slice(0, 10);
}

function displayQuestions() {
  const quizForm = document.getElementById("quiz-form");
  quizForm.innerHTML = "";

  selectedQuestions.forEach((question, index) => {
    const questionNumber = index + 1;
    const questionDiv = document.createElement("div");

    // Enunciado
    questionDiv.innerHTML = `<span style="color: #f0c040;"><b>${questionNumber}. ${question.question}</b></span><br>`;

    // Texto para leer
    let textoLeido = `Pregunta ${questionNumber}. ${question.question} `;
    question.options.forEach(opcion => {
      const letra = opcion.charAt(0);
      const texto = opcion.slice(3);
      textoLeido += `Opción ${letra}: ${texto}. `;
    });

    const botonAudio = document.createElement("button");
    botonAudio.innerHTML = "🔊 Escuchar";
    botonAudio.style.margin = "5px";
    botonAudio.onclick = (e) => {
      e.preventDefault();
      leerTexto(textoLeido);
    };
    questionDiv.appendChild(botonAudio);

    // Opciones
    question.options.forEach((option, optionIndex) => {
      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.name = `question${questionNumber}`;
      optionInput.value = option.charAt(0).toLowerCase();
      optionInput.id = `q${questionNumber}_option${optionIndex}`;

      const optionLabel = document.createElement("label");
      optionLabel.setAttribute("for", optionInput.id);
      optionLabel.innerHTML = option;

      questionDiv.appendChild(document.createElement("br"));
      questionDiv.appendChild(optionInput);
      questionDiv.appendChild(optionLabel);
    });

    quizForm.appendChild(questionDiv);
    quizForm.appendChild(document.createElement("br"));
  });

  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.value = "Enviar";
  quizForm.appendChild(submitButton);
}

function displayResult() {
  let score = 0;
  selectedQuestions.forEach((question, index) => {
    const questionNumber = index + 1;
    const selectedOption = document.querySelector(`input[name="question${questionNumber}"]:checked`);
    if (selectedOption && selectedOption.value === question.answer) {
      score++;
    }
  });

  const percentage = (score / selectedQuestions.length) * 100;
  const resultDiv = document.createElement("div");
  resultDiv.innerHTML = `Puntuación: ${score} de ${selectedQuestions.length} (${percentage}%)`;

  const resetButton = document.createElement("button");
  resetButton.textContent = "Reiniciar Test";
  resetButton.onclick = () => location.reload();

  quizForm.insertAdjacentElement("afterend", resultDiv);
  resultDiv.insertAdjacentElement("afterend", resetButton);
}

function mostrarTestDesdeURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const testParam = urlParams.get("test");
  if (testParam) {
    fetch(`/learningmathematicas/assets/js/jsontests/test-${testParam}.json`)
      .then(res => res.json())
      .then(data => {
        selectRandomQuestions(data.preguntas);
        displayQuestions();
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarTestDesdeURL();
  const quizForm = document.getElementById("quiz-form");
  quizForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    displayResult();
  });
});
