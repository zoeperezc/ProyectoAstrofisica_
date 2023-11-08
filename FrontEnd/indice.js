const goImage = document.getElementById('goImage');
const goNews = document.getElementById('goNews');
const goApod = document.getElementById('goApod');
const history = document.getElementById('history'); 

goImage.addEventListener('click', () => {
  window.location.href = "/upload-image";
});

goNews.addEventListener('click', () => {
  window.location.href = "/NASA-news";
});

goApod.addEventListener('click', () => {
  window.location.href = "/apod";
});

history.addEventListener('click', () => {
  window.location.href = "//user/:id/libery";
});