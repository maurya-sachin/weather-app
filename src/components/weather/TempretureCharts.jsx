// src/components/weather/TemperatureChart.jsx
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TemperatureChart = ({ forecastData, convertTemp }) => {
  const chartData = forecastData.list.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString(),
    temp: convertTemp(item.main.temp),
  }));

  return (
    <div className="lg:col-span-2 p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
      <h3 className="text-xl font-bold mb-4">Temperature Forecast</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} aria-hidden="true">
            <XAxis dataKey="time" tick={{ fill: "currentColor" }} />
            <YAxis tick={{ fill: "currentColor" }} />
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
