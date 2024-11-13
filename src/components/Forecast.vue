<template>
  <div class="forecast">
    <div v-for="day in forecast" :key="day.date" class="forecast-day">
      <h3>{{ day.date }}</h3>
      <div class="forecast-summary">
        <p>Condition: {{ day.day.condition.text }}</p>
        <p>Temperature: {{ day.day.avgtemp_c }}°C</p>
        <p>Max Temp: {{ day.day.maxtemp_c }}°C</p>
        <p>Min Temp: {{ day.day.mintemp_c }}°C</p>
      </div>

      <div class="hourly">
        <h4>Hourly Forecast</h4>
        <div v-for="hour in day.hour" :key="hour.time_epoch" class="hour">
          <p>{{ hour.time | formatTime }} - Temp: {{ hour.temp_c }}°C</p>
          <p>Condition: {{ hour.condition.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ForecastDay } from '../types/weather';

export default defineComponent({
  name: 'Forecast',
  props: {
    forecast: {
      type: Array as PropType<ForecastDay[]>,
      required: true,
    },
  },
  methods: {
    formatTime(epoch: number) {
      const date = new Date(epoch * 1000);
      return date.toLocaleTimeString();
    },
  },
});
</script>

<style scoped>
.forecast-day {
  margin: 1em 0;
  padding: 1em;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

.hourly {
  margin-top: 1em;
}

.hour {
  margin-bottom: 0.5em;
}
</style>
