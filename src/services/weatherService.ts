import axios from 'axios';

const apiKey = import.meta.env.VITE_APP_WEATHER_API_KEY;
const endpoint = 'https://api.weatherapi.com/v1/forecast.json';

export const fetchWeather = async (city: string) => {
  try {
    const response = await axios.get(endpoint, {
      params: {
        key: apiKey,
        q: city,
        days: 1,  // Fetch forecast for 1 day including hourly data
        aqi: 'no', // Avoids fetching air quality index data, optional
        alerts: 'no' // Avoids fetching alert data, optional
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};
