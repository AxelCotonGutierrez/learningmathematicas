function iniciarSesionDesdeBlog(nick, password) {
    fetch('/learningmathematicas/assets/js/usuarios.json')
      .then(response => response.json())
      .then(data => {
        const user = data.usuarios.find(u => u.nick === nick && u.password === password);
  
        if (user) {
          localStorage.setItem('usuarioBlog', nick);
          mostrarEstadoLogin();
          alert(`¡Bienvenido, ${nick}!`);
        } else {
          alert('Usuario o contraseña incorrectos.');
        }
      })
      .catch(err => {
        console.error("Error al cargar el JSON de usuarios:", err);
      });
  }
  
  function mostrarEstadoLogin() {
    const contenedor = document.getElementById("estado-login");
    const usuario = localStorage.getItem('usuarioBlog');
  
    if (usuario) {
      contenedor.innerHTML = `<span style="color:#f0c040">👤 ${usuario}</span>`;
    } else {
      contenedor.innerHTML = `<a href="/learningmathematicas/Login/">Iniciar sesión</a>`;
    }
  }
  
  document.addEventListener("DOMContentLoaded", mostrarEstadoLogin);
  