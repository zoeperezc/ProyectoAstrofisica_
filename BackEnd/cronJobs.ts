import cron from 'node-cron';
import axios from 'axios';

// Función para obtener y actualizar las noticias de DONKI
async function updateDONKINews() {
  try {
    const apiKey = 'TU_API_KEY'; // Reemplazar API key de NASA DONKI
    const startDate = 'yyyy-MM-dd'; // Especifica la fecha de inicio 
    const endDate = 'yyyy-MM-dd'; // Especifica la fecha de fin 
    
    const response = await axios.get(`https://api.nasa.gov/DONKI/notifications?startDate=${startDate}&endDate=${endDate}&type=all&api_key=${apiKey}`);

    // Aquí puedes manejar la respuesta de DONKI, por ejemplo, almacenarla en tu base de datos o memoria
    const newsData = response.data;
    // Realiza las acciones necesarias para almacenar o actualizar los datos en tu aplicación
    // ...
  } catch (error) {
    console.error('Error al obtener noticias de DONKI:', error);
  }
}

// Programa una tarea para ejecutar updateDONKINews todos los días a una hora específica (por ejemplo, a las 2 AM)
cron.schedule('0 2 * * *', () => {
  updateDONKINews();
});
