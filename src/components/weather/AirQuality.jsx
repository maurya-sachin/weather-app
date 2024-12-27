import PropTypes from "prop-types";
import { useState } from "react";
import AQILevel from "./AQILevels";

// src/components/weather/AirQuality.jsx
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
    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
      <h3 className="text-xl font-bold mb-4">Air Quality</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {/* Display AQI value with level text */}
          <AQILevel
            aqiValue={averageAQI}
            aqi={airQualityData.list[0].main.aqi}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">PM2.5</p>
            <p
              className="text-lg"
              aria-label={`PM2.5 level ${components.pm2_5} μg/m³`}
            >
              {components.pm2_5} μg/m³
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">PM10</p>
            <p
              className="text-lg"
              aria-label={`PM10 level ${components.pm10} μg/m³`}
            >
              {components.pm10} μg/m³
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">NO₂</p>
            <p
              className="text-lg"
              aria-label={`NO₂ level ${components.no2} μg/m³`}
            >
              {components.no2} μg/m³
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">O₃</p>
            <p
              className="text-lg"
              aria-label={`O₃ level ${components.o3} μg/m³`}
            >
              {components.o3} μg/m³
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">CO</p>
            <p
              className="text-lg"
              aria-label={`CO level ${components.co} μg/m³`}
            >
              {components.co} μg/m³
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">SO₂</p>
            <p
              className="text-lg"
              aria-label={`SO₂ level ${components.so2} μg/m³`}
            >
              {components.so2} μg/m³
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

AirQuality.propTypes = {
  airQualityData: PropTypes.object.isRequired,
};

export default AirQuality;
