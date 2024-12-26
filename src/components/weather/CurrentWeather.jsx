import PropTypes from "prop-types";

// src/components/weather/CurrentWeather.jsx
const CurrentWeather = ({
  city,
  weatherData,
  unit,
  onUnitChange,
  onSaveCity,
}) => {
  const convertTemp = (temp) => {
    return unit === "F" ? (temp * 9) / 5 + 32 : temp;
  };

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{city}</h2>
          <div className="flex items-center gap-4">
            <span className="text-6xl font-bold">
              {convertTemp(weatherData.current.main.temp).toFixed(1)}°{unit}
            </span>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
              alt={weatherData.current.weather[0].description}
              className="w-16 h-16"
            />
          </div>
          <p className="text-xl mt-2 capitalize">
            {weatherData.current.weather[0].description}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={onSaveCity}
            className="mb-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Save City
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => onUnitChange("C")}
              className={`px-4 py-2 rounded-lg ${
                unit === "C" ? "bg-blue-500" : "bg-white/10"
              }`}
            >
              °C
            </button>
            <button
              onClick={() => onUnitChange("F")}
              className={`px-4 py-2 rounded-lg ${
                unit === "F" ? "bg-blue-500" : "bg-white/10"
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CurrentWeather.propTypes = {
  city: PropTypes.string.isRequired,
  weatherData: PropTypes.object.isRequired,
  unit: PropTypes.string.isRequired,
  onUnitChange: PropTypes.func.isRequired,
  onSaveCity: PropTypes.func.isRequired,
};

export default CurrentWeather;