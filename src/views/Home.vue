<template>
<main class="weather-dashboard">
<div class="search-container">
<input type="text" v-model="searchQuery" @keyup.enter="handleSearch" placeholder="Search for a city..." class="search-input" />
<button @click="handleSearch" class="search-button">
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>
</button>
</div>
<section class="weather-card">
<header class="location-header">
<div class="location-info">
<h1 class="city-title">{{ city }}</h1>
<div class="datetime">
<time class="date">{{ formattedDate }}</time>
<time class="time">{{ formattedTime }}</time>
</div>
</div>
<div class="settings-panel">
<button class="settings-button" aria-label="Open Settings" @click="toggleSettings">
<img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e931b69bcf1dbba98773a36703b4f4d387d04cb8ff026dd09009c308a3cb007f?placeholderIfAbsent=true&apiKey=cd24fd1b28c242d2876d3559d5180089" alt="Settings icon" class="settings-icon" />
</button>
<div v-if="showSettings" class="settings-dropdown">
<div class="temperature-settings">
<h2 class="settings-label">Temperature</h2>
<div class="toggle-group">
<button class="toggle-button" :class="{ 'toggle-active': temperatureUnit === 'C' }" @click="updateTemperatureUnit('C')">°C</button>
<button class="toggle-button" :class="{ 'toggle-active': temperatureUnit === 'F' }" @click="updateTemperatureUnit('F')">°F</button>
</div>
</div>
<div class="measurement-settings">
<h2 class="settings-label">Measurements</h2>
<div class="toggle-group">
<button class="toggle-button" :class="{ 'toggle-active': measurementUnit === 'metric' }" @click="updateMeasurementUnit('metric')">Metric</button>
<button class="toggle-button" :class="{ 'toggle-active': measurementUnit === 'imperial' }" @click="updateMeasurementUnit('imperial')">Imperial</button>
</div>
</div>
</div>
</div>
</header>
<section class="current-weather">
<div class="temperature-display">
<img :src="currentWeather.icon" alt="Current weather icon" class="weather-icon" />
<p class="current-temp">{{ formatTemperature(currentWeather.temp) }}°</p>
</div>
<div class="weather-info">
<h2 class="weather-condition">{{ currentWeather.condition }}</h2>
<p class="feels-like">Feels like {{ formatTemperature(currentWeather.feelsLike) }}°</p>
</div>
</section>
<section class="weather-metrics">
<div class="metrics-grid">
<div class="metric-item" v-for="metric in weatherMetrics" :key="metric.type">
<div class="metric-label">
<img :src="metric.icon" :alt="`${metric.label} icon`" class="metric-icon" />
<span>{{ metric.label }}</span>
</div>
<p class="metric-value">{{ formatMetricValue(metric) }}</p>
</div>
</div>
</section>
<section class="aqi-section">
<div class="aqi-header">
<h2 class="aqi-title">AQI</h2>
<div class="aqi-tooltip">
<span class="aqi-value">{{ currentWeather.aqi }}</span>
<img src="https://cdn.builder.io/api/v1/image/assets/TEMP/272b2151a9855fd4230caf13526a188e039f207e442600def44b27eee10ec2e4?placeholderIfAbsent=true&apiKey=cd24fd1b28c242d2876d3559d5180089" alt="AQI info" class="tooltip-icon" />
</div>
</div>
<div class="progress-bar">
<div class="progress-line" role="progressbar" :aria-valuenow="currentWeather.aqi" aria-valuemin="0" aria-valuemax="300" :style="{ width: `${(currentWeather.aqi / 300) * 100}%` }"></div>
</div>
</section>
<section class="forecast-section">
<div class="forecast-toggle">
<button class="toggle-button" :class="{ 'toggle-active': forecastType === 'hourly' }" @click="updateForecastType('hourly')">Hourly Forecast</button>
<button class="toggle-button" :class="{ 'toggle-active': forecastType === 'daily' }" @click="updateForecastType('daily')">7-Day Forecast</button>
</div>
<div v-if="forecastType === 'hourly'" class="hourly-forecast" role="list">
<div class="forecast-item" role="listitem" v-for="hour in hourlyForecast" :key="hour.time">
<time class="forecast-time">{{ formatTime(hour.time) }}</time>
<img :src="hour.icon" :alt="`Weather icon for ${formatTime(hour.time)}`" class="forecast-icon" />
<p class="forecast-temp">{{ formatTemperature(hour.temp) }}°</p>
</div>
</div>
<div v-else class="daily-forecast" role="list">
<div class="forecast-item" role="listitem" v-for="day in dailyForecast" :key="day.date">
<time class="forecast-time">{{ formatDate(day.date) }}</time>
<img :src="day.icon" :alt="`Weather icon for ${formatDate(day.date)}`" class="forecast-icon" />
<div class="forecast-temps">
<p class="forecast-high">{{ formatTemperature(day.high) }}°</p>
<p class="forecast-low">{{ formatTemperature(day.low) }}°</p>
</div>
</div>
</div>
</section>
</section>
<footer class="brand-footer">
<img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8b7a5f0b605783b1bf4624487fd277c2e8611378bc0e515ed0084a62ad6c657?placeholderIfAbsent=true&apiKey=cd24fd1b28c242d2876d3559d5180089" alt="Brand logo" class="brand-logo" />
<p class="brand-name">BRAND NAME</p>
</footer>
</main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { fetchWeatherData } from '../services/WeatherService';
import '../assets/styles.css';
import '../assets/global.css';

