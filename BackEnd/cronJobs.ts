import axios from 'axios';

export type DONKIData = {
  messageType: string;
  messageID: string;
  messageURL: string;
  messageIssueTime: string;
  messageBody: string;
}[];

export async function updateDONKINews() {
  try {
    const apiKey = 'Rh1lUF8pDz1LYGwyv1O6I3IYgTxsv0jAxR9LlQnX' ; 

    const response = await axios.get(`https://api.nasa.gov/DONKI/notifications?api_key=${apiKey}`);

    const newsData = response.data as DONKIData;

    console.log("NEWS updated");

    return newsData;
  } catch (error) {
    console.error('Error al obtener noticias de DONKI:', error);
  }
  return [] as DONKIData;
}
