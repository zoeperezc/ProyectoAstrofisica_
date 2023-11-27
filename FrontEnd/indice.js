const goImage = document.getElementById('goImage');
const goNews = document.getElementById('goNews');
const goApod = document.getElementById('goApod');
const history = document.getElementById('history'); 

goImage.addEventListener('click', () => {
  const fileInput = imageInput.files[0];

  if (fileInput) {
    const formData = new FormData();
    formData.append('image', fileInput);

    fetch('http://localhost:3000/upload-image'+ queries, {
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
  fetchData('/NASA-news');
 });

goApod.addEventListener('click', () => {
  fetch('/apod-data')
  .then((response) => response.json())
  .then((data) => {
    res.status(200).json({
      url: data.url,
      title: data.title,
      explanation: data.explanation,
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch APOD data" });
  });

});

historyBtn.addEventListener('click', () => {
  const userId = getUserId();
  fetchData(`/user/${userId}/history`);
});

function fetchData(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Handle the response as needed
    })
    .catch(error => {
      console.error('Error during fetch:', error);
    });
    
  };
