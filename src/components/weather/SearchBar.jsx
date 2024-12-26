// src/components/weather/SearchBar.jsx
import { MapPin } from "lucide-react";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch, searchResults, onCitySelect }) => {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder="Search for a city..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-gray-900 dark:text-white placeholder-gray-500"
      />
      {searchResults.length > 0 && (
        <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg z-10">
          {searchResults.map((result) => (
            <div
              key={`${result.name}-${result.country}`}
              onClick={() => onCitySelect(result.name)}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {result.name}, {result.country}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Prop validation using PropTypes
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired, // City name
      country: PropTypes.string.isRequired, // Country name
    })
  ).isRequired,
  onCitySelect: PropTypes.func.isRequired, // Function to handle city selection
};

export default SearchBar;
