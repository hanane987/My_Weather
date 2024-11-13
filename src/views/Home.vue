<template>
  <div class="home">
    <h1>Weather App</h1>
    <input v-model="city" placeholder="Enter city name" />
    <button @click="fetchWeather">Get Weather</button>

    <WeatherCard v-if="weather" :weather="weather" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { fetchWeather } from '../api';
import WeatherCard from '../components/WeatherCard.vue';

export default defineComponent({
  name: 'Home',
  components: {
    WeatherCard,
  },
  setup() {
    const city = ref('');
    const weather = ref(null);

    const fetchWeatherData = async () => {
      if (!city.value) return;

      try {
        const data = await fetchWeather(city.value);
        weather.value = data;
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    return {
      city,
      weather,
      fetchWeather: fetchWeatherData,
    };
  },
});
</script>

<style scoped>
/* Add specific styles for this component */
</style>
