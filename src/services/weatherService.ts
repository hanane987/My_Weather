
import type { WeatherData } from '../types/weather';

export async function fetchWeatherData(city: string): Promise<WeatherData> {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();
  return {
    current: {
      temp: data.current.temp_c,
      feelsLike: data.current.feelslike_c,
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      precipitation: data.current.precip_mm,
      aqi: data.current.air_quality['us-epa-index']
    },
    hourly: data.forecast.forecastday[0].hour.map((hour: any) => ({
      time: hour.time,
      temp: hour.temp_c,
      icon: hour.condition.icon,
      condition: hour.condition.text
    })),
    daily: data.forecast.forecastday.map((day: any) => ({
      date: day.date,
      high: day.day.maxtemp_c,
      low: day.day.mintemp_c,
      icon: day.day.condition.icon,
      condition: day.day.condition.text
    }))
  };
} 
