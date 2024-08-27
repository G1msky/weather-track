<template>
  <div class="container lg:h-svh">
    <div
      class="flex flex-col items-center justify-center py-10 lg:py-0 h-full lg:w-full"
    >
      <div class="font-bold mb-20 text-center text-primary-800">
        <h1 class="text-[28px] lg:text-[48px] mb-2">Your Weather</h1>
        <h2 class="text-[18px] lg:text-[32px] font-medium px-8">
          Get Accurate Forecasts Anytime, Anywhere
        </h2>
      </div>
      <div class="flex flex-col lg:flex-row gap-10 max-w-[740px] w-full">
        <div class="w-full px-6 py-4 bg-[#bedfee] rounded-lg shadow-md">
          <AutoComplete
            v-model="cityName"
            dropdown
            :suggestions="suggestions"
            @complete="searchCity"
            placeholder="Enter city name"
            optionLabel="name"
          >
            <template #option="slotProps">
              <div class="flex items-center">
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </AutoComplete>
          <div
            v-if="weatherData"
            class="w-full bg-[#fff] shadow-dm px-4 py-6 rounded-lg mt-5"
          >
            <div class="flex mb-4 justify-between items-center">
              <h2 :key="unit" class="text-[28px]">
                {{ temperature }}°{{ unitSymbol }}
              </h2>
              <h2 class="text-[28px] font-medium">
                <img
                  :src="`https://flagsapi.com/${weatherData.sys.country}/flat/64.png`"
                  alt="flag"
                  class="inline-block w-8 h-8 object-cover"
                />
                {{ weatherData.name }}
              </h2>
            </div>
            <div
              class="flex items-center justify-between gap-3 leading-[1em] mb-4 text-[18px]"
            >
              <div class="flex gap-4 items-center">
                <img
                  class="w-10 h-10 object-contain mb-1 bg-[#bedfee] rounded-full"
                  :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`"
                  alt=""
                />
                {{ weatherData.weather[0].description }}
              </div>
            </div>

            <div class="flex gap-4 items-center text-[18px] mb-8">
              <div class="bg-[#bedfee] rounded-full w-10 h-10 p-2">
                <img
                  class="w-full h-full object-contain"
                  src="~/public/wind.png"
                  alt=""
                />
              </div>
              <div v-if="unit === 'metric'">
                Wind: {{ weatherData.wind.speed }} meters/s
              </div>
              <div v-else>Wind: {{ weatherData.wind.speed }} miles/s</div>
            </div>

            <div class="flex gap-4 mt-1">
              <button
                :class="
                  unit === 'imperial'
                    ? 'inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-primary-200 hover:shadow-light-2 focus:bg-primary-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-primary-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong'
                    : 'inline-block rounded bg-primary-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-dark-2 focus:bg-primary-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-primary-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong'
                "
                class="w-full"
                @click="setUnit('metric')"
              >
                Celsius
              </button>
              <button
                :class="
                  unit === 'metric'
                    ? 'inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-primary-200 hover:shadow-light-2 focus:bg-primary-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-primary-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong'
                    : 'inline-block rounded bg-primary-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-dark-2 focus:bg-primary-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-primary-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong'
                "
                class="w-full"
                @click="setUnit('imperial')"
              >
                Fahrenheit
              </button>
            </div>
          </div>
        </div>
        <div
          class="w-full lg:min-w-[260px] lg:w-auto px-6 py-4 bg-[#bedfee] rounded-lg shadow-md"
        >
          <h2
            class="text-center mb-2 lg:mb-[1.75rem] text-[18px] lg:text-[20px]"
          >
            Recent Searches:
          </h2>
          <ul v-if="recentCities.length" class="flex flex-col gap-2">
            <li v-for="city in recentCities" :key="city.name">
              <button
                class="rounded flex justify-center items-center gap-2 w-full bg-primary-100 px-6 pb-3 pt-3 text-[14px] font-medium uppercase leading-normal text-primary-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-primary-200 hover:shadow-light-2 focus:bg-primary-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-primary-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                @click="selectCity(city)"
              >
                <img
                  class="w-4 h-4 object-contain mb-[2px]"
                  :src="`https://flagsapi.com/${city.country}/flat/64.png`"
                  alt=""
                />
                {{ city.name }}
              </button>
            </li>
          </ul>
          <p
            v-else
            class="text-[12px] lg:text-[16px] text-center italic text-primary-500"
          >
            No recent searches
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";

const cityName = ref("");
const suggestions = ref([]);
const weatherData = ref(null);
const unit = ref("metric");
const selectedCity = ref(null);
const recentCities = ref([]);

const unitSymbol = computed(() => (unit.value === "metric" ? "C" : "F"));
const temperature = computed(() =>
  weatherData.value ? Math.round(weatherData.value.main.temp) : ""
);

const API_KEY = "f015ae0332e81fb36661c3e37932a485";

const searchCity = async () => {
  if (!cityName.value || typeof cityName.value !== "string") {
    return;
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&limit=5&appid=${API_KEY}`
    );
    suggestions.value = response.data.map((location) => ({
      name: location.name,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
    }));
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
  }
};

const getWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit.value}&appid=${API_KEY}`
    );
    weatherData.value = response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

watch(cityName, (newValue) => {
  if (!newValue) {
    selectedCity.value = null;
    return;
  }
  if (newValue) {
    selectedCity.value = newValue;
    suggestions.value = [];
  }
  if (selectedCity.value.lat && selectedCity.value.lon) {
    getWeatherData(selectedCity.value.lat, selectedCity.value.lon);
    recentCities.value.unshift(selectedCity.value);
    if (recentCities.value.length > 5) {
      recentCities.value.pop();
    }
  }
});

const setUnit = (newUnit) => {
  if (unit.value !== newUnit) {
    unit.value = newUnit;
    if (selectedCity.value) {
      console.log(selectedCity.value);
      getWeatherData(selectedCity.value.lat, selectedCity.value.lon);
    }
  }
};

const selectCity = (city) => {
  console.log(city);
  selectedCity.value = city;

  cityName.value = city;
  suggestions.value = [];
  if (
    recentCities.value.includes(city) &&
    recentCities.value.indexOf(city) > 0
  ) {
    recentCities.value.splice(recentCities.value.indexOf(city), 1);
  }
  getWeatherData(city.lat, city.lon);
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}
</style>
