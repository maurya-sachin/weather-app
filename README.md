# WeatherAffair: A Modern Weather Application

## Overview

**WeatherAffair** is a modern weather application built with React, Vite, and Tailwind CSS. It provides users with accurate, real-time weather data, intuitive visualizations, and essential information like air quality, sunrise/sunset timings, and more. This project showcases my expertise in creating responsive, high-performance web applications with clean, accessible, and user-friendly designs.

You can view the live version of the app here: [WeatherAffair](https://weatheraffair.vercel.app/)

## Key Features

- **Real-time Weather Data**:  
  Displays temperature, feels-like temperature, wind speed, humidity, pressure, and UV index.
- **7-Day Weather Forecast**:  
  Offers a detailed forecast for the next seven days.
- **Interactive Temperature Charts**:  
  Visualizes temperature trends over time.
- **Air Quality Data**:  
  Includes detailed air quality information where available.
- **Sunrise & Sunset Times**:  
  Provides accurate daily timings for sunrise and sunset.
- **City Search with Auto-Suggestions**:  
  Allows users to quickly search for and view weather data for any location.
- **Weather Maps**:  
  Powered by Leaflet.js for an interactive view of weather patterns.
- **Customizable Settings**:  
  - Light and dark mode support for better readability.  
  - Temperature display in Celsius or Fahrenheit.  
  - Option to save favorite cities for quick access.
- **PWA Features**:  
  - Installable as a Progressive Web App for offline use.  
  - Service workers enhance performance and caching capabilities.

## Technologies Used

- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Mapping**: Leaflet.js
- **Icons**: Lucide React
- **Utilities**: Lodash, date-fns
- **API**: OpenWeatherMap for fetching real-time weather and forecast data

## Project Structure

```
weather-affair/
├── src/
│   ├── assets/        # Static assets like images/icons
│   ├── components/    # Reusable React components
│   │   ├── AirQuality.jsx
│   │   ├── CurrentWeather.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SavedCities.jsx
│   │   ├── SunTimes.jsx
│   │   ├── TemperatureChart.jsx
│   │   └── WeatherDetails.jsx
│   ├── context/       # Context API for global state management
│   │   └── SettingsContext.jsx
│   ├── utils/         # Helper functions and API handlers
│   │   ├── api.js
│   │   └── helpers.js
│   └── App.jsx        # Main app component
├── public/
│   └── index.html
├── .env
├── package.json
├── tailwind.config.js
├── vite.config.js
├── README.md
└── ... (other files)
```

## Installation & Usage

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/maurya-sachin/weather-app.git
   cd weather-app
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file**:  
   Add your OpenWeatherMap API key in a `.env` file at the root of the project:

   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Run the Application in Development Mode:**

   ```bash
   npm run dev
   ```

5. **Build for Production:**

   ```bash
   npm run build
   ```

6. **Preview the Production Build**:

   ```bash
   npm run preview
   ```

## Contributing

Contributions are welcome! If you'd like to improve this project, feel free to submit a pull request or open an issue.

## Acknowledgments

- [OpenWeatherMap API](https://openweathermap.org/) for providing weather data.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
- [Lucide React](https://lucide.dev/) for icons.
- [Leaflet.js](https://leafletjs.com/) for interactive mapping.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

**WeatherAffair** – Your reliable companion for weather insights and forecasts.
