function iniciarSesionDesdeBlog(nick, password) {
  fetch('/learningmathematicas/assets/js/usuarios.json')
    .then(response => response.json())
    .then(data => {
      const user = data.usuarios.find(u => u.nick === nick && u.password === password);

      if (user) {
        localStorage.setItem('usuarioBlog', nick);
        mostrarEstadoLogin();
        alert(`¡Bienvenido, ${nick}!`);

        // Enviar al NAS que el usuario se ha logueado
        fetch("https://goheim.myqnapcloud.com:8443/Blog/registro_login.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `nick=${encodeURIComponent(nick)}`
        })
        .then(res => res.json())
        .then(data => {
          if (data.status !== "ok") {
            console.warn("Error al registrar en el NAS:", data.mensaje);
          }
        })
        .catch(err => console.error("Fallo de conexión al NAS:", err));
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
    contenedor.innerHTML = `
      <span style="color:#f0c040">👤 ${usuario.toUpperCase()}</span>
      <button onclick="cerrarSesion()" style="margin-left: 10px; background: none; border: none; color: red; cursor: pointer;">Cerrar sesión</button>
    `;
  } else {
    contenedor.innerHTML = `<a href="/learningmathematicas/Login/">Iniciar sesión</a>`;
  }
}

function cerrarSesion() {
  localStorage.removeItem('usuarioBlog');
  mostrarEstadoLogin();
  alert("Sesión cerrada.");
}

document.addEventListener("DOMContentLoaded", mostrarEstadoLogin);
