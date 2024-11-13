import { reactive } from 'vue';

export const weatherStore = reactive({
  weather: null as any,
  setWeather(newWeather: any) {
    this.weather = newWeather;
  },
});
