import PropTypes from "prop-types";
import { useSettings } from "../../context/SettingsContext";

// src/components/weather/CurrentWeather.jsx
const CurrentWeather = ({ city, weatherData, onSaveCity }) => {
  const { settings, toggleUnit } = useSettings();

  const convertTemp = (temp) => {
    return settings.unit === "F" ? (temp * 9) / 5 + 32 : temp;
  };

  return (
    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{city}</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-4xl font-semibold">
              {convertTemp(weatherData.current.main.temp).toFixed(1)}°
              {settings.unit}
            </span>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
              alt={weatherData.current.weather[0].description}
              className="w-12 h-12"
              loading="lazy"
            />
          </div>
          <p className="text-lg mt-2 capitalize">
            {weatherData.current.weather[0].description}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={onSaveCity}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Save City
          </button>
          <div className="flex gap-2">
            <button
              onClick={toggleUnit}
              className={`px-4 py-2 rounded-lg ${
                settings.unit === "C" ? "bg-blue-500" : "bg-white/10"
              }`}
            >
              °C
            </button>
            <button
              onClick={toggleUnit}
              className={`px-4 py-2 rounded-lg ${
                settings.unit === "F" ? "bg-blue-500" : "bg-white/10"
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-400">
        <div>
          <p className="text-sm">Min Temp</p>
          <p className="text-lg">
            {convertTemp(weatherData.current.main.temp_min).toFixed(1)}°
            {settings.unit}
          </p>
        </div>
        <div>
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
