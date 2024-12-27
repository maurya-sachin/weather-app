// src/components/layout/Layout.js
import { useEffect } from "react";
import { LayoutDashboard, Moon, Settings2, Sun } from "lucide-react";
import { Routes, Route, Link } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext.jsx";
import WeatherDashboard from "../weather/WeatherDashboard.jsx";
import Setting from "../setting/Setting.jsx";

function Layout() {
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    // Apply dark mode globally based on context
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  const toggleDarkMode = () => {
    updateSettings({ ...settings, darkMode: !settings.darkMode });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        settings.darkMode ? "dark" : ""
      } bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 text-gray-800 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-gray-100`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 relative">
          <div className="mb-3 sm:mb-0 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-blue-500">WeatherAffair</h1>
            <span>Your Personal Weather Companion</span>
          </div>
          <div className="controls flex xl:flex-col gap-2 xl:absolute right-0 top-5 z-10">
            <button
              className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {settings.darkMode ? (
                <Sun className="w-6 h-6 text-white" loading="lazy" />
              ) : (
                <Moon className="w-6 h-6 text-black" loading="lazy" />
              )}
            </button>
            <Link
              to="/"
              className="p-2 rounded-lg backdrop-blur-md border border-white/20 text-gray-800 dark:text-white"
            >
              <LayoutDashboard
                className={`w-6 h-6 ${
                  settings.darkMode ? "text-white" : "text-black"
                }`}
                loading="lazy"
                aria-label="Dashboard"
              />
            </Link>
            <Link
              to="/setting"
              className="p-2 rounded-lg backdrop-blur-md border border-white/20 text-gray-800 dark:text-white"
            >
              <Settings2
                className={`w-6 h-6 ${
                  settings.darkMode ? "text-white" : "text-black"
                }`}
                loading="lazy"
                aria-label="Settings"
              />
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
