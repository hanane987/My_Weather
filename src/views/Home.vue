<template>
  <div class="home">
    <h1>{{ $t('weatherApp') }}</h1>
    <input v-model="city" placeholder="Enter city name" />
    <button @click="fetchWeatherData">{{ $t('getWeather') }}</button>

    <!-- Language Selection Dropdown -->
    <div>
      <select @change="changeLanguage($event.target.value)">
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>

    <!-- Temperature Unit Toggle -->
    <div class="unit-toggle">
      <label>
        <input type="radio" value="C" v-model="temperatureUnit" /> {{ $t('celsius') }}
      </label>
      <label>
        <input type="radio" value="F" v-model="temperatureUnit" /> {{ $t('fahrenheit') }}
      </label>
    </div>

    <!-- Display 7-Day Forecast -->
    <div v-if="dailyForecast && dailyForecast.length > 0">
      <h3>{{ $t('sevenDayForecast') }}</h3>
      <div class="daily-forecast">
        <div
          v-for="(day, index) in dailyForecast"
          :key="index"
          class="day"
          @click="selectDay(day)"
        >
          <p>{{ formatDate(day.date) }}</p>
          <p>
            Avg Temp: {{ convertTemperature(day.day.avgtemp_c) }}°{{ temperatureUnit }}
          </p>
          <p>{{ day.day.condition.text }}</p>
        </div>
      </div>
    </div>

    <!-- Display Hourly Forecast for Selected Day -->
    <div v-if="selectedDay">
      <h3>{{ $t('hourlyForecastFor') }} {{ formatDate(selectedDay.date) }}</h3>
      <div class="hourly-forecast">
        <div v-for="hour in selectedDay.hour" :key="hour.time_epoch" class="hour">
          <p>
            {{ formatHour(hour.time) }}: {{ convertTemperature(hour.temp_c) }}°{{ temperatureUnit }}
          </p>
          <p>{{ hour.condition.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { fetchWeather } from '../services/weatherService';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Home',
  setup() {
    const { t, i18n } = useI18n(); // Use useI18n to access t and i18n

    const city = ref('');
    const dailyForecast = ref([]);
    const selectedDay = ref(null);
    const temperatureUnit = ref('C');

    // Fetch weather data function
    const fetchWeatherData = async () => {
      if (!city.value) return;

      try {
        const data = await fetchWeather(city.value);
        if (data.forecast && data.forecast.forecastday && data.forecast.forecastday.length >= 7) {
          dailyForecast.value = data.forecast.forecastday;
        } else {
          console.error('Invalid data structure or missing forecast data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    // Select a day to show hourly forecast
    const selectDay = (day) => {
      selectedDay.value = day;
    };

    // Format date function
    const formatDate = (date: string) => {
      const d = new Date(date);
      return ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()};
    };

    // Format hour function
    const formatHour = (time: string) => {
      const date = new Date(time);
      return date.getHours() + ':00';
    };

    // Temperature conversion function (Celsius to Fahrenheit)
    const convertTemperature = (tempCelsius) => {
      return temperatureUnit.value === 'C'
        ? tempCelsius
        : (tempCelsius * 9) / 5 + 32;
    };

    // Language change function
    const changeLanguage = (lang: string) => {
      i18n.global.locale = lang; // Change language using i18n instance
    };

    return {
      t,
      city,
      dailyForecast,
      selectedDay,
      temperatureUnit,
      fetchWeatherData,
      formatDate,
      formatHour,
      selectDay,
      convertTemperature,
      changeLanguage,
    };
  },
});
