// src/components/weather/WeatherDetails.jsx
import { Wind, Droplets, Gauge, ThermometerSun } from "lucide-react";
import PropTypes from "prop-types";

const WeatherDetails = ({ weatherData, unit, convertTemp }) => {
  return (
    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
      <h3 className="text-xl font-bold mb-4">Details</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Wind className="w-5 h-5 mr-2" />
            <span>Wind</span>
          </div>
          <span>{weatherData.current.wind.speed} m/s</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Droplets className="w-5 h-5 mr-2" />
            <span>Humidity</span>
          </div>
          <span>{weatherData.current.main.humidity}%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Gauge className="w-5 h-5 mr-2" />
            <span>Pressure</span>
          </div>
          <span>{weatherData.current.main.pressure} hPa</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ThermometerSun className="w-5 h-5 mr-2" />
            <span>Feels like</span>
          </div>
          <span>
            {convertTemp(weatherData.current.main.feels_like).toFixed(1)}°{unit}
          </span>
        </div>
      </div>
    </div>
  );
};

WeatherDetails.propTypes = {
  weatherData: PropTypes.object.isRequired,
  unit: PropTypes.string.isRequired,
  convertTemp: PropTypes.func.isRequired,
};

export default WeatherDetails;
