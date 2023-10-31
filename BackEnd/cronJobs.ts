import cron from 'node-cron';
import axios from 'axios';

// Función para obtener y actualizar las noticias de DONKI
 export async function updateDONKINews() {
  try {
    const apiKey = 'Rh1lUF8pDz1LYGwyv1O6I3IYgTxsv0jAxR9LlQnX' ; 

    const response = await axios.get(`https://api.nasa.gov/DONKI/notifications?api_key=${apiKey}`);

    // Aquí puedes manejar la respuesta de DONKI
    const newsData = response.data;
    // Realiza las acciones necesarias para almacenar o actualizar los datos en tu aplicación

    console.log(newsData); 
   
  } catch (error) {
    console.error('Error al obtener noticias de DONKI:', error);
  }
}

// Programa una tarea para ejecutar updateDONKINews todos los días a una hora específica (por ejemplo, a las 2 AM)
cron.schedule('30 0 * * *', () => {
  updateDONKINews();
});
