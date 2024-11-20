<template>
<main :class="['weather-dashboard', theme]">
<div class="theme-toggle">
<button @click="toggleTheme" :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`" class="theme-button">
<svg v-if="theme === 'light'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm7.071 2.929a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM21 12a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm-2.929 7.071a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zM12 21a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1zM4.929 19.071a1 1 0 0 1 0-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0zM3 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm2.929-7.071a1 1 0 0 1 1.414 0l.707.707A1 1 0 1 1 6.636 7.05l-.707-.707a1 1 0 0 1 0-1.414zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" fill="currentColor"/>
</svg>
<svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
</div>
<div class="language-select">
<select v-model="currentLocale" @change="changeLocale" class="locale-select">
<option value="en">English</option>
<option value="fr">Français</option>
<option value="ar">العربية</option>
</select>
</div>
<div class="search-container">
<input 
  type="text" 
  v-model="searchQuery" 
  @keyup.enter="handleSearch" 
  :placeholder="t('search.placeholder')" 
  class="search-input" 
/>
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
<button class="settings-button" :aria-label="t('settings.openSettings')" @click="toggleSettings">
<img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e931b69bcf1dbba98773a36703b4f4d387d04cb8ff026dd09009c308a3cb007f?placeholderIfAbsent=true&apiKey=cd24fd1b28c242d2876d3559d5180089" :alt="t('settings.settingsIcon')" class="settings-icon" />
</button>
<div v-if="showSettings" class="settings-dropdown">
<div class="temperature-settings">
<h2 class="settings-label">{{ t('settings.temperature') }}</h2>
<div class="toggle-group">
<button class="toggle-button" :class="{ 'toggle-active': temperatureUnit === 'C' }" @click="updateTemperatureUnit('C')">°C</button>
<button class="toggle-button" :class="{ 'toggle-active': temperatureUnit === 'F' }" @click="updateTemperatureUnit('F')">°F</button>
</div>
</div>
<div class="measurement-settings">
<h2 class="settings-label">{{ t('settings.measurements') }}</h2>
<div class="toggle-group">
<button class="toggle-button" :class="{ 'toggle-active': measurementUnit === 'metric' }" @click="updateMeasurementUnit('metric')">{{ t('settings.metric') }}</button>
<button class="toggle-button" :class="{ 'toggle-active': measurementUnit === 'imperial' }" @click="updateMeasurementUnit('imperial')">{{ t('settings.imperial') }}</button>
</div>
</div>
</div>
</div>
</header>
<section class="current-weather">
<div class="temperature-display">
<img :src="currentWeather.icon" :alt="t('weather.currentIcon')" class="weather-icon" />
<p class="current-temp">{{ formatTemperature(currentWeather.temp) }}°</p>
</div>
<div class="weather-info">
<h2 class="weather-condition">{{ currentWeather.condition }}</h2>
<p class="feels-like">{{ t('weather.feelsLike') }} {{ formatTemperature(currentWeather.feelsLike) }}°</p>
</div>
</section>
<section class="weather-metrics">
<div class="metrics-grid">
<div class="metric-item" v-for="metric in weatherMetrics" :key="metric.type">
<div class="metric-label">
<img :src="metric.icon" :alt="t(`weather.${metric.type}Icon`)" class="metric-icon" />
<span>{{ t(`weather.${metric.type}`) }}</span>
</div>
<p class="metric-value">{{ formatMetricValue(metric) }}</p>
</div>
</div>
</section>
<section class="aqi-section">
<div class="aqi-header">
<h2 class="aqi-title">{{ t('weather.aqi') }}</h2>
<div class="aqi-tooltip">
<span class="aqi-value">{{ currentWeather.aqi }}</span>
<img src="https://cdn.builder.io/api/v1/image/assets/TEMP/272b2151a9855fd4230caf13526a188e039f207e442600def44b27eee10ec2e4?placeholderIfAbsent=true&apiKey=cd24fd1b28c242d2876d3559d5180089" :alt="t('weather.aqiInfo')" class="tooltip-icon" />
</div>
</div>
<div class="progress-bar">
<div class="progress-line" role="progressbar" :aria-valuenow="currentWeather.aqi" aria-valuemin="0" aria-valuemax="300" :style="{ width: `${(currentWeather.aqi / 300) * 100}%` }"></div>
</div>
</section>
<section class="forecast-section">
<div class="forecast-toggle">
<button class="toggle-button" :class="{ 'toggle-active': forecastType === 'hourly' }" @click="updateForecastType('hourly')">{{ t('weather.forecast.hourly') }}</button>
<button class="toggle-button" :class="{ 'toggle-active': forecastType === 'daily' }" @click="updateForecastType('daily')">{{ t('weather.forecast.daily') }}</button>
</div>
<div v-if="forecastType === 'hourly'" class="hourly-forecast" role="list">
<div class="forecast-item" role="listitem" v-for="hour in hourlyForecast" :key="hour.time">
<time class="forecast-time">{{ formatTime(hour.time) }}</time>
<img :src="hour.icon" :alt="t('weather.forecast.iconAlt', { time: formatTime(hour.time) })" class="forecast-icon" />
<p class="forecast-temp">{{ formatTemperature(hour.temp) }}°</p>
</div>
</div>
<div v-else class="daily-forecast" role="list">
<div class="forecast-item" role="listitem" v-for="day in dailyForecast" :key="day.date">
<time class="forecast-time">{{ formatDate(day.date) }}</time>
<img :src="day.icon" :alt="t('weather.forecast.iconAlt', { time: formatDate(day.date) })" class="forecast-icon" />
<div class="forecast-temps">
<p class="forecast-high">{{ formatTemperature(day.high) }}°</p>
<p class="forecast-low">{{ formatTemperature(day.low) }}°</p>
</div>
</div>
</div>
</section>
</section>
<footer class="brand-footer">
<img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8b7a5f0b605783b1bf4624487fd277c2e8611378bc0e515ed0084a62ad6c657?placeholderIfAbsent=true&apiKey=cd24fd1b28c242d2876d3559d5180089" :alt="t('brand.logo')" class="brand-logo" />
<p class="brand-name">{{ t('brand.name') }}</p>
</footer>
</main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { fetchWeatherData } from '../services/WeatherService';
import type { WeatherMetric, ForecastData, CurrentWeather } from '../types/WeatherTypes';

const { t, locale } = useI18n();
const currentLocale = ref(locale.value);
const city = ref('Casablanca');
const searchQuery = ref('');
const showSettings = ref(false);
const temperatureUnit = ref<'C' | 'F'>('C');
const measurementUnit = ref<'metric' | 'imperial'>('metric');
const forecastType = ref<'hourly' | 'daily'>('hourly');
const searchHistory = ref<string[]>([]);
const theme = ref<'light' | 'dark'>('light');

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
  return date.toLocaleDateString(currentLocale.value, options);
});

const formattedTime = computed(() => {
  const date = new Date();
  return date.toLocaleTimeString(currentLocale.value, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
});

const weatherMetrics = computed(() => [
  {
    type: 'humidity',
    value: currentWeather.value.humidity,
    unit: '%',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/fea7a12480e5c80fb5fc2620b6d243d1822eeb247497ca8165613d3b6a0122db'
  },
  {
    type: 'wind',
    value: currentWeather.value.windSpeed,
    unit: measurementUnit.value === 'metric' ? 'km/h' : 'mph',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/087615e4d4c559bdf34be66af60cc3f0f00be8de5145c64f99a0427b2751058e'
  },
  {
    type: 'precipitation',
    value: currentWeather.value.precipitation,
    unit: '%',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/df4108f62ceca6b8d453aa2e8a16ff66dfa7eb1a7f8457ab4ecfb604c2094d18'
  },
  {
    type: 'aqi',
    value: currentWeather.value.aqi,
    unit: '',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9699f5d1ae39a8f66a120ca1dc8b27ac975124f9c565c1c3720c062b19e61056'
  }
]);

const changeLocale = (event: Event) => {
  const select = event.target as HTMLSelectElement;
  locale.value = select.value;
  currentLocale.value = select.value;
  document.documentElement.dir = select.value === 'ar' ? 'rtl' : 'ltr';
};

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

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', theme.value);
  document.documentElement.setAttribute('data-theme', theme.value);
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
  return date.toLocaleTimeString(currentLocale.value, {
    hour: 'numeric',
    hour12: true
  });
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString(currentLocale.value, {
    weekday: 'short'
  });
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
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  if (savedTheme) {
    theme.value = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme.value = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme.value);
  }

  fetchWeather();
  setInterval(() => {
    fetchWeather();
  }, 300000);
});

watch(
  () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  (isDark) => {
    if (!localStorage.getItem('theme')) {
      theme.value = isDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme.value);
    }
  }
);
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 100;
}

.theme-button {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.theme-button:hover {
  background-color: var(--hover-bg);
}

.theme-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--focus-ring);
}

.weather-dashboard {
  --bg-gradient: linear-gradient(180deg, #f5f7fa 0%, #ffffff 100%);
  --text-color: #0e121b;
  --card-bg: #ffffff;
  --border-color: #e1e4ea;
  --hover-bg: rgba(0, 0, 0, 0.05);
  --focus-ring: rgba(0, 102, 255, 0.5);
  min-height: 100vh;
  padding: 2rem;
  background: var(--bg-gradient);
  color: var(--text-color);
}

.weather-dashboard.dark {
  --bg-gradient: linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%);
  --text-color: #ffffff;
  --card-bg: #333333;
  --border-color: #444444;
  --hover-bg: rgba(255, 255, 255, 0.1);
  --focus-ring: rgba(255, 255, 255, 0.5);
}

.dark * {
  color: #ffffff;
}

.dark .search-input,
.dark .settings-dropdown,
.dark .weather-card,
.dark .metric-item,
.dark .forecast-item {
  background-color: #333333;
  color: #ffffff;
}

.dark .toggle-button {
  color: #ffffff;
}

.dark .toggle-button.toggle-active {
  background-color: #444444;
}

.dark .forecast-low {
  color: rgba(255, 255, 255, 0.7);
}

.search-container {
  position: relative;
  max-width: 500px;
  margin: 0 auto 2rem;
  display: flex;
  gap: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-size: 1rem;
  background: var(--card-bg);
  color: var(--text-color);
}

.search-button {
  padding: 0.75rem;
  background: var(--primary-color, #0066ff);
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.weather-card {
  background: var(--card-bg);
  border-radius: 1.5rem;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.settings-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 280px;
  background: var(--card-bg);
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 50;
  border: 1px solid var(--border-color);
}

.toggle-group {
  display: flex;
  background: var(--hover-bg);
  border-radius: 0.5rem;
  padding: 0.25rem;
  margin-top: 0.5rem;
}

.toggle-button {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-color);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-button.toggle-active {
  background: var(--card-bg);
  color: var(--text-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.forecast-section {
  margin-top: 2rem;
}

.forecast-toggle {
  display: flex;
  background: var(--hover-bg);
  border-radius: 0.5rem;
  padding: 0.25rem;
  margin-bottom: 1.5rem;
}

.hourly-forecast,
.daily-forecast {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: thin;
  scrollbar-color: var(--border-color) transparent;
}

.forecast-item {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 80px;
}

.forecast-time {
  font-size: 0.875rem;
  color: var(--text-color);
}

.forecast-icon {
  width: 40px;
  height: 40px;
}

.forecast-temps {
  display: flex;
  gap: 0.5rem;
  font-weight: 500;
}

.forecast-high {
  color: var(--text-color);
}

.forecast-low {
  color: var(--text-color);
  opacity: 0.7;
}

.language-select {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 100;
}

.locale-select {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  color: var(--text-color);
  font-size: 0.875rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .weather-dashboard {
    padding: 1rem;
  }

  .weather-card {
    padding: 1.5rem;
  }

  .search-container {
    margin-bottom: 1.5rem;
  }

  .settings-dropdown {
    width: 100%;
    max-width: 280px;
  }
}
</style>