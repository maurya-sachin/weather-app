import PropTypes from "prop-types";
import AQILevel from "./AQILevels";

// src/components/weather/AirQuality.jsx
const AirQuality = ({ airQualityData }) => {
  return (
    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
      <h3 className="text-xl font-bold mb-4">Air Quality</h3>
      <div className="space-y-4">
        <AQILevel aqi={airQualityData.list[0].main.aqi} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">PM2.5</p>
            <p className="text-lg">
              {airQualityData.list[0].components.pm2_5} μg/m³
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">PM10</p>
            <p className="text-lg">
              {airQualityData.list[0].components.pm10} μg/m³
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">NO₂</p>
            <p className="text-lg">
              {airQualityData.list[0].components.no2} μg/m³
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">O₃</p>
            <p className="text-lg">
              {airQualityData.list[0].components.o3} μg/m³
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
