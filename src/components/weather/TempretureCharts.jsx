// src/components/weather/TemperatureChart.jsx
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { useSettings } from "../../context/SettingsContext";
import { useEffect } from "react";

const TemperatureChart = ({ forecastData }) => {
  const { settings, convertTemp } = useSettings();

  useEffect(() => {
    // Apply dark mode globally based on context
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);
  const chartData = forecastData.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "p"),
    temp: convertTemp(item.main.temp),
  }));

  return (
    <div
      className="sm:col-span-2 md:col-span-4 lg:col-span-3 p-6 rounded-xl 
  bg-gradient-to-br from-blue-50/90 to-white/90 
  dark:from-gray-900/90 dark:to-gray-800/90
  border border-white/20 dark:border-gray-700/30
  backdrop-blur-lg "
      aria-label="Temperature Forecast"
    >
      <h3 className="text-xl font-bold mb-4">Temperature Forecast</h3>
      <div className="h-72">
        {" "}
        {/* Increase height to prevent overlap */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            {/* Adding grid lines for better readability */}
            <CartesianGrid
              stroke={settings.darkMode ? "#333" : "#e2e8f0"}
              strokeDasharray="3 3"
            />
            {/* X and Y axis with dynamic color based on the theme */}
            <XAxis
              dataKey="time"
              tick={{
                fill: settings.darkMode ? "#e5e7eb" : "#2f2f2f",
              }}
              tickLine={false}
              axisLine={{ stroke: "#555" }} // Darker axis line color
              interval={0} // Ensures all labels are visible
              angle={-45} // Tilt axis labels to avoid overlap
              textAnchor="end" // Proper alignment for rotated labels
            />
            <YAxis
              tick={{
                fill: settings.darkMode ? "#e5e7eb" : "#2f2f2f",
              }}
              tickLine={false}
              axisLine={{ stroke: "#555" }}
            />
            {/* Custom Tooltips with vibrant background */}
            <Tooltip
              contentStyle={{
                background: settings.darkMode ? "#1f2937" : "white",
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid",
                borderColor: settings.darkMode ? "#374151" : "#e5e7eb",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              }}
              labelFormatter={(value) => `Time: ${value}`}
              formatter={(value) => [`${value}°C`, "Temperature"]}
            />
            {/* Gradient Line for the temperature data */}
            <defs>
              <linearGradient
                id="tempGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor={settings.darkMode ? "#60a5fa" : "#3b82f6"}
                />
                <stop
                  offset="100%"
                  stopColor={settings.darkMode ? "#818cf8" : "#6366f1"}
                />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="temp"
              stroke="url(#tempGradient)" // Gradient stroke
              strokeWidth={4}
              dot={{ fill: "#3b82f6", r: 5 }} // Larger dots
              activeDot={{ r: 8 }} // Larger active dot
              isAnimationActive={true} // Enable animation
              animationDuration={1500} // Smooth animation with longer duration
              animationEasing="ease-in-out" // Smooth easing function
              style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }} // Adding subtle shadow to the line
            />
            {/* Legend (optional, if you have multiple series) */}
            <Legend
              wrapperStyle={{
                paddingTop: "20px", // Adds space between legend and chart
              }}
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
};

export default TemperatureChart;
