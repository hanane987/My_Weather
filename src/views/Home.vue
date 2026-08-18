<template>
  <main :class="['weather-dashboard', theme]">
    <!-- Ambient Background Soft Glows -->
    <div class="ambient-glow glow-1"></div>
    <div class="ambient-glow glow-2"></div>

    <!-- Top Navigation Bar -->
    <div class="top-nav">
      <div class="language-select">
        <select v-model="currentLocale" @change="changeLocale" class="locale-select">
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="ar">العربية</option>
        </select>
      </div>

      <div class="theme-toggle">
        <button @click="toggleTheme" :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`" class="theme-button">
          <svg v-if="theme === 'light'" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm7.071 2.929a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM21 12a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm-2.929 7.071a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zM12 21a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1zM4.929 19.071a1 1 0 0 1 0-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0zM3 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm2.929-7.071a1 1 0 0 1 1.414 0l.707.707A1 1 0 1 1 6.636 7.05l-.707-.707a1 1 0 0 1 0-1.414zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" fill="currentColor"/>
          </svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Search Bar -->
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

    <!-- Main Clean Card -->
    <section class="weather-card">
      <header class="location-header">
        <div class="location-info">
          <h1 class="city-title">{{ city }}</h1>
          <div class="datetime">
            <time class="date">{{ formattedDate }}</time>
            <span class="dot-separator">•</span>
            <time class="time">{{ formattedTime }}</time>
          </div>
        </div>
        <div class="settings-panel">
          <button class="settings-button" :aria-label="t('settings.openSettings')" @click="toggleSettings">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e931b69bcf1dbba98773a36703b4f4d387d04cb8ff026dd09009c308a3cb007f?placeholderIfAbsent=true&apiKey=cd24fd1b28c242d2876d3559d5180089" :alt="t('settings.settingsIcon')" class="settings-icon" />
          </button>
          <transition name="fade-slide">
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
          </transition>
        </div>
      </header>

      <!-- Weather Display -->
      <section class="current-weather">
        <div class="temperature-display">
          <div class="weather-icon-wrapper">
            <img :src="currentWeather.icon" :alt="t('weather.currentIcon')" class="weather-icon floating-anim" />
          </div>
          <p class="current-temp">{{ formatTemperature(currentWeather.temp) }}<span class="degree-symbol">°</span></p>
        </div>
        <div class="weather-info">
          <h2 class="weather-condition">{{ currentWeather.condition }}</h2>
          <p class="feels-like">{{ t('weather.feelsLike') }} <span>{{ formatTemperature(currentWeather.feelsLike) }}°</span></p>
        </div>
      </section>

      <!-- Weather Metrics -->
      <section class="weather-metrics">
        <div class="metrics-grid">
          <div class="metric-item" v-for="metric in weatherMetrics" :key="metric.type">
            <div class="metric-icon-bg">
              <img :src="metric.icon" :alt="t(`weather.${metric.type}Icon`)" class="metric-icon" />
            </div>
            <div class="metric-content">
              <span class="metric-title">{{ t(`weather.${metric.type}`) }}</span>
              <p class="metric-value">{{ formatMetricValue(metric) }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- AQI Section -->
      <section class="aqi-section">
        <div class="aqi-header">
          <h2 class="aqi-title">{{ t('weather.aqi') }}</h2>
          <div class="aqi-tooltip">
            <span class="aqi-value">{{ currentWeather.aqi }}</span>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/272b2151a9855fd4230caf13526a188e039f207e442600def44b27eee10ec2e4?placeholderIfAbsent=true&apiKey=cd24fd1b28c242d2876d3559d5180089" :alt="t('weather.aqiInfo')" class="tooltip-icon" />
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-line" role="progressbar" :aria-valuenow="currentWeather.aqi" aria-valuemin="0" aria-valuemax="300" :style="{ width: `${Math.min((currentWeather.aqi / 300) * 100, 100)}%` }"></div>
        </div>
      </section>

      <!-- Forecast Timeline -->
      <section class="forecast-section">
        <div class="forecast-toggle">
          <button class="toggle-button" :class="{ 'toggle-active': forecastType === 'hourly' }" @click="updateForecastType('hourly')">{{ t('weather.forecast.hourly') }}</button>
          <button class="toggle-button" :class="{ 'toggle-active': forecastType === 'daily' }" @click="updateForecastType('daily')">{{ t('weather.forecast.daily') }}</button>
        </div>
        <div v-if="forecastType === 'hourly'" class="hourly-forecast forecast-scroll" role="list">
          <div class="forecast-item" role="listitem" v-for="hour in hourlyForecast" :key="hour.time">
            <time class="forecast-time">{{ formatTime(hour.time) }}</time>
            <img :src="hour.icon" :alt="t('weather.forecast.iconAlt', { time: formatTime(hour.time) })" class="forecast-icon" />
            <p class="forecast-temp">{{ formatTemperature(hour.temp) }}°</p>
          </div>
        </div>
        <div v-else class="daily-forecast forecast-scroll" role="list">
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

    <!-- Footer -->
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
    weekday: 'short',
    month: 'short',
    day: 'numeric'
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
  return temperatureUnit.value === 'C' ? temp : Math.round((temp * 9/5) + 32);
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
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  fetchWeather();
});

watch(
  () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  (isDark) => {
    if (!localStorage.getItem('theme')) {
      theme.value = isDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
  }
);
</script>

<style scoped>
/* ==========================================================================
   Classy Contrast Palette (Separated Background & Main Container)
   ========================================================================== */
.weather-dashboard {
  --accent-primary: #ea580c; 
  --accent-hover: #c2410c;
  --accent-soft: rgba(234, 88, 12, 0.12);
  
  /* ☀️ Light Mode: Clear Contrast Layering */
  --bg-color: #edf2f7;      /* خلفية Slate هادئة كتعطي تباين فريد */
  --text-main: #0f172a;     /* أرقام وعناوين ناصعة ومقروءة */
  --text-sub: #475569;
  
  /* Container Colors & Elevation */
  --glass-card: #ffffff;   /* الكارط الرئيسية بيضاء ناصعة */
  --glass-border: #cbd5e1; /* حواشي باينة بصورة احترافية */
  --glass-item: #f8fafc;   /* كروت الداخلية فـ لون خاص */
  --shadow-card: 0 20px 30px -10px rgba(15, 23, 42, 0.08), 0 10px 15px -5px rgba(15, 23, 42, 0.04);

  position: relative;
  min-height: 100vh;
  padding: 2.5rem 1.5rem;
  background-color: var(--bg-color);
  color: var(--text-main);
  overflow: hidden;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 🌙 Dark Mode Layering */
.weather-dashboard.dark {
  --accent-primary: #f97316;
  --accent-hover: #ea580c;
  --accent-soft: rgba(249, 115, 22, 0.15);
  
  --bg-color: #0b1120;     /* خلفية دكنة بزاف لبرّا */
  --text-main: #ffffff;
  --text-sub: #cbd5e1;
  
  --glass-card: #1e293b;   /* الكارط الوسطانية مفتوحة درجة على البرانية */
  --glass-border: #334155;
  --glass-item: #0f172a;
  --shadow-card: 0 25px 35px -10px rgba(0, 0, 0, 0.5);
}

/* Glow Background Light Elements */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  opacity: 0.35;
  z-index: 0;
}
.glow-1 {
  width: 380px;
  height: 380px;
  top: -80px;
  left: -80px;
  background: rgba(251, 146, 60, 0.25);
}
.glow-2 {
  width: 380px;
  height: 380px;
  bottom: -80px;
  right: -80px;
  background: rgba(203, 213, 225, 0.5);
}

/* Navigation */
.top-nav {
  position: relative;
  z-index: 10;
  max-width: 850px;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.theme-button,
.locale-select {
  background: var(--glass-card);
  border: 1px solid var(--glass-border);
  color: var(--text-main);
  border-radius: 1rem;
  padding: 0.6rem 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.theme-button:hover,
.locale-select:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

/* Search Bar */
.search-container {
  position: relative;
  z-index: 10;
  max-width: 500px;
  margin: 0 auto 2rem;
  display: flex;
  gap: 0.75rem;
}

.search-input {
  flex: 1;
  padding: 0.85rem 1.2rem;
  border: 1px solid var(--glass-border);
  border-radius: 1.2rem;
  font-size: 0.95rem;
  background: var(--glass-card);
  color: var(--text-main);
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

.search-button {
  padding: 0 1.25rem;
  background: var(--accent-primary);
  border: none;
  border-radius: 1.2rem;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  box-shadow: 0 4px 10px rgba(234, 88, 12, 0.25);
}

.search-button:hover {
  background-color: var(--accent-hover);
}

/* Weather Main Card (Elevated Clean Container) */
.weather-card {
  position: relative;
  z-index: 10;
  background: var(--glass-card);
  border: 1px solid var(--glass-border);
  border-radius: 2rem;
  padding: 2.25rem;
  max-width: 850px;
  margin: 0 auto;
  box-shadow: var(--shadow-card);
}

.location-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.city-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.25rem 0;
  letter-spacing: -0.02em;
  color: var(--text-main);
}

.datetime {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-sub);
  font-size: 0.95rem;
  font-weight: 600;
}

.dot-separator {
  color: var(--text-sub);
}

.settings-button {
  background: var(--glass-item);
  border: 1px solid var(--glass-border);
  border-radius: 1rem;
  padding: 0.65rem;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.settings-button:hover {
  border-color: var(--accent-primary);
}

.settings-dropdown {
  position: absolute;
  top: 120%;
  right: 0;
  width: 240px;
  background: var(--glass-card);
  border: 1px solid var(--glass-border);
  border-radius: 1.25rem;
  padding: 1.25rem;
  box-shadow: var(--shadow-card);
  z-index: 50;
}

/* Temp section */
.current-weather {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.temperature-display {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.weather-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.weather-icon {
  width: 5.5rem;
  height: 5.5rem;
}

.floating-anim {
  animation: float 5s ease-in-out infinite;
}

.current-temp {
  font-size: 4.8rem;
  font-weight: 800;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--text-main);
}

.degree-symbol {
  color: var(--accent-primary);
}

.weather-condition {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: var(--text-main);
}

.feels-like {
  margin: 0;
  color: var(--text-sub);
  font-size: 0.95rem;
  font-weight: 500;
}

.feels-like span {
  font-weight: 700;
  color: var(--text-main);
}

/* Metrics Cards */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--glass-item);
  border: 1px solid var(--glass-border);
  border-radius: 1.25rem;
  transition: all 0.2s ease;
}

.metric-item:hover {
  border-color: var(--accent-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.metric-icon-bg {
  padding: 0.6rem;
  background: var(--glass-card);
  border: 1px solid var(--glass-border);
  border-radius: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.metric-icon {
  width: 22px;
  height: 22px;
}

.metric-title {
  display: block;
  font-size: 0.85rem;
  color: var(--text-sub);
  font-weight: 600;
}

.metric-value {
  font-size: 1.2rem;
  font-weight: 800;
  margin: 0;
  color: var(--text-main);
}

/* AQI Bar */
.aqi-section {
  background: var(--glass-item);
  border: 1px solid var(--glass-border);
  border-radius: 1.25rem;
  padding: 1rem 1.25rem;
  margin-bottom: 2rem;
}

.aqi-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
}

.aqi-title {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-main);
}

.aqi-value {
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--accent-primary);
  margin-right: 0.5rem;
}

.progress-bar {
  height: 8px;
  background: var(--glass-border);
  border-radius: 1rem;
  overflow: hidden;
}

.progress-line {
  height: 100%;
  background: var(--accent-primary);
  border-radius: 1rem;
  transition: width 0.6s ease;
}

/* Forecast Timeline */
.forecast-section {
  margin-top: 1.5rem;
}

.forecast-toggle, .toggle-group {
  display: flex;
  background: var(--glass-item);
  border-radius: 1rem;
  padding: 0.25rem;
  gap: 0.25rem;
  border: 1px solid var(--glass-border);
}

.toggle-button {
  flex: 1;
  padding: 0.5rem 0.85rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-sub);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-button.toggle-active {
  background: var(--glass-card);
  color: var(--accent-primary);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.forecast-scroll {
  display: flex;
  gap: 0.85rem;
  overflow-x: auto;
  padding: 1rem 0.1rem;
}

.forecast-item {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  min-width: 85px;
  background: var(--glass-item);
  border: 1px solid var(--glass-border);
  padding: 1rem 0.85rem;
  border-radius: 1.25rem;
  transition: all 0.2s ease;
}

.forecast-item:hover {
  border-color: var(--accent-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.forecast-time {
  font-size: 0.85rem;
  color: var(--text-sub);
  font-weight: 600;
}

.forecast-temp,
.forecast-high {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-main);
  margin: 0;
}

.forecast-low {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-sub);
  margin: 0;
}

.forecast-icon {
  width: 38px;
  height: 38px;
}

.brand-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 2.5rem;
  color: var(--text-sub);
  font-weight: 500;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.25s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 640px) {
  .weather-dashboard { padding: 1.25rem 0.85rem; }
  .weather-card { padding: 1.25rem; }
  .current-weather { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .metrics-grid { grid-template-columns: 1fr; }
  .city-title { font-size: 2rem; }
  .current-temp { font-size: 3.8rem; }
}
</style>