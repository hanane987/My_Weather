// weatherStore.ts
import { reactive } from 'vue';

export const weatherStore = reactive({
  weather: null as any,
  forecast: null as any,  
  hourlyForecast: [] as any[], 
  setWeather(newWeather: any) {
    this.weather = newWeather;
  },
  setForecast(newForecast: any) {
    this.forecast = newForecast;
  },
  setHourlyForecast(newHourlyForecast: any) {
    this.hourlyForecast = newHourlyForecast;
  },
});
