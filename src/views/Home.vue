<template>
  <div class="home">
    <h1>Weather App</h1>
    <input v-model="city" placeholder="Enter city name" />
    <button @click="fetchWeatherData">Get Weather</button>

    <WeatherCard v-if="weather" :weather="weather" />
    <div v-if="hourlyForecast.length > 0">
      <h3>Hourly Forecast</h3>
      <div class="hourly-forecast">
        <div v-for="(hour, index) in hourlyForecast" :key="index" class="hour">
          <p>{{ formatHour(hour.time) }}: {{ hour.temp_c }}°C</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import WeatherCard from '../components/WeatherCard.vue';
import { fetchWeather } from '../services/weatherService';

export default defineComponent({
  name: 'Home',
  components: {
    WeatherCard,
  },
  setup() {
    const city = ref('');
    const weather = ref(null);
    const hourlyForecast = ref([]);

    const fetchWeatherData = async () => {
      if (!city.value) return;

      try {
        const data = await fetchWeather(city.value);
        weather.value = data.current;
        hourlyForecast.value = data.forecast.forecastday[0].hour;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const formatHour = (time: string) => {
      const date = new Date(time);
      return date.getHours() + ':00';
    };

    return {
      city,
      weather,
      hourlyForecast,
      fetchWeatherData,
      formatHour,
    };
  },
});
</script>
