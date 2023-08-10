// Abrir formulario de ayuda
document.getElementById("atras").addEventListener("click", function() {
    // Cargar el contenido del archivo "ayuda" y reemplazarlo en la ventana emergente actual
    fetch("popup.html")
      .then(response => response.text())
      .then(html => {
        document.open();
        document.write(html);
        document.close();
      });
  });