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
        aria-label="Search for a city"
        className="w-full p-5 rounded-xl 
  bg-gradient-to-br from-blue-50/90 to-white/90 
  dark:from-gray-900/90 dark:to-gray-800/90
  border border-white/20 dark:border-gray-700/30
  backdrop-blur-lg"
      />
      {searchResults.length > 0 && (
        <div
          className="absolute w-full mt-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg z-10"
          role="listbox"
        >
          {searchResults.map((result) => (
            <div
              key={`${result.name}-${result.country}-${result.coord.lat}-${result.coord.lon}`}
              onClick={() => onCitySelect(result.name)}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              role="option"
              aria-selected="false"
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
