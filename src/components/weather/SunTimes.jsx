import { Sunrise, Sunset } from "lucide-react";
import PropTypes from "prop-types";
import { format } from "date-fns";

const SunTimes = ({ weatherData }) => {
  return (
    <div
      className="order-1 lg:order-none md:col-span-2 lg:col-span-1 p-6 rounded-xl 
  bg-gradient-to-br from-blue-50/90 to-white/90 
  dark:from-gray-900/90 dark:to-gray-800/90
  border border-white/20 dark:border-gray-700/30
  backdrop-blur-lg "
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Sun Times
      </h3>
      <div className="space-y-4">
        <div
          className="flex items-center justify-between p-3 rounded-lg 
  bg-gradient-to-br from-white/50 to-white/30 
  dark:from-gray-800/50 dark:to-gray-700/50
  border border-white/20 dark:border-gray-700/30
  hover:shadow-lg hover:scale-[1.02] 
  transition-all duration-300 ease-in-out"
        >
          <div className="flex items-center">
            <Sunrise
              className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400"
              aria-label="Sunrise icon"
            />
            <span className="text-gray-700 dark:text-gray-300">Sunrise</span>
          </div>
          <span className="text-gray-700 dark:text-gray-300">
            {format(new Date(weatherData.current.sys.sunrise * 1000), "p")}
          </span>
        </div>
        <div
          className="flex items-center justify-between p-3 rounded-lg 
  bg-gradient-to-br from-white/50 to-white/30 
  dark:from-gray-800/50 dark:to-gray-700/50
  border border-white/20 dark:border-gray-700/30
  hover:shadow-lg hover:scale-[1.02] 
  transition-all duration-300 ease-in-out"
        >
          <div className="flex items-center">
            <Sunset
              className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400"
              aria-label="Sunset icon"
            />
            <span className="text-gray-700 dark:text-gray-300">Sunset</span>
          </div>
          <span className="text-gray-700 dark:text-gray-300">
            {format(new Date(weatherData.current.sys.sunset * 1000), "p")}
          </span>
        </div>
      </div>
    </div>
  );
};

SunTimes.propTypes = {
  weatherData: PropTypes.object.isRequired,
};

export default SunTimes;
