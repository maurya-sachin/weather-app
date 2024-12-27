// src/components/weather/SunTimes.jsx
import { Sunrise, Sunset } from "lucide-react";
import PropTypes from "prop-types";
import { format } from "date-fns";

const SunTimes = ({ weatherData }) => {
  return (
    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
      <h3 className="text-xl font-bold mb-4">Sun Times</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sunrise className="w-5 h-5 mr-2" />
            <span>Sunrise</span>
          </div>
          <span>
            {format(new Date(weatherData.current.sys.sunrise * 1000), "p")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sunset className="w-5 h-5 mr-2" />
            <span>Sunset</span>
          </div>
          <span>
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
