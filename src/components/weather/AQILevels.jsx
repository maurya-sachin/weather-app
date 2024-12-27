// src/components/weather/AQILevel.jsx
import PropTypes from "prop-types";

const AQILevel = ({ aqi, aqiValue }) => {
  const levels = {
    1: { text: "Good", color: "bg-green-400/80 dark:bg-green-500/80" },
    2: { text: "Fair", color: "bg-yellow-400/80 dark:bg-yellow-500/80" },
    3: { text: "Moderate", color: "bg-orange-400/80 dark:bg-orange-500/80" },
    4: { text: "Poor", color: "bg-red-400/80 dark:bg-red-500/80" },
    5: { text: "Very Poor", color: "bg-purple-400/80 dark:bg-purple-500/80" },
  };
  const level = levels[aqi] || levels[1];

  return (
    <div
      className="flex items-center gap-2 p-2 rounded-lg 
  bg-white/30 dark:bg-gray-800/30 
  border border-white/10 dark:border-gray-700/30"
    >
      <div
        className={`w-3 h-3 rounded-full ${level.color} shadow-sm`}
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
  aqiValue: PropTypes.number.isRequired,
};

export default AQILevel;
