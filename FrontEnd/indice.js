const goImage = document.getElementById('goImage');
const goNews = document.getElementById('goNews');
const goApod = document.getElementById('goApod');
const history = document.getElementById('history'); 

goImage.addEventListener('click', () => {
  const fileInput = imageInput.files[0];

  if (fileInput) {
    const formData = new FormData();
    formData.append('image', fileInput);

    fetch('http://localhost:3000/upload-image', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Handle the response as needed
    })
    .catch(error => {
      console.error('Error during image upload:', error);
    });
  } else {
    console.error('No file selected');
  }
});

goNews.addEventListener('click', () => {
  window.location.href = "/NASA-news";
});

goApod.addEventListener('click', () => {
  window.location.href = "/apod";
});

history.addEventListener('click', () => {
  window.location.href = "//user/:id/history";
});