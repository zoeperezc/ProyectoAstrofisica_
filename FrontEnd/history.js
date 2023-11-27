// document.addEventListener("DOMContentLoaded", function () {
//   // Datos simulados del historial de fotos con etiquetas y rutas locales
//   var historialFotos = [
//     { foto: "../Diseño/perroSalchicha.png", etiqueta: "Vacaciones" },
//     { foto: "../Diseño/perroSalchicha.png", etiqueta: "Familia" },
//     { foto: "../Diseño/perroSalchicha.png", etiqueta: "Amigos" },
//     { foto: "../Diseño/perroSalchicha.png", etiqueta: "Nebula" },
//     { foto: "../Diseño/perroSalchicha.png", etiqueta: "Star" },
//     // Agrega más fotos según sea necesario
//   ];

//   // Función para mostrar el historial en la página
//   function mostrarHistorial() {
//     var historialDiv = document.getElementById("historial");

//     // Construir el contenido HTML del historial
//     var historialHTML = "<div>";
//     historialFotos.forEach(function (foto) {
//       // Agrega un contenedor para cada imagen con la clase "foto-container"
//       historialHTML += `<div class="foto-container"><img src="${foto.foto}" alt="${foto.etiqueta}" class="picture"></div><br>${foto.etiqueta}`;
//     });
//     historialHTML += "</div>";

//     // Asignar el HTML al elemento de historial
//     historialDiv.innerHTML = historialHTML;
//   }

//   // Llamar a la función para mostrar el historial
//   mostrarHistorial();

// });
