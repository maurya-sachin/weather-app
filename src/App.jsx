import "./App.css";
import Dashboard from "./components/dashboard/Dashboard.jsx";

function App() {
  return (
    <div className={`min-h-screen transition-colors duration-200`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-3xl font-bold text-blue-500">
            Weather Dashboard
          </h1>
        </div>
      </div>
      <Dashboard />
    </div>
  );
}

export default App;
