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

const TemperatureChart = ({ forecastData, convertTemp }) => {
  const { settings, updateSettings } = useSettings();

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
      className="lg:col-span-2 p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
      aria-label="Temperature Forecast"
    >
      <h3 className="text-xl font-bold mb-4">Temperature Forecast</h3>
      <div className="h-72">
        {" "}
        {/* Increase height to prevent overlap */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            {/* Adding grid lines for better readability */}
            <CartesianGrid stroke="#333" strokeDasharray="5 5" />

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
                background: "linear-gradient(135deg, #6EE7B7, #3B82F6)", // Gradient background
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
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
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#9333ea" />
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
  convertTemp: PropTypes.func.isRequired,
};

export default TemperatureChart;
