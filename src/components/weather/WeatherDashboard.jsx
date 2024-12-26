import { useState, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { fetchWeatherData, searchCities } from "../../utils/api";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import WeatherDetails from "./WeatherDetails";
import SunTimes from "./SunTimes";
import AirQuality from "./AirQuality";
import TemperatureChart from "./TempretureCharts";
import SavedCities from "./SavedCity";

const WeatherDashboard = () => {
  const [city, setCity] = useState("London");
  const [unit, setUnit] = useState("C");
  const [weatherData, setWeatherData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [savedCities, setSavedCities] = useState(
    JSON.parse(localStorage.getItem("savedCities")) || []
  );
  const [loading, setLoading] = useState(true);

  const convertTemp = (temp) => {
    return unit === "F" ? (temp * 9) / 5 + 32 : temp;
  };

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
    const newSavedCities = [...savedCities, city];
    setSavedCities(newSavedCities);
    localStorage.setItem("savedCities", JSON.stringify(newSavedCities));
  };

  const handleDeleteCity = (cityToDelete) => {
    const newSavedCities = savedCities.filter((city) => city !== cityToDelete);
    setSavedCities(newSavedCities);
    localStorage.setItem("savedCities", JSON.stringify(newSavedCities));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchWeatherData(city);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [city]);

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

          <WeatherDetails
            weatherData={weatherData}
            unit={unit}
            convertTemp={convertTemp}
          />

          <SunTimes weatherData={weatherData} />

          <AirQuality airQualityData={weatherData.airQuality} />

          <TemperatureChart
            forecastData={weatherData.forecast}
            convertTemp={convertTemp}
          />
        </div>
      )}

      <SavedCities
        savedCities={savedCities}
        onCitySelect={(city) => setCity(city)}
        onCityDelete={handleDeleteCity}
      />
    </div>
  );
};

export default WeatherDashboard;
