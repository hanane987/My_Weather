<template>
  <div v-if="weather && weather.location && weather.current" class="weather-card">
    <h2>{{ weather.location.name }}</h2>
    <p>{{ weather.current.condition?.text || 'Condition data not available' }}</p>
    <p>Temperature: {{ weather.current.temp_c }}°C</p>
  </div>
  <div v-else>
    <p>Loading weather data...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Weather } from '../types/weather'; // Assuming you have a Weather type for safety

export default defineComponent({
  name: 'WeatherCard',
  props: {
    weather: {
      type: Object as PropType<Weather>,
      required: true,
    },
  },
});
