import { useEffect } from "react";
import {
  LayoutDashboard,
  LogIn,
  Moon,
  Settings2,
  Sun,
  UserCircle2Icon,
} from "lucide-react";
import Login from "../auth/Login.jsx";
import Signup from "../auth/Signup.jsx";
import { Routes, Route, Link } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext.jsx";
import WeatherDashboard from "../weather/WeatherDashboard.jsx";
import Setting from "../setting/Setting.jsx";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";

function Layout() {
  const { user, logout } = useAuth();
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    // Apply dark mode globally based on context
    if (settings.darkmode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkmode]);

  const toggleDarkMode = () => {
    updateSettings({ ...settings, darkmode: !settings.darkmode });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        settings.darkmode ? "dark" : ""
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
          <div className="controls xl:absolute right-0 top-5 z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <div className="w-32 flex items-center justify-between break-words whitespace-break-spaces te">
                {!user ? (
                  <></>
                ) : (
                  <>
                    <span className="p-2 text-gray-800 dark:text-white">
                      {user.user_metadata?.displayName || user.email}
                    </span>
                  </>
                )}
              </div>
              <div className="flex lg:flex-col gap-2 items-center ">
                {!user ? (
                  <Link
                    to="/login"
                    className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 border border-gray-300 shadow-sm dark:bg-white/10 dark:border-white/20 dark:shadow-md transition-all text-gray-800 dark:text-white"
                    aria-label="Login and Sign Up"
                  >
                    <UserCircle2Icon className="w-6 h-6" />
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={logout}
                      className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 border border-gray-300 shadow-sm dark:bg-white/10 dark:border-white/20 dark:shadow-md transition-all text-gray-800 dark:text-white"
                      aria-label="Logout"
                    >
                      <LogIn className="w-6 h-6" />
                    </button>
                  </>
                )}
                <button
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 border border-gray-300 shadow-sm dark:bg-white/10 dark:border-white/20 dark:shadow-md transition-all"
                  onClick={toggleDarkMode}
                  aria-label="Toggle dark mode"
                >
                  {settings.darkmode ? (
                    <Sun className="w-6 h-6 text-yellow-500" loading="lazy" />
                  ) : (
                    <Moon className="w-6 h-6 text-gray-700" loading="lazy" />
                  )}
                </button>
                <Link
                  to="/"
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 border border-gray-300 shadow-sm dark:bg-white/10 dark:border-white/20 dark:shadow-md transition-all text-gray-800 dark:text-white"
                  aria-label="Dashboard"
                >
                  <LayoutDashboard className="w-6 h-6" />
                </Link>
                <Link
                  to="/setting"
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 border border-gray-300 shadow-sm dark:bg-white/10 dark:border-white/20 dark:shadow-md transition-all text-gray-800 dark:text-white"
                  aria-label="Settings"
                >
                  <Settings2 className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Layout;
