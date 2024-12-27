// src/context/SettingsContext.jsx
import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";
import { applyTheme } from "../utils/theme";

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
