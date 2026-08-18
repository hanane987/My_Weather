import type { WeatherData } from '../types/weather';

export async function fetchWeatherData(city: string): Promise<WeatherData> {
  // 1. جلب إحداثيات المدينة والتوقيت المحلي (Timezone)
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  );

  if (!geoRes.ok) {
    throw new Error('Failed to fetch location coordinates');
  }

  const geoData = await geoRes.json();
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error('City not found');
  }

  const { latitude, longitude } = geoData.results[0];

  // 2. جلب توقعات 7 أيام كاملة مع حالة الطقس والمؤشرات
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
  );

  if (!weatherRes.ok) {
    throw new Error('Failed to fetch weather forecast');
  }

  const data = await weatherRes.json();

  return {
    current: {
      temp: Math.round(data.current.temperature_2m),
      feelsLike: Math.round(data.current.apparent_temperature),
      condition: getWeatherCondition(data.current.weather_code),
      icon: getWeatherIcon(data.current.weather_code),
      humidity: data.current.relative_humidity_2m,
      windSpeed: Math.round(data.current.wind_speed_10m),
      precipitation: data.current.precipitation,
      aqi: 42 // مؤشر جودة الهواء
    },
    hourly: data.hourly.time.slice(0, 24).map((time: string, index: number) => ({
      time,
      temp: Math.round(data.hourly.temperature_2m[index]),
      icon: getWeatherIcon(data.hourly.weather_code[index]),
      condition: getWeatherCondition(data.hourly.weather_code[index])
    })),
    daily: data.daily.time.slice(0, 7).map((date: string, index: number) => ({
      date,
      high: Math.round(data.daily.temperature_2m_max[index]),
      low: Math.round(data.daily.temperature_2m_min[index]),
      icon: getWeatherIcon(data.daily.weather_code[index]),
      condition: getWeatherCondition(data.daily.weather_code[index])
    }))
  };
}

// دالة تحويل WMO Weather Codes لأسماء الحالات
function getWeatherCondition(code: number): string {
  if (code === 0) return 'Clear sky';
  if (code <= 3) return 'Partly cloudy';
  if (code <= 48) return 'Foggy';
  if (code <= 67) return 'Rainy';
  if (code <= 77) return 'Snowy';
  if (code <= 82) return 'Rain showers';
  return 'Thunderstorm';
}

// دالة تحويل WMO Weather Codes لأيقونات ممتازة
function getWeatherIcon(code: number): string {
  if (code === 0) return 'https://cdn-icons-png.flaticon.com/512/869/869869.png';
  if (code <= 3) return 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png';
  if (code <= 67) return 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png';
  return 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png';
}