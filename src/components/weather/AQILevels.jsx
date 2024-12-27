// src/components/weather/AQILevel.jsx
import PropTypes from "prop-types";

const AQILevel = ({ aqi, aqiValue }) => {
  const levels = {
    1: { text: "Good", color: "bg-green-500" },
    2: { text: "Fair", color: "bg-yellow-500" },
    3: { text: "Moderate", color: "bg-orange-500" },
    4: { text: "Poor", color: "bg-red-500" },
    5: { text: "Very Poor", color: "bg-purple-500" },
  };
  const level = levels[aqi] || levels[1];

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-3 h-3 rounded-full ${level.color}`}
        aria-label={`AQI level ${level.text}`}
      />
      <span>{level.text}</span>
      <span className="text-sm">({aqiValue})</span>
    </div>
  );
};

// Prop validation using PropTypes
AQILevel.propTypes = {
  aqi: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
};

export default AQILevel;
