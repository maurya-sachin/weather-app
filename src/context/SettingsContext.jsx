// src/context/SettingsContext.jsx
import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";
import { applyTheme } from "../utils/theme";
import { supabase } from "../supabase"; // Assuming you're using Supabase for database
import { useAuth } from "./AuthContext"; // Import useAuth to check user authentication

const SettingsContext = createContext();

const fetchSettingsFromDB = async (userId) => {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("user_id", userId)
    .single()
    .headers({ Accept: "application/json" });
  if (error) {
    console.error("Error fetching settings from DB:", error);
    return null;
  }
  return data;
};

const saveSettingsToDB = async (newSettings) => {
  const { error } = await supabase
    .from("settings")
    .upsert(newSettings, { onConflict: ["user_id"] });
  if (error) {
    console.error("Error saving settings to DB:", error);
  }
};

export const SettingsProvider = ({ children }) => {
  const auth = useAuth(); // Get the authenticated user
  const user = auth ? auth.user : null; // Ensure auth is defined

  const [settings, setSettings] = useState(() => {
    const savedSettings = sessionStorage.getItem("settings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : { darkmode: false, unit: "C", savedcities: [] };
  });

  useEffect(() => {
    const loadSettings = async () => {
      if (user) {
        const dbSettings = await fetchSettingsFromDB(user.id);
        if (dbSettings) {
          setSettings(dbSettings);
          applyTheme(dbSettings.darkmode);
        }
      }
    };
    loadSettings();
  }, [user]);

  const toggleUnit = () => {
    const newUnit = settings.unit === "C" ? "F" : "C";
    updateSettings({ ...settings, unit: newUnit });
  };

  const convertTemp = (temp) => {
    return settings.unit === "F" ? (temp * 9) / 5 + 32 : temp;
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    sessionStorage.setItem("settings", JSON.stringify(newSettings));
    if (user) {
      saveSettingsToDB({ ...newSettings, user_id: user.id });
    }
    applyTheme(newSettings.darkmode);
  };

  const resetSettings = () => {
    const defaultSettings = {
      darkmode: false,
      unit: "C",
      savedcities: [],
    };
    updateSettings(defaultSettings);
  };

  useEffect(() => {
    applyTheme(settings.darkmode);
  }, [settings.darkmode]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        toggleUnit,
        convertTemp,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSettings = () => useContext(SettingsContext);
