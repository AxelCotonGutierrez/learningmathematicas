document.addEventListener("DOMContentLoaded", async () => {
    const nick = localStorage.getItem("usuarioBlog");
    if (!nick) {
      alert("Debes iniciar sesión.");
      window.location.href = "/learningmathematicas/Login/";
      return;
    }
  
    document.getElementById("usuario-nick").textContent = nick.toUpperCase();
  
    // Obtener datos desde el NAS
    try {
      const res = await fetch(`https://blog.gogelythegreat.es/Blog/get_usuario.php?nick=${nick}`);
      const data = await res.json();
  
      if (data.status === "ok") {
        const lista = document.getElementById("datos-usuario");
        const usuario = data.usuario;
        lista.innerHTML = `
          <li><strong>País:</strong> ${usuario.pais}</li>
          <li><strong>Tipo:</strong> ${usuario.tipo_usuario}</li>
          <li><strong>Nivel educativo:</strong> ${usuario.nivel_educativo}</li>
        `;
  
        mostrarGaleria("galeria-insignias", data.insignias);
        mostrarGaleria("galeria-cartas", data.cartas);
      }
    } catch (err) {
      console.error("Error al obtener datos del usuario:", err);
    }
  });
  
  function mostrarGaleria(id, lista) {
    const contenedor = document.getElementById(id);
    contenedor.innerHTML = "";
  
    if (lista.length === 0) {
      contenedor.innerHTML = "<p>¡Todavía no tienes elementos!</p>";
      return;
    }
  
    lista.forEach(item => {
      const img = document.createElement("img");
      img.src = item.imagen;
      img.alt = item.nombre;
      contenedor.appendChild(img);
    });
  }
  