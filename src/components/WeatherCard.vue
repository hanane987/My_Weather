

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
