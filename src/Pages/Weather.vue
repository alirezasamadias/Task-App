<template>
  <div class="container container-sm">
    <h1 class="title-lg jj">{{$t("weather")}}</h1>
    <!-- search panel for name city  -->
    <div class="form-group">
      <label for="city-name">{{$t("enter city name")}}</label>
      <input
      v-model.lazy.trim="city"
      :placeholder="$t('city name')"
      spellcheck="false"
      autofocus
      id="city-name"/>
    </div>

    <!-- error title-->
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <!-- weather info -->
    <div v-if="!error && data.city" class="weather">
      <!-- weather icon -->
      <img class="weather-icon" :src="data.icon" alt="weather-icon" />
      <!-- weather temperature -->
      <h1 class="weather-temperature">{{ data.temperature }}°C</h1>
      <!-- name city -->
      <h2 class="weather-city">{{ data.city }}</h2>
    </div>
  </div>
</template>

<script setup>
import useTabTitle from "@/Hooks/UseTabTitle";
import { ref, watch } from "vue";

// tab title
useTabTitle('Weather');

// get weather icon 
const getIconUrl = (icon) => {
  return `https://murphyslaw.github.io/hosted-assets/weather/${icon.toLowerCase()}.png`;
}
// get weather data
const getWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=16a38d83af836c90ee6837bcc746a9d6`;
  let data = {};

  try {
    const response = await fetch(url);
    data = await response.json();

    if (!response.ok || data.cod !== 200) {
      throw new Error(data.message || "Network response was not OK");
    }
  } catch (err) {
    throw new Error("Unable to fetch weather data", { cause: err });
  }

  return data;
};

const error = ref();
const city = ref();
const data = ref({
  city: null,
  temperature: null,
  icon: null
});

watch(city, async () => {
    try {
      const weatherData = await getWeatherData(city.value);

      data.value.city = weatherData.name;
      data.value.temperature = Math.round(weatherData.main.temp);
      data.value.icon = getIconUrl(weatherData.weather[0].main);
    } catch (err) {
      error.value = err.message;
    }
  }
);
</script>

<style>
/* weather info */
.weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 12px;
  color: #fff;
}

.weather-icon {
  width: min(80%,170px);
}

.weather-temperature {
  font-size: clamp(36px, 4vw, 70px);
  font-weight: bold;
  font-family: serif;
}

.weather-city {
  font-size: clamp(30px, 3vw, 60px);
  font-weight: bold;
}

/* error title */
.error {
  margin-top: 15px;
  font-size: clamp(20px, 1vw, 40px);
}
</style>