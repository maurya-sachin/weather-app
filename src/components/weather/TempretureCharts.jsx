// src/components/weather/TemperatureChart.jsx
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { format } from "date-fns";
import { useSettings } from "../../context/SettingsContext"; // Import the useSettings hook

const TemperatureChart = ({ forecastData, convertTemp }) => {
  const { settings, toggleUnit } = useSettings(); // Get the settings context for unit

  const chartData = forecastData.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "p"),
    temp: convertTemp(item.main.temp),
  }));

  return (
    <div
      className="lg:col-span-2 p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
      aria-label="Temperature Forecast"
    >
      <h3 className="text-xl font-bold mb-4">Temperature Forecast</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} aria-hidden="true">
            <XAxis dataKey="time" tick={{ fill: "currentColor" }} />
            <YAxis tick={{ fill: "currentColor" }} />
            <Brush />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6" }}
            />
          </LineChart>
          <p className="sr-only">
            This chart shows temperature forecasts for the next 8 hours.
          </p>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
TemperatureChart.propTypes = {
  forecastData: PropTypes.object.isRequired,
  convertTemp: PropTypes.func.isRequired,
};

export default TemperatureChart;
