import axios from 'axios';

const apiKey = 'your_actual_api_key';  
const city = 'London';  

const fetchWeather = async () => {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: apiKey
      }
    });
    console.log('Weather Data:', response.data);
  } catch (error) {
    console.error('Error fetching weather:', error.response ? error.response.data : error.message);
  }
};

fetchWeather();

