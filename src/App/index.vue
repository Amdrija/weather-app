<template>
  <div class="container">
    <div class="card">
      <div class="card-title justify-space-between">
        <h1 class="card-city">{{ location }}</h1>
        <div class="card-weather align-vertical-center">
          <h3 class="card-temperature">{{ temperature }}°</h3>
          <span class="material-icons md-48">{{ icon }}</span>
        </div>
      </div>

      <div class="card-content">
        <h4 class="card-time">{{ current_time }}</h4>
        <h1 class="card-weather-description">{{ weather_description }}</h1>
        <div class="min-humidity justify-space-between">
          <h4 class="inline margin-right">Min: {{ min_temperature }}°</h4>
          <h4 class="inline">Humidity: {{ humidity }}%</h4>
        </div>
        <div class="justify-space-between margin-top">
          <h4 class="inline">Max: {{ max_temperature }}°</h4>
          <h4 class="inline">Pressure: {{ pressure }}mbar</h4>
        </div>
      </div>
    </div>

    <div class="onoffswitch" v-on:click="changeUnits()">
      <input
        type="checkbox"
        name="onoffswitch"
        class="onoffswitch-checkbox"
        id="myonoffswitch"
        tabindex="0"
        checked
        ref="toggle"
      />
      <label class="onoffswitch-label" for="myonoffswitch">
        <span class="onoffswitch-inner"></span>
        <span class="onoffswitch-switch"></span>
      </label>
    </div>

    <input type="text" placeholder="City" id="city-textbox" ref="cityInput" />
    <button v-on:click="getWeather()">Search</button>
  </div>
</template>
<script src="./script.js"></script>
<style scoped lang="scss" src="./style.scss"></style>
