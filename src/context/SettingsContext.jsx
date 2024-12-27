// src/context/SettingsContext.jsx
import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    darkMode: localStorage.getItem("darkMode") === "true" || false,
    unit: localStorage.getItem("unit") || "C",
  });

  const toggleUnit = () => {
    const newUnit = settings.unit === "C" ? "F" : "C";
    updateSettings({ ...settings, unit: newUnit });
  };

  useEffect(() => {
    applyTheme(settings.darkMode);
  }, [settings.darkMode]);

  const applyTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark:bg-gray-900", "dark:text-white");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark:bg-gray-900", "dark:text-white");
    }
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem("darkMode", newSettings.darkMode);
    localStorage.setItem("unit", newSettings.unit);
    applyTheme(newSettings.darkMode);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, toggleUnit }}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSettings = () => useContext(SettingsContext);
