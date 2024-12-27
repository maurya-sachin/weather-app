import PropTypes from "prop-types";
import { format } from "date-fns";
import { useSettings } from "../../context/SettingsContext";

const FiveDayForecast = ({ forecastData }) => {
  const { convertTemp, settings } = useSettings();

  const days = forecastData.list.reduce((acc, curr) => {
    const date = new Date(curr.dt * 1000);
    const day = format(date, "EEEE"); // Get the day of the week (e.g., Monday)

    if (!acc[day]) {
      acc[day] = {
        minTemp: curr.main.temp_min,
        maxTemp: curr.main.temp_max,
        avgTemp: curr.main.temp,
        weather: curr.weather[0].main,
        icon: curr.weather[0].icon,
      };
    } else {
      acc[day].minTemp = Math.min(acc[day].minTemp, curr.main.temp_min);
      acc[day].maxTemp = Math.max(acc[day].maxTemp, curr.main.temp_max);
      acc[day].avgTemp += curr.main.temp; // Accumulate for average later
    }

    return acc;
  }, {});

  // Calculate average temperature for each day
  Object.keys(days).forEach((day) => {
    days[day].avgTemp /= forecastData.list.filter(
      (item) => format(new Date(item.dt * 1000), "EEEE") === day
    ).length;
  });

  return (
    <div
      className="sm:col-span-2 md:col-span-4  lg:col-span-3 p-6 rounded-xl 
  bg-gradient-to-br from-blue-50/90 to-white/90 
  dark:from-gray-900/90 dark:to-gray-800/90
  border border-white/20 dark:border-gray-700/30
  backdrop-blur-lg "
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(days).map(([day, data]) => (
          <div
            key={day}
            className="flex align-baseline justify-between p-4 rounded-lg 
  bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-700/50
  border border-white/20 dark:border-gray-700/30
  hover:shadow-lg hover:scale-[1.02] hover:border-blue-200/30 dark:hover:border-blue-500/30
  backdrop-blur-md
  transition-all duration-300 ease-in-out
  cursor-pointer "
          >
            <div className="data">
              <h4 className="text-lg font-semibold">{day}</h4>

              <p>
                {`${convertTemp(data.minTemp).toFixed(1)}°${
                  convertTemp(data.minTemp) === convertTemp(data.maxTemp)
                    ? ""
                    : `${settings.unit}`
                } - ${convertTemp(data.maxTemp).toFixed(1)}°${settings.unit}`}
              </p>
              <p>{`Avg: ${convertTemp(data.avgTemp).toFixed(1)}°${
                settings.unit
              }`}</p>
            </div>
            <div className="icon">
              <p>
                <img
                  src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
                  alt={data.weather}
                  className="inline-block w-14 sm:w-15 h-14 sm:h-15 mr-2"
                />
                {data.weather}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

FiveDayForecast.propTypes = {
  forecastData: PropTypes.object.isRequired,
};

export default FiveDayForecast;
