import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n'; // Import vue-i18n

// Import translation files
import en from './i18n/en.json';
import fr from './i18n/fr.json';
import ar from './i18n/ar.json';

import './assets/styles.css'; 

// Set up vue-i18n
const i18n = createI18n({
  locale: 'en',  
  messages: {
    en,
    fr,
    ar
  }
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n); 
app.mount('#app');
