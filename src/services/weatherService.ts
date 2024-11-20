
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