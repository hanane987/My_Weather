export interface WeatherMetric {
  type: 'humidity' | 'wind' | 'precipitation' | 'aqi';
  label: string;
  value: number;
  unit: string;
  icon: string;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  icon: string;
  condition: string;
}

export interface DailyForecast {
  date: string;
  high: number;
  low: number;
  icon: string;
  condition: string;
}

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  aqi: number;
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

