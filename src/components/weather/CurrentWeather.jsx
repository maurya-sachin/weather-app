import PropTypes from "prop-types";
import { useSettings } from "../../context/SettingsContext";

// src/components/weather/CurrentWeather.jsx
const CurrentWeather = ({ city, weatherData, onSaveCity }) => {
  const { settings, toggleUnit, convertTemp } = useSettings();

  return (
    <div
      className="md:col-span-2 lg:col-span-1 p-6 rounded-xl 
  bg-gradient-to-br from-blue-50/90 to-white/90 
  dark:from-gray-900/90 dark:to-gray-800/90
  border border-white/20 dark:border-gray-700/30
  backdrop-blur-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{city}</h2>
          <span className="text-4xl font-semibold">
            {convertTemp(weatherData.current.main.temp).toFixed(1)}°
            {settings.unit}
          </span>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-lg mt-2 capitalize">
              {weatherData.current.weather[0].description}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
              alt={weatherData.current.weather[0].description}
              className="w-12 h-12 dark:invert"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={onSaveCity}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg hover:shadow-lg hover:scale-[1.02] 
  transition-all duration-300 ease-in-out"
          >
            Save City
          </button>
          <div className="flex gap-2">
            <button
              onClick={toggleUnit}
              className={`px-4 py-2 rounded-lg hover:shadow-lg hover:scale-[1.02] 
  transition-all duration-300 ease-in-out ${
    settings.unit === "C" ? "bg-blue-500" : "bg-white/10"
  }`}
            >
              °C
            </button>
            <button
              onClick={toggleUnit}
              className={`px-4 py-2 rounded-lg hover:shadow-lg hover:scale-[1.02] 
  transition-all duration-300 ease-in-out ${
    settings.unit === "F" ? "bg-blue-500" : "bg-white/10"
  }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <div
          className="p-4 rounded-lg  bg-gradient-to-br from-yellow-100 to-orange-200 
  dark:from-purple-700 dark:to-pink-500
  border border-white/20 dark:border-gray-700/30
  hover:shadow-lg hover:scale-[1.02] 
  transition-all duration-300 ease-in-out"
        >
          <p className="text-sm">Min Temp</p>
          <p className="text-lg">
            {convertTemp(weatherData.current.main.temp_min).toFixed(1)}°
            {settings.unit}
          </p>
        </div>
        <div
          className="p-4 rounded-lg  bg-gradient-to-br from-yellow-100 to-orange-200 
  dark:from-purple-700 dark:to-pink-500
  border border-white/20 dark:border-gray-700/30
  hover:shadow-lg hover:scale-[1.02] 
  transition-all duration-300 ease-in-out"
        >
          <p className="text-sm">Max Temp</p>
          <p className="text-lg">
            {convertTemp(weatherData.current.main.temp_max).toFixed(1)}°
            {settings.unit}
          </p>
        </div>
      </div>
    </div>
  );
};

CurrentWeather.propTypes = {
  city: PropTypes.string.isRequired,
  weatherData: PropTypes.object.isRequired,
  onSaveCity: PropTypes.func.isRequired,
};

export default CurrentWeather;
