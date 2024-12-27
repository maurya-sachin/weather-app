import { Moon, Sun, ThermometerSun } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";

const Setting = () => {
  const { settings, updateSettings, toggleUnit } = useSettings();

  const handleToggleDarkMode = () => {
    updateSettings({ ...settings, darkMode: !settings.darkMode });
  };

  const handleUnitChange = (newUnit) => {
    updateSettings({ ...settings, unit: newUnit });
  };

  const handleReset = () => {
    updateSettings({
      darkMode: false,
      unit: "C", // Reset unit to Celsius
      language: "en",
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Settings</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Customize your weather dashboard experience
          </p>

          <div className="space-y-8">
            {/* Theme Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {settings.darkMode ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                  <span className="font-medium">Theme</span>
                </div>
                <button
                  onClick={handleToggleDarkMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                    settings.darkMode ? "bg-blue-600" : "bg-gray-400"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                      settings.darkMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {settings.darkMode ? "Dark mode enabled" : "Light mode enabled"}
              </p>
            </div>

            {/* Temperature Unit Section */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <ThermometerSun className="w-5 h-5" />
                <span className="font-medium">Temperature Unit</span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleUnitChange("C")}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    settings.unit === "C"
                      ? "bg-blue-500 text-white"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  Celsius (°C)
                </button>
                <button
                  onClick={() => handleUnitChange("F")}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    settings.unit === "F"
                      ? "bg-blue-500 text-white"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  Fahrenheit (°F)
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleReset}
                className="flex-1 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
              >
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
