import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/WeatherMap.css";
import { fetchWeatherData } from "../../utils/api";
import { useSettings } from "../../context/SettingsContext";
import PropTypes from "prop-types";

const WeatherMap = ({ city, location }) => {
  const { settings, convertTemp } = useSettings();
  const [weatherData, setWeatherData] = useState(null);
  const mapRef = useRef(null); // Reference to hold the map instance

  // Function to fetch weather data based on city or geolocation
  const fetchWeather = async (cityOrCoords) => {
    try {
      const data = await fetchWeatherData(cityOrCoords);
      setWeatherData(data);
    } catch (error) {
      alert("Failed to fetch weather data ", error);
    }
  };

  // Fetch weather data when city or location changes
  useEffect(() => {
    if (city) {
      fetchWeather(city); // Fetch weather for the selected city
    } else if (location.lat && location.lon) {
      fetchWeather(location); // Fetch weather for geolocation
    }
  }, [city, location]);

  // Initialize Leaflet map whenever location or weather data changes
  useEffect(() => {
    if ((city || (location.lat && location.lon)) && weatherData) {
      const coords = city ? weatherData.current.coord : location;

      if (!mapRef.current) {
        // Initialize the map only if it hasn't been initialized yet
        mapRef.current = L.map("weather-map").setView(
          [coords.lat, coords.lon],
          10
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
          mapRef.current
        );

        // Add a marker with weather info as a popup and custom label
        const marker = L.marker([coords.lat, coords.lon]).addTo(mapRef.current);
        marker
          .bindPopup(
            `
            <div class="p-4 max-w-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-md">
              <b class="text-xl">${weatherData.current.name}</b><br/>
              <span>Weather: ${
                weatherData.current.weather[0].description
              }</span><br/>
              <span>Temperature: ${convertTemp(
                weatherData.current.main.temp
              )}°${settings.unit}</span>
            </div>
          `
          )
          .openPopup();
      } else {
        // If map already exists, just update its center and marker
        mapRef.current.setView([coords.lat, coords.lon], 10);
        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            layer.setLatLng([coords.lat, coords.lon]);
            layer.setPopupContent(`
              <div class="p-4 max-w-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-md">
                <b class="text-xl">${weatherData.current.name}</b><br/>
                <span>Weather: ${
                  weatherData.current.weather[0].description
                }</span><br/>
                <span>Temperature: ${convertTemp(
                  weatherData.current.main.temp
                )}°${settings.unit}</span>
              </div>
            `);
            layer.openPopup();
          }
        });
      }
    }

    // Cleanup the map on component unmount or location/weatherData change
    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); // Removes the map instance from the container
        mapRef.current = null;
      }
    };
  }, [city, location, weatherData, settings.unit, convertTemp]);

  return (
    <div
      className=" md:col-span-2 rounded-xl 
  bg-gradient-to-br from-blue-50/90 to-white/90 
  dark:from-gray-900/90 dark:to-gray-800/90
  border border-white/20 dark:border-gray-700/30
  backdrop-blur-lg overflow-hidden"
    >
      <div id="weather-map" className="h-96 sm:h-full w-full"></div>
    </div>
  );
};

WeatherMap.propTypes = {
  city: PropTypes.string,
  location: PropTypes.object,
};

export default WeatherMap;
