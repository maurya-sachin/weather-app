import { useState, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { fetchWeatherData, searchCities } from "../../utils/api";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import WeatherDetails from "./WeatherDetails";
import SunTimes from "./SunTimes";
import AirQuality from "./AirQuality";
import { lazy, Suspense } from "react";
const SavedCities = lazy(() => import("./SavedCity"));
const TemperatureChart = lazy(() => import("./TempretureCharts"));
import { useSettings } from "../../context/SettingsContext";
import WeatherMap from "./WeatherMap";
const FiveDayForecast = lazy(() => import("./FiveDayForecast"));
const WeatherDashboard = () => {
  const [city, setCity] = useState("London");
  const [unit, setUnit] = useState("C");
  const [weatherData, setWeatherData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [savedCities, setSavedCities] = useState(
    JSON.parse(localStorage.getItem("savedCities")) || []
  );
  const [loading, setLoading] = useState(true);
  const { settings, convertTemp } = useSettings();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchWeatherData(city, settings.unit);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [city, settings.unit]);

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
    if (!savedCities.includes(city)) {
      const newSavedCities = [...savedCities, city];
      setSavedCities(newSavedCities);
      localStorage.setItem("savedCities", JSON.stringify(newSavedCities));
    }
  };

  const handleDeleteCity = (cityToDelete) => {
    const newSavedCities = savedCities.filter((city) => city !== cityToDelete);
    setSavedCities(newSavedCities);
    localStorage.setItem("savedCities", JSON.stringify(newSavedCities));
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CurrentWeather
            city={city}
            weatherData={weatherData}
            unit={unit}
            onUnitChange={setUnit}
            onSaveCity={handleSaveCity}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <WeatherMap />
          </Suspense>

          <WeatherDetails
            weatherData={weatherData}
            unit={unit}
            convertTemp={convertTemp}
          />

          <SunTimes weatherData={weatherData} />

          <AirQuality airQualityData={weatherData.airQuality} />

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
