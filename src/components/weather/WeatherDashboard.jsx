import { useState, useEffect, useMemo, Suspense } from "react";
import { debounce } from "lodash";
import { fetchWeatherData, searchCities } from "../../utils/api";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import WeatherDetails from "./WeatherDetails";
import SunTimes from "./SunTimes";
import AirQuality from "./AirQuality";
import { lazy } from "react";
import { useSettings } from "../../context/SettingsContext";
const SavedCities = lazy(() => import("./SavedCity"));
const TemperatureChart = lazy(() => import("./TempretureCharts"));
const WeatherMap = lazy(() => import("./WeatherMap"));
const FiveDayForecast = lazy(() => import("./FiveDayForecast"));

const WeatherDashboard = () => {
  const [city, setCity] = useState(""); // Start with an empty city
  const [unit, setUnit] = useState("C");
  const [weatherData, setWeatherData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [savedCities, setSavedCities] = useState(
    JSON.parse(localStorage.getItem("savedCities")) || []
  );
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const { settings, convertTemp, updateSettings } = useSettings();

  useEffect(() => {
    setSavedCities(settings.savedcities);
  }, [settings.savedcities]);

  // Get user's geolocation if no city is selected
  useEffect(() => {
    if (!city && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
        },
        () => {
          alert("Unable to fetch your location");
          setCity("Delhi"); // Set fallback city in the state
        }
      );
    }
  }, [city]);

  // Fetch weather data based on either city or geolocation
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let data;
        if (city) {
          // Fetch weather data based on city name
          data = await fetchWeatherData(city);
        } else {
          // Fetch weather data based on geolocation
          data = await fetchWeatherData(location);
        }
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [city, location, settings.unit]);

  // Use useMemo to ensure debouncedSearch is created only once
  const debouncedSearch = useMemo(() => {
    return debounce(async (query) => {
      if (query.length > 2) {
        const results = await searchCities(query);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 300);
  }, []);

  const handleSaveCity = () => {
    if (!settings.savedcities.includes(city)) {
      const newSavedCities = [...settings.savedcities, city];
      updateSettings({ ...settings, savedcities: newSavedCities });
    }
  };

  const handleDeleteCity = (cityToDelete) => {
    const newSavedCities = settings.savedcities.filter(
      (city) => city !== cityToDelete
    );

    // Update settings in context and save to DB
    const updatedSettings = { ...settings, savedcities: newSavedCities };
    updateSettings(updatedSettings);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <SearchBar
        onSearch={debouncedSearch}
        searchResults={searchResults}
        onCitySelect={(city) => {
          setCity(city);
          setSearchResults([]);
        }}
      />

      {weatherData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-5">
          <CurrentWeather
            city={city}
            weatherData={weatherData}
            unit={unit}
            onUnitChange={setUnit}
            onSaveCity={handleSaveCity}
          />

          <WeatherDetails
            weatherData={weatherData}
            unit={unit}
            convertTemp={convertTemp}
          />

          <AirQuality airQualityData={weatherData.airQuality} />

          <Suspense fallback={<div>Loading...</div>}>
            <WeatherMap city={city} location={location} />
          </Suspense>

          <SunTimes weatherData={weatherData} />

          <Suspense fallback={<div>Loading...</div>}>
            <TemperatureChart forecastData={weatherData.forecast} />

            <FiveDayForecast forecastData={weatherData.forecast} />
            <SavedCities
              savedCities={savedCities}
              onCitySelect={(city) => setCity(city)}
              onCityDelete={handleDeleteCity}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
