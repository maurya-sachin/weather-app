import { useEffect, useState } from "react";
import { LayoutDashboard, Moon, Settings2, Sun } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Setting from "./components/setting/Setting.jsx";
import WeatherDashboard from "./components/weather/WeatherDashboard.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Checking if saved dark mode preference exists in localStorage
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);

    // Checking system preference and apply dark mode based on system settings
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (!localStorage.getItem("darkMode")) {
      setDarkMode(isDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true"); // Save dark mode preference
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false"); // Save light mode preference
    }
  }, [darkMode]);

  return (
    <Router>
      <div
        className={`min-h-screen transition-colors duration-200 ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:text-gray-100"
            : "bg-gradient-to-br from-blue-100 via-white to-blue-300 text-gray-800"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4 relative">
            <h1 className="text-3xl font-bold text-blue-500">
              Weather Dashboard
            </h1>
            <div className="controls flex flex-col gap-2 absolute right-0 top-5">
              <button
                className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20"
                onClick={() => setDarkMode((prev) => !prev)}
              >
                {darkMode ? (
                  <Sun className="w-6 h-6" />
                ) : (
                  <Moon className="w-6 h-6" />
                )}
              </button>
              <Link
                to="/"
                className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20"
              >
                <LayoutDashboard className="w-6 h-6" />
              </Link>
              <Link
                to="/setting"
                className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20"
              >
                <Settings2 className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<WeatherDashboard />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
