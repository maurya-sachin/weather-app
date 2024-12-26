// src/App.js
import { BrowserRouter as Router } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext";
import Layout from "./components/layout/Layout.jsx";

function App() {
  return (
    <Router>
      <SettingsProvider>
        <Layout />
      </SettingsProvider>
    </Router>
  );
}

export default App;
