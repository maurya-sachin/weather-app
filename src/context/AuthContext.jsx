import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase"; // Assuming you're using Supabase for authentication
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useSettings } from "./SettingsContext"; // Import useSettings to clear settings on logout

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const { updateSettings } = useSettings(); // Get updateSettings to clear settings on logout

  useEffect(() => {
    const getSessionAndSetUser = async () => {
      // Created an async function for easier use of async methods
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.log("Error getting session", error);
        return; // exit function on error
      }
      if (session?.user) {
        // Check for session and user being defined
        setUser(session.user);
        setDisplayName(session.user?.user_metadata?.full_name || ""); //Use optional chaining
      }
    };
    getSessionAndSetUser();
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setDisplayName(session?.user?.user_metadata?.full_name || ""); //Use optional chaining
    });
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data.user) {
      setUser(data.user);
      setDisplayName(data.user?.user_metadata?.full_name || ""); //Use optional chaining
    } else {
      console.error(error.message);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDisplayName("");
    updateSettings({
      darkmode: false,
      unit: "C",
      savedcities: [],
      id: null,
    }); // Clear settings on logout
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, displayName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
