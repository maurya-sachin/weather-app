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
      } bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-800 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-gray-100`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 relative">
          <div className="mb-3 sm:mb-0 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-500">
              WeatherAffair
            </h1>
            <span className="text-gray-600 dark:text-gray-300">
              Your Personal Weather Companion
            </span>
          </div>
          <div className="controls flex xl:flex-col gap-2 xl:absolute right-0 top-5 z-10">
            <button
              className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 border border-gray-300 shadow-sm dark:bg-white/10 dark:border-white/20 dark:shadow-md transition-all"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {settings.darkMode ? (
                <Sun className="w-6 h-6 text-yellow-500" loading="lazy" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700" loading="lazy" />
              )}
            </button>
            <Link
              to="/"
              className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 border border-gray-300 shadow-sm dark:bg-white/10 dark:border-white/20 dark:shadow-md transition-all text-gray-800 dark:text-white"
            >
              <LayoutDashboard className="w-6 h-6" aria-label="Dashboard" />
            </Link>
            <Link
              to="/setting"
              className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 border border-gray-300 shadow-sm dark:bg-white/10 dark:border-white/20 dark:shadow-md transition-all text-gray-800 dark:text-white"
            >
              <Settings2 className="w-6 h-6" aria-label="Settings" />
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