import type { WeatherMetric, ForecastData, CurrentWeather } from './types/WeatherTypes';

const city = ref('Casablanca');
const searchQuery = ref('');
const showSettings = ref(false);
const temperatureUnit = ref<'C' | 'F'>('C');
const measurementUnit = ref<'metric' | 'imperial'>('metric');
const forecastType = ref<'hourly' | 'daily'>('hourly');
const searchHistory = ref<string[]>([]);

const currentWeather = ref<CurrentWeather>({
temp: 0,
feelsLike: 0,
condition: '',
icon: '',
humidity: 0,
windSpeed: 0,
precipitation: 0,
aqi: 0
});

const hourlyForecast = ref<ForecastData[]>([]);
const dailyForecast = ref<ForecastData[]>([]);

const formattedDate = computed(() => {
const date = new Date();
const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric'
};
return date.toLocaleDateString('en-US', options);
});

const formattedTime = computed(() => {
const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();
const ampm = hours >= 12 ? 'PM' : 'AM';
const formattedHours = hours % 12 || 12;
const formattedMinutes = minutes.toString().padStart(2, '0');
return `${formattedHours}:${formattedMinutes} ${ampm}`;
});

const weatherMetrics = computed(() => [
{
type: 'humidity',
label: 'Humidity',
value: currentWeather.value.humidity,
unit: '%',
icon: '/icons/humidity.svg'
},
{
type: 'wind',
label: 'Wind',
value: currentWeather.value.windSpeed,
unit: measurementUnit.value === 'metric' ? 'km/h' : 'mph',
icon: '/icons/wind.svg'
},
{
type: 'precipitation',
label: 'Precipitation',
value: currentWeather.value.precipitation,
unit: '%',
icon: '/icons/precipitation.svg'
},
{
type: 'aqi',
label: 'AQI',
value: currentWeather.value.aqi,
unit: '',
icon: '/icons/aqi.svg'
}
]);

const handleSearch = async () => {
if (searchQuery.value.trim()) {
try {
  city.value = searchQuery.value.trim();
  await fetchWeather();
  updateSearchHistory(searchQuery.value.trim());
  searchQuery.value = '';
} catch (error) {
  console.error('Failed to fetch weather data:', error);
}
}
};

const updateSearchHistory = (searchedCity: string) => {
const normalizedCity = searchedCity.trim();
if (!normalizedCity) return;

searchHistory.value = [
normalizedCity,
...searchHistory.value.filter(c => c !== normalizedCity)
].slice(0, 5);
};

const toggleSettings = () => {
showSettings.value = !showSettings.value;
};

const updateTemperatureUnit = (unit: 'C' | 'F') => {
temperatureUnit.value = unit;
};

const updateMeasurementUnit = (unit: 'metric' | 'imperial') => {
measurementUnit.value = unit;
};

const updateForecastType = (type: 'hourly' | 'daily') => {
forecastType.value = type;
fetchWeather();
};

const formatTemperature = (temp: number): number => {
return temperatureUnit.value === 'C' ? temp : (temp * 9/5) + 32;
};

const formatMetricValue = (metric: WeatherMetric): string => {
if (metric.type === 'wind' && measurementUnit.value === 'imperial') {
return `${Math.round(metric.value * 0.621371)} ${metric.unit}`;
}
return `${metric.value}${metric.unit}`;
};

const formatTime = (time: string): string => {
const date = new Date(time);
const hours = date.getHours();
const ampm = hours >= 12 ? 'PM' : 'AM';
const formattedHours = hours % 12 || 12;
return `${formattedHours}${ampm}`;
};

const formatDate = (date: string): string => {
return new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
};

const fetchWeather = async () => {
try {
const data = await fetchWeatherData(city.value);
currentWeather.value = data.current;
if (forecastType.value === 'hourly') {
  hourlyForecast.value = data.hourly;
} else {
  dailyForecast.value = data.daily;
}
} catch (error) {
console.error('Failed to fetch weather data:', error);
}
};

onMounted(() => {
fetchWeather();
setInterval(() => {
fetchWeather();
}, 300000);
});
</script>

