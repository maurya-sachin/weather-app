# Weather Dashboard 🌤️

A modern and responsive weather application built with React, Vite, and Tailwind CSS. This app leverages the OpenWeatherMap API to provide users with real-time weather updates, forecasts, air quality data, and more.

## Features ✨

- **Current Weather**: Displays current weather conditions, temperature, and location-specific details.
- **7-Day Forecast**: View the upcoming weather trends.
- **Temperature Chart**: Interactive graphical representation of temperature trends.
- **Air Quality Data**: Provides information about air quality and pollution levels.
- **Sunrise & Sunset Times**: Displays accurate sunrise and sunset times for any location.
- **Search with Autosuggest**: Smart city search with suggestions.
- **Weather Maps**: Integrates geolocation-based weather maps.
- **Dark Mode**: Toggle between light and dark themes.
- **Unit Conversion**: Switch between Celsius and Fahrenheit for temperature readings.
- **Save Favorite Cities**: Save and manage frequently viewed locations.
- **Settings Panel**: Customize app preferences, including units and themes.

---

## Tech Stack 🛠️

- **Frontend**: React, Vite, Tailwind CSS
- **Icons**: Lucide React
- **API**: OpenWeatherMap API
- **State Management**: React Context API
- **Utilities**: Lodash for debouncing

---

## Installation 🚀

Follow these steps to set up the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install Dependencies**:
   Make sure you have Node.js installed, then run:

   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the project root and add your OpenWeatherMap API key:

   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Run the Development Server**:
   Start the development server to view the app in your browser:

   ```bash
   npm run dev
   ```

5. **Build for Production**:
   Create an optimized production build:

   ```bash
   npm run build
   ```

6. **Preview Production Build**:
   Test the production build locally:
   ```bash
   npm run preview
   ```

---

## File Structure 🗂️

```
src/
├── assets/               # Static assets like images/icons
├── components/           # Reusable React components
│   ├── AirQuality.jsx
│   ├── CurrentWeather.jsx
│   ├── SearchBar.jsx
│   ├── SavedCities.jsx
│   ├── SunTimes.jsx
│   ├── TemperatureChart.jsx
│   └── WeatherDetails.jsx
├── context/              # Context API for global state management
│   └── SettingsContext.jsx
├── utils/                # Helper functions and API handlers
│   ├── api.js
│   └── helpers.js
└── App.jsx               # Main app component
```

---

## License 📜

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments 🙌

- [OpenWeatherMap API](https://openweathermap.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
