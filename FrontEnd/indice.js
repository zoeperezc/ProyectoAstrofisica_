const goImage = document.getElementById('goImage');
const goNews = document.getElementById('goNews');
const goApod = document.getElementById('goApod');
const history = document.getElementById('history'); //Te lleva a la pagina del historial osea history.html
//const goSearch = document.getElementById('goSearch');

goImage.addEventListener('click', () => {
  // Redirige al usuario a la ruta /upload-image
  window.location.href = "/upload-image";
});

goNews.addEventListener('click', () => {
  // Redirige al usuario a la ruta correspondiente, por ejemplo, "/donki-news"
  window.location.href = "/NASA-news";
});

goApod.addEventListener('click', () => {
  // Redirige al usuario a la ruta correspondiente, por ejemplo, "/apod"
  window.location.href = "/apod";
});

//goSearch.addEventListener('click', () => {
  // Redirige al usuario a la ruta correspondiente, por ejemplo, "/search"
 // window.location.href = "/search";
//});
