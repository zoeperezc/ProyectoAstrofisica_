const apiKey = 'UJiVXjcI3Wg7Qdy2WGzUQVQUF37bJPvq7bIt6qJE';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

async function fetchAPOD() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        document.getElementById('apodImage').src = data.url;
        document.getElementById('apodTitle').innerText = data.title;
        document.getElementById('apodExplanation').innerText = data.explanation;
    } catch (error) {
        console.error('Error fetching APOD data:', error);
    }
}

fetchAPOD();