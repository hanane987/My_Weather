<template>
  <div class="weather-card">
    <h2>{{ weather.name }}</h2>
    <p>{{ weather.weather[0].description }}</p>
    <p>Temperature: {{ weather.main.temp }}°C</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Weather } from '../types/weather';

export default defineComponent({
  name: 'WeatherCard',
  props: {
    weather: {
      type: Object as PropType<Weather>,
      required: true,
    },
  },
});
</script>

