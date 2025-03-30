function iniciarSesionDesdeBlog(nick, password) {
  fetch("../php/registro_login.php", {
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

        // Registrar acceso en la base de datos del NAS
        fetch("../php/log_acceso.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `nick=${encodeURIComponent(nick)}`
        });

        // Redirigir a la página principal de la web
        window.location.href = "/index.html";
      } else {
        alert("Usuario o contraseña incorrectos.");
      }
    })
    .catch(err => {
      console.error("Fallo de conexión al NAS:", err);
    });
}

f
  if (usuario) {
    contenedor.innerHTML = `
      <span style="color:#f0c040">👤 
        <a href="/usuario.html" style="color:#f0c040; text-decoration:none;">
          ${usuario.toUpperCase()}
        </a>
      </span>
    `;
  } else {
    contenedor.innerHTML = `<a href="/Login/index.html">Iniciar sesión</a>`;
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuarioBlog");
  mostrarEstadoLogin();
  alert("Sesión cerrada.");
}

document.addEventListener("DOMContentLoaded", mostrarEstadoLogin);
