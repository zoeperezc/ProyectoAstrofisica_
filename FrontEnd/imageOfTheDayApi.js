document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "UJiVXjcI3Wg7Qdy2WGzUQVQUF37bJPvq7bIt6qJE";
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const apodImage = document.getElementById("apodImage");
            const apodTitle = document.getElementById("apodTitle");
            const apodExplanation = document.getElementById("apodExplanation");

            apodImage.src = data.url;
            apodTitle.textContent = data.title;
            apodExplanation.textContent = data.explanation;
        })
        .catch(error => console.error("Error fetching data:", error));
});
