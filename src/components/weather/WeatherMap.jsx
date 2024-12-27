import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WeatherMap = () => {
  //   const position = [weatherData.coord.lat, weatherData.coord.lon];

  return (
    // <MapContainer
    //   center={position}
    //   zoom={10}
    //   style={{ height: "400px", width: "100%" }}
    // >
    //   <TileLayer
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //   />
    //   <Marker position={position}>
    //     <Popup>
    //       <div>
    //         <h2>{city}</h2>
    //         <p>{weatherData.weather[0].description}</p>
    //         <p>
    //           Temperature: {weatherData.main.temp}°{weatherData.unit}
    //         </p>
    //       </div>
    //     </Popup>
    //   </Marker>
    // </MapContainer>
    <></>
  );
};

export default WeatherMap;
