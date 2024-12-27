// src/utils/api.js
import axios from "axios";

// Remove quotes from the API key value
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY?.replace(/['"]/g, "");
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const cache = new Map();

export const fetchWeatherData = async (city) => {
  const cacheKey = `weather_${city}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    if (!API_KEY) {
      throw new Error("API key is not configured");
    }

    const [weather, forecast] = await Promise.all([
      axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`),
      axios.get(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`),
    ]);

    const { lat, lon } = weather.data.coord;
    const airQuality = await axios.get(
      `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    const result = {
      current: weather.data,
      forecast: forecast.data,
      airQuality: airQuality.data,
    };
    cache.set(cacheKey, result);
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
