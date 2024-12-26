import { Moon, Sun } from "lucide-react";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Checking if hava  saved dark mode preference in localStorage
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
    <div
      className={`min-h-screen transition-colors duration-200  dark:bg-gray-900 dark:text-gray-100`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-3xl font-bold text-blue-500">
            Weather Dashboard
          </h1>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20"
          >
            {darkMode ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </div>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
