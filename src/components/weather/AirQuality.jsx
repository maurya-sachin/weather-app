import PropTypes from "prop-types";
import { useState } from "react";
import AQILevel from "./AQILevels";

const AirQuality = ({ airQualityData }) => {
  const components = airQualityData.list[0].components;

  // Calculate average of key pollutant values
  const calculateAverageAQI = () => {
    const values = [
      components.pm2_5,
      components.pm10,
      components.no2,
      components.co,
      components.o3,
      components.so2,
    ];
    const sum = values.reduce((acc, value) => acc + value, 0);
    return Math.round(sum / values.length); // Average AQI
  };

  const [showMore, setShowMore] = useState(false);
  const averageAQI = calculateAverageAQI();

  return (
    <div
      className="md:col-span-2 lg:col-span-1 p-6 rounded-xl 
  bg-gradient-to-br from-blue-50/90 to-white/90 
  dark:from-gray-900/90 dark:to-gray-800/90
  border border-white/20 dark:border-gray-700/30
  backdrop-blur-lg"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Air Quality
      </h3>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {/* Display AQI value with level text */}
          <AQILevel
            aqiValue={averageAQI}
            aqi={airQualityData.list[0].main.aqi}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "PM2.5", value: components.pm2_5, unit: "μg/m³" },
            { label: "PM10", value: components.pm10, unit: "μg/m³" },
            { label: "NO₂", value: components.no2, unit: "μg/m³" },
            { label: "O₃", value: components.o3, unit: "μg/m³" },
            { label: "CO", value: components.co, unit: "μg/m³" },
            { label: "SO₂", value: components.so2, unit: "μg/m³" },
          ].map((pollutant, index) => (
            <div
              key={index}
              className="rounded-lg p-4
  bg-gradient-to-br from-white/50 to-white/30 
  dark:from-gray-800/50 dark:to-gray-700/50
  border border-white/20 dark:border-gray-700/30
  hover:shadow-lg hover:scale-[1.02] 
  transition-all duration-300 ease-in-out"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {pollutant.label}
              </p>
              <p
                className="text-lg text-gray-800 dark:text-gray-100"
                aria-label={`${pollutant.label} level ${pollutant.value} ${pollutant.unit}`}
              >
                {pollutant.value} {pollutant.unit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

AirQuality.propTypes = {
  airQualityData: PropTypes.object.isRequired,
};

export default AirQuality;
