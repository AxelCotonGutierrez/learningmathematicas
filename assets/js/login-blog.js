function iniciarSesionDesdeBlog(nick, password) {
  fetch("https://blog.gogelythegreat.es/Blog/registro_login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `nick=${encodeURIComponent(nick)}&password=${encodeURIComponent(password)}`
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "ok") {
        localStorage.setItem("usuarioBlog", nick);
        mostrarEstadoLogin();
        alert(`¡Bienvenido, ${nick}!`);

        // Registrar acceso en la BD del NAS
        fetch("https://blog.gogelythegreat.es/Blog/log_acceso.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `nick=${encodeURIComponent(nick)}`
        });

        // ✅ Redirigir automáticamente al blog
        window.location.href = "https://axelcotongutierrez.github.io/learningmathematicas/";
      } else {
        alert("Usuario o contraseña incorrectos.");
      }
    })
    .catch(err => {
      console.error("Fallo de conexión al NAS:", err);
    });
}

function mostrarEstadoLogin() {
  const contenedor = document.getElementById("estado-login");
  const usuario = localStorage.getItem("usuarioBlog");
  if (usuario) {
    contenedor.innerHTML = `
     <a href="/learningmathematicas/usuario/" style="color:#f0c040; text-decoration:none;">👤 ${usuario.toUpperCase()}</a> <button onclick="cerrarSesion()" style="margin-left: 10px; font-size: 0,5rem; background: none; border: none; color: red; cursor: pointer;">Cerrar</button>`;
  } else {
    contenedor.innerHTML = `<a href="/learningmathematicas/Login/">Iniciar sesión</a>`;
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuarioBlog");
  mostrarEstadoLogin();
  alert("Sesión cerrada.");
}

document.addEventListener("DOMContentLoaded", mostrarEstadoLogin);
