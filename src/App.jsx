// src/App.js
import { BrowserRouter as Router } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import Layout from "./components/layout/Layout.jsx";

function App() {
  return (
    <Router>
      <SettingsProvider>
        <AuthProvider>
          <Layout lang="en" />
        </AuthProvider>
      </SettingsProvider>
    </Router>
  );
}

export default App;
