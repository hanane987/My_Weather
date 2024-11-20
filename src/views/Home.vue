<template>
<main class="weather-dashboard">
<section class="weather-card">
  <header class="location-header">
    <div class="location-info">
      <h1 class="city-title">{{ city }}</h1>
      <div class="datetime">
        <time class="date">{{ formattedDate }}</time>
        <time class="time">{{ formattedTime }}</time>
      </div>
    </div>
    <div class="settings-panel">
      <button class="settings-button" aria-label="Open Settings" @click="toggleSettings">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e931b69bcf1dbba98773a36703b4f4d387d04cb8ff026dd09009c308a3cb007f?placeholderIfAbsent=true&apiKey=cd24fd1b28c242d2876d3559d5180089" alt="Settings icon" class="settings-icon" />
      </button>
      <div v-if="showSettings" class="settings-dropdown">
        <div class="temperature-settings">
          <h2 class="settings-label">Temperature</h2>
          <div class="toggle-group">
            <button 
              class="toggle-button" 
              :class="{ 'toggle-active': temperatureUnit === 'C' }"
              @click="updateTemperatureUnit('C')"
            >°C</button>
            <button 
              class="toggle-button"
              :class="{ 'toggle-active': temperatureUnit === 'F' }"
              @click="updateTemperatureUnit('F')"
            >°F</button>
          </div>
        </div>
        <div class="measurement-settings">
          <h2 class="settings-label">Measurements</h2>
          <div class="toggle-group">
            <button 
              class="toggle-button"
              :class="{ 'toggle-active': measurementUnit === 'metric' }"
              @click="updateMeasurementUnit('metric')"
            >Metric</button>
            <button 
              class="toggle-button"
              :class="{ 'toggle-active': measurementUnit === 'imperial' }"
              @click="updateMeasurementUnit('imperial')"
            >Imperial</button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <section class="current-weather">
    <div class="temperature-display">
      <img :src="currentWeather.icon" alt="Current weather icon" class="weather-icon" />
      <p class="current-temp">{{ formatTemperature(currentWeather.temp) }}°</p>
    </div>
    <div class="weather-info">
      <h2 class="weather-condition">{{ currentWeather.condition }}</h2>
      <p class="feels-like">Feels like {{ formatTemperature(currentWeather.feelsLike) }}°</p>
    </div>
  </section>

  <section class="weather-metrics">
    <div class="metrics-grid">
      <div class="metric-item" v-for="metric in weatherMetrics" :key="metric.type">
        <div class="metric-label">
          <img :src="metric.icon" :alt="`${metric.label} icon`" class="metric-icon" />
          <span>{{ metric.label }}</span>
        </div>
        <p class="metric-value">{{ formatMetricValue(metric) }}</p>
      </div>
    </div>
  </section>

  <section class="aqi-section">
    <div class="aqi-header">
      <h2 class="aqi-title">AQI</h2>
      <div class="aqi-tooltip">
        <span class="aqi-value">{{ currentWeather.aqi }}</span>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/272b2151a9855fd4230caf13526a188e039f207e442600def44b27eee10ec2e4?placeholderIfAbsent=true&apiKey=cd24fd1b28c242d2876d3559d5180089" alt="AQI info" class="tooltip-icon" />
      </div>
    </div>
    <div class="progress-bar">
      <div 
        class="progress-line" 
        role="progressbar" 
        :aria-valuenow="currentWeather.aqi" 
        aria-valuemin="0" 
        aria-valuemax="300"
        :style="{ width: `${(currentWeather.aqi / 300) * 100}%` }"
      ></div>
    </div>
  </section>

  <section class="forecast-section">
    <div class="forecast-toggle">
      <button 
        class="toggle-button" 
        :class="{ 'toggle-active': forecastType === 'hourly' }"
        @click="updateForecastType('hourly')"
      >Hourly Forecast</button>
      <button 
        class="toggle-button"
        :class="{ 'toggle-active': forecastType === 'daily' }"
        @click="updateForecastType('daily')"
      >7-Day Forecast</button>
    </div>
    <div v-if="forecastType === 'hourly'" class="hourly-forecast" role="list">
      <div 
        class="forecast-item" 
        role="listitem" 
        v-for="hour in hourlyForecast" 
        :key="hour.time"
      >
        <time class="forecast-time">{{ formatTime(hour.time) }}</time>
        <img :src="hour.icon" :alt="`Weather icon for ${formatTime(hour.time)}`" class="forecast-icon" />
        <p class="forecast-temp">{{ formatTemperature(hour.temp) }}°</p>
      </div>
    </div>
    <div v-else class="daily-forecast" role="list">
      <div 
        class="forecast-item" 
        role="listitem" 
        v-for="day in dailyForecast" 
        :key="day.date"
      >
        <time class="forecast-time">{{ formatDate(day.date) }}</time>
        <img :src="day.icon" :alt="`Weather icon for ${formatDate(day.date)}`" class="forecast-icon" />
        <div class="forecast-temps">
          <p class="forecast-high">{{ formatTemperature(day.high) }}°</p>
          <p class="forecast-low">{{ formatTemperature(day.low) }}°</p>
        </div>
      </div>
    </div>
  </section>
</section>

<footer class="brand-footer">
  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8b7a5f0b605783b1bf4624487fd277c2e8611378bc0e515ed0084a62ad6c657?placeholderIfAbsent=true&apiKey=cd24fd1b28c242d2876d3559d5180089" alt="Brand logo" class="brand-logo" />
  <p class="brand-name">BRAND NAME</p>
</footer>
</main>
</template>