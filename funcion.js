// Espera hasta que todos los elementos de la página estén listos para funcionar
document.addEventListener("DOMContentLoaded", function() {
  // Captura las partes importantes de la página y las guarda en variables
  var listaAtajos = document.getElementById("listaAtajos");
  var borrarAtajosBtn = document.getElementById("boton1");
  var borrarAtajosMode = false; // Usado para saber si estamos en modo de eliminar

  // Función para habilitar o deshabilitar el botón "Eliminar Atajo"
  function actualizarBotonEliminar() {
    var atajosGuardados = JSON.parse(localStorage.getItem("misAtajos") || "[]");
    if (atajosGuardados.length > 0) {
      borrarAtajosBtn.disabled = false;
    } else {
      borrarAtajosBtn.disabled = true;
    }
  }

  let mensajeMostrado = false;

  function agregarAtajo(nombreAtajo, urlAtajo) {
    // Revisa si el mensaje ya ha sido mostrado
    if (mensajeMostrado) {
      return;
    }
  
    // Revisa si el nombre o la URL están en blanco
    if (nombreAtajo.trim() === "" || urlAtajo.trim() === "") {
      const errorMessage = document.createElement("h1");
      errorMessage.textContent = "Por favor, ingresa un nombre y una URL valida para el atajo.";
      errorMessage.id = "error-message"; // Agregamos un ID para aplicar el estilo
      document.body.appendChild(errorMessage);
  
      // Marca el mensaje como mostrado
      mensajeMostrado = true;
  
      // Elimina el mensaje de error después de 3 segundos
      setTimeout(() => {
        errorMessage.remove();
        // Reinicia la variable para permitir mostrar el mensaje nuevamente en el futuro
        mensajeMostrado = false;
      }, 3000); // 3000 milisegundos = 3 segundos
      return;
    }

    // Crea un nuevo elemento en la lista y muestra la información del atajo
    var nuevoAtajo = document.createElement("li");
    nuevoAtajo.innerHTML = `<a href="${urlAtajo}" target="_blank" style="font-size: 18px;">${nombreAtajo}</a>`;
    listaAtajos.appendChild(nuevoAtajo);

    // Limpia los campos de entrada
    document.getElementById("nombre").value = "";
    document.getElementById("url").value = "";

    // Guarda el nuevo atajo en la memoria local
    var atajosGuardados = JSON.parse(localStorage.getItem("misAtajos") || "[]");
    atajosGuardados.push({ nombre: nombreAtajo, url: urlAtajo });
    localStorage.setItem("misAtajos", JSON.stringify(atajosGuardados));

    // Llama a la función para actualizar el estado del botón "Eliminar Atajo"
    actualizarBotonEliminar();
  }

  // Función para mostrar los atajos guardados en la lista
  function mostrarAtajosGuardados() {
    listaAtajos.innerHTML = "";

    var atajosGuardados = JSON.parse(localStorage.getItem("misAtajos") || "[]");
    atajosGuardados.forEach(function(atajo) {
      var nuevoAtajo = document.createElement("li");
      nuevoAtajo.innerHTML = `<a href="${atajo.url}" target="_blank" style="font-size: 18px;">${atajo.nombre}</a>`;
      listaAtajos.appendChild(nuevoAtajo);
    });

    // Llama a la función para actualizar el estado del botón "Eliminar Atajo"
    actualizarBotonEliminar();
  }

  // Función para manejar la eliminación de atajos
  function borrarAtajos() {
    if (borrarAtajosMode) { // Si estamos en modo de eliminar
      var checkboxes = document.getElementsByClassName("checkbox-atajo");
      var atajosGuardados = JSON.parse(localStorage.getItem("misAtajos") || "[]");
      var nuevosAtajos = [];

      // Filtra los atajos que no están marcados para eliminar
      for (var i = 0; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked) {
          nuevosAtajos.push(atajosGuardados[i]);
        }
      }

      // Actualiza la memoria local y refresca la lista mostrada
      localStorage.setItem("misAtajos", JSON.stringify(nuevosAtajos));
      mostrarAtajosGuardados();

      // Elimina las casillas de verificación y restaura la apariencia normal
      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].parentNode.removeChild(checkboxes[i]);
      }
      borrarAtajosMode = false;
      borrarAtajosBtn.textContent = "Eliminar Atajo";

      // Llama a la función para actualizar el estado del botón "Eliminar Atajo"
      actualizarBotonEliminar();
    } else { // Si no estamos en modo de eliminar
      var atajosGuardados = JSON.parse(localStorage.getItem("misAtajos") || "[]");

      // Agrega casillas de verificación para cada atajo
      for (var i = 0; i < atajosGuardados.length; i++) {
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox-atajo";
        listaAtajos.children[i].prepend(checkbox);
      }

      borrarAtajosMode = true;
      borrarAtajosBtn.textContent = "Eliminar";

      // Llama a la función para actualizar el estado del botón "Eliminar Atajo"
      actualizarBotonEliminar();
    }
  }

  // Muestra los atajos guardados cuando la página se carga
  mostrarAtajosGuardados();

  // Escucha el botón "Agregar Atajo"
  document.getElementById("boton2").addEventListener("click", function() {
    var nombreAtajo = document.getElementById("nombre").value;
    var urlAtajo = document.getElementById("url").value;
    agregarAtajo(nombreAtajo, urlAtajo);
  });

  // Escucha el botón "Eliminar Atajo"
  borrarAtajosBtn.addEventListener("click", borrarAtajos);
});

// Abrir formulario de instrucciones de uso
document.getElementById("instruc").addEventListener("click", function() {
  // Cargar el contenido del archivo "instruc" y reemplazarlo en la ventana emergente actual
  fetch("instruc.html")
    .then(response => response.text())
    .then(html => {
      document.open();
      document.write(html);
      document.close();
    });
});
