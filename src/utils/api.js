// src/utils/api.js
import axios from "axios";

// Remove quotes from the API key value
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY?.replace(/['"]/g, "");
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const cache = new Map();

export const fetchWeatherData = async (cityOrCoords) => {
  const cacheKey = `weather_${JSON.stringify(cityOrCoords)}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    if (!API_KEY) {
      throw new Error("API key is not configured");
    }

    // Check if cityOrCoords is an object with lat and lon properties (i.e., coordinates)
    let weatherData, forecastData, airQualityData;

    if (cityOrCoords.lat && cityOrCoords.lon) {
      // Fetch data using lat and lon
      const { lat, lon } = cityOrCoords;
      weatherData = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      forecastData = await axios.get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      airQualityData = await axios.get(
        `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
    } else {
      // Fallback to using city name
      const city = cityOrCoords;
      weatherData = await axios.get(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      forecastData = await axios.get(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const { lat, lon } = weatherData.data.coord;
      airQualityData = await axios.get(
        `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
    }

    const result = {
      current: weatherData.data,
      forecast: forecastData.data,
      airQuality: airQualityData.data,
    };
    cache.set(cacheKey, result);
    console.log("Fetched weather data:", result);
    return result;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch weather data");
  }
};

export const searchCities = async (query) => {
  try {
    if (!API_KEY) {
      throw new Error("API key is not configured");
    }

    const response = await axios.get(
      `${BASE_URL}/find?q=${query}&type=like&appid=${API_KEY}`
    );
    return response.data.list.map((city) => ({
      name: city.name,
      country: city.sys.country,
      coord: city.coord,
    }));
  } catch (error) {
    console.error("Search Error:", error.response?.data || error.message);
    return [];
  }
};

export const clearCache = () => {
  cache.clear();
};
