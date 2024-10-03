// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAE3Un38AeJrWtH83ndmXLNSKKFoKQI7K8",
    authDomain: "contador-de-juegos.firebaseapp.com",
    databaseURL: "https://contador-de-juegos-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "contador-de-juegos",
    storageBucket: "contador-de-juegos.appspot.com",
    messagingSenderId: "811452306589",
    appId: "1:811452306589:web:c0ceaada6ebdebb6d27074",
    measurementId: "G-QGKEEYVRTR"
  };
  
  // Inicializar Firebase (esto solo debe ejecutarse si firebase está definido)
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
  } else {
    console.error('Firebase no está cargado.');
  }
  
  // Función para incrementar el contador del juego en Firebase
  function incrementarContadorFirebase(ruta, juegoId) {
    const contadorRef = firebase.database().ref(`${ruta}/${juegoId}/contador`);
    contadorRef.transaction(function(contador) {
      return (contador || 0) + 1;
    });
  }
  
  // Función para mostrar el contador actual en la página
  function mostrarContador(ruta, juegoId) {
    const contadorRef = firebase.database().ref(`${ruta}/${juegoId}/contador`);
    contadorRef.on('value', (snapshot) => {
      const contador = snapshot.val();
      document.getElementById('contador').innerText = `Han jugado ${contador || 0} veces.`;
    });
  }
  