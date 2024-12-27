import PropTypes from "prop-types";

// src/components/weather/SavedCities.jsx
const SavedCities = ({ savedCities, onCitySelect, onCityDelete }) => {
  return (
    <div className="md:col-span-2 lg:col-span-1 p-6 rounded-xl bg-gray-200 backdrop-blur-md border border-white/20 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 order-2">
      <h3 className="text-xl font-bold mb-4">Saved Cities</h3>
      <div className="space-y-2">
        {savedCities.map((savedCity) => (
          <div
            key={savedCity}
            className="flex items-center justify-between p-2 hover:bg-white/20 rounded"
          >
            <span
              className="cursor-pointer"
              onClick={() => onCitySelect(savedCity)}
            >
              {savedCity}
            </span>
            <button
              onClick={() => onCityDelete(savedCity)}
              className="text-red-500 hover:text-red-600"
              aria-label={`Delete ${savedCity}`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

SavedCities.propTypes = {
  savedCities: PropTypes.array.isRequired,
  onCitySelect: PropTypes.func.isRequired,
  onCityDelete: PropTypes.func.isRequired,
};
export default SavedCities;
