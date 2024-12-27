import { Wind, Droplets, Gauge, ThermometerSun } from "lucide-react";
import PropTypes from "prop-types";
import { useSettings } from "../../context/SettingsContext";

const WeatherDetails = ({ weatherData, convertTemp }) => {
  const { settings } = useSettings(); // Get the settings context for unit

  return (
    <div
      className="p-6 rounded-xl 
  bg-gradient-to-br from-blue-50/90 to-white/90 
  dark:from-gray-900/90 dark:to-gray-800/90
  border border-white/20 dark:border-gray-700/30
  backdrop-blur-lg"
      aria-label="Weather Details"
    >
      <h3 className="text-xl font-bold mb-4">Details</h3>
      <div className="space-y-4">
        <div
          className="flex items-center justify-between p-3 rounded-lg 
  bg-gradient-to-br from-cyan-100 to-blue-200 
  dark:from-purple-700 dark:to-blue-500
  border border-white/20 dark:border-gray-700/30
  hover:shadow-lg hover:scale-[1.02] 
  transition-all duration-300 ease-in-out"
        >
          <div className="flex items-center">
            <Wind className="w-5 h-5 mr-2" loading="lazy" />
            <span className="">Wind</span>
          </div>
          <span className="">{weatherData.current.wind.speed} m/s</span>
        </div>
        <div
          className="
        flex items-center justify-between p-3 rounded-lg 
  bg-gradient-to-br from-teal-100 to-green-200 
  dark:from-purple-700 dark:to-pink-500
  border border-white/20 dark:border-gray-700/30
  hover:shadow-lg hover:scale-[1.02] 
  transition-all duration-300 ease-in-out
        "
        >
          <div className="flex items-center">
            <Droplets className="w-5 h-5 mr-2" loading="lazy" />
            <span className="">Humidity</span>
          </div>
          <span className="">{weatherData.current.main.humidity}%</span>
        </div>
        <div
          className="flex items-center justify-between p-3 rounded-lg 
  bg-gradient-to-br from-yellow-100 to-orange-200 
  dark:from-purple-700 dark:to-pink-500
  border border-white/20 dark:border-gray-700/30
  hover:shadow-lg hover:scale-[1.02] 
  transition-all duration-300 ease-in-out"
        >
          <div className="flex items-center">
            <Gauge className="w-5 h-5 mr-2" loading="lazy" />
            <span className="">Pressure</span>
          </div>
          <span className="">{weatherData.current.main.pressure} hPa</span>
        </div>
        <div
          className="flex items-center justify-between p-3 rounded-lg 
  bg-gradient-to-br from-red-100 to-orange-200 
  dark:from-purple-700 dark:to-blue-500
  border border-white/20 dark:border-gray-700/30
  hover:shadow-lg hover:scale-[1.02] 
  transition-all duration-300 ease-in-out"
        >
          <div className="flex items-center">
            <ThermometerSun className="w-5 h-5 mr-2" loading="lazy" />
            <span className="">Feels like</span>
          </div>
          <span className="">
            {/* Convert temperature using the appropriate unit */}
            {convertTemp(weatherData.current.main.feels_like).toFixed(1)}°
            {settings.unit}
          </span>
        </div>
      </div>
    </div>
  );
};

WeatherDetails.propTypes = {
  weatherData: PropTypes.object.isRequired,
  convertTemp: PropTypes.func.isRequired, // Ensure the temp conversion function is passed down
};

export default WeatherDetails;
