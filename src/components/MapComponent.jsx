import React, { useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css'; // Leaflet Draw CSS
import axios from 'axios';

const MapComponent = () => {
  const [treeCount, setTreeCount] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [soilType, setSoilType] = useState(null);

  // Function to fetch tree count from backend
  const sendPolygonToBackend = async (coordinates) => {
    try {
      const response = await fetch('http://localhost:5000/count-trees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coordinates }),
      });
      const data = await response.json();
      setTreeCount(data.estimated_tree_count);
    } catch (error) {
      console.error('Error counting trees:', error);
    }
  };

  // Function to fetch weather and AQI data from OpenWeatherMap API
  const fetchWeatherData = async (latitude, longitude) => {
    const apiKey = '30f7fd6107dee07d20a062662a888268';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
      // Fetch weather data
      const weatherResponse = await axios.get(weatherUrl);
      // Fetch AQI data
      const airPollutionResponse = await axios.get(airPollutionUrl);
        console.log(weatherData)
        console.log(airPollutionResponse)
      setWeatherData({
        temperature: weatherResponse.data.main.temp,
        humidity: weatherResponse.data.main.humidity,
        windSpeed: weatherResponse.data.wind.speed,
        windDeg: weatherResponse.data.wind.deg,
        aqi: airPollutionResponse.data.list[0].main.aqi,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Function to fetch soil type from SoilGrids API
  // const fetchSoilType = async (latitude, longitude) => {
  //   // SoilGrids provides data at different depths and properties
  //   // For simplicity, we'll fetch the Soil Organic Carbon (SOC) top 5cm
  //   const soilGridsUrl = `https://rest.soilgrids.org/query?lat=${latitude}&lon=${longitude}&attributes=ocs,clay,sand,silt`;

  //   try {
  //     const response = await axios.get(soilGridsUrl);
  //     const soilData = response.data;

  //     if (soilData && soilData.layers && soilData.layers.length > 0) {
  //       // Example: Extract Organic Carbon Content (OCS)
  //       const ocs = soilData.layers.find(layer => layer.property === 'ocs');
  //       const clay = soilData.layers.find(layer => layer.property === 'clay');
  //       const sand = soilData.layers.find(layer => layer.property === 'sand');
  //       const silt = soilData.layers.find(layer => layer.property === 'silt');

  //       setSoilType({
  //         organicCarbon: ocs ? ocs.value : 'N/A',
  //         clay: clay ? clay.value : 'N/A',
  //         sand: sand ? sand.value : 'N/A',
  //         silt: silt ? silt.value : 'N/A',
  //       });
  //     } else {
  //       setSoilType({ message: 'No soil data available' });
  //     }
  //   } catch (error) {
  //     console.error('Error fetching soil data:', error);
    // }
    const getAqiDescription = (aqi) => {
  switch (aqi) {
    case 1: return 'Good';
    case 2: return 'Fair';
    case 3: return 'Moderate';
    case 4: return 'Poor';
    case 5: return 'Very Poor';
    default: return 'Unknown';
  }}


  // };

  // When a polygon is created, extract coordinates, fetch tree count, weather data, and soil type
  const handleCreated = (e) => {
    const geoJsonData = e.layer.toGeoJSON();
    const coordinates = geoJsonData.geometry.coordinates[0]; // Get polygon coordinates
    const [longitude, latitude] = coordinates[0]; // Get first point of polygon

    // Fetch tree count
    sendPolygonToBackend(coordinates);
    // Fetch weather and AQI data
    fetchWeatherData(latitude, longitude);
    // Fetch soil type data
    fetchSoilType(latitude, longitude);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg p-6">
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
        <LayersControl position="topright">
          {/* Satellite View Layer */}
          <LayersControl.BaseLayer checked name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com">Esri & NASA</a>'
            />
          </LayersControl.BaseLayer>

          {/* Map View Layer */}
          <LayersControl.BaseLayer name="Map View">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleCreated}
            draw={{ rectangle: true, polygon: true, circle: false, marker: false, polyline: false, circlemarker: false }}
          />
        </FeatureGroup>
      </MapContainer>

      {/* Tree Count Display */}
      {treeCount !== null && (
        <div className="relative top-4 left-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg">
          <h3 className="text-xl">Tree Count: {parseInt(treeCount)} trees</h3>
        </div>
      )}

      {/* Weather Data Display */}
  {weatherData && (
  <div className="relative top-4 left-4 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg">
    <h3 className="text-xl">Weather Details</h3>
    <p>Temperature: {weatherData.temperature} °C</p>
    <p>Humidity: {weatherData.humidity} %</p>
    <p>Wind Speed: {weatherData.windSpeed} m/s</p>
    <p>Wind Direction: {weatherData.windDeg}°</p>
    <p>AQI: {getAqiDescription(weatherData.aqi)}</p>
  </div>
)}



      {/* Soil Type Display */}
      {soilType && (
        <div className="relative top-4 left-4 bg-brown-600 text-white py-2 px-4 rounded-lg shadow-lg mt-4">
          <h3 className="text-xl">Soil Details</h3>
          {soilType.message ? (
            <p>{soilType.message}</p>
          ) : (
            <>
              <p>Organic Carbon (OCS): {soilType.organicCarbon}</p>
              <p>Clay: {soilType.clay} %</p>
              <p>Sand: {soilType.sand} %</p>
              <p>Silt: {soilType.silt} %</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MapComponent;
