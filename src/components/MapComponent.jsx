import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css'; // Leaflet Draw CSS
import leafletImage from 'leaflet-image'; // Import leaflet-image
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [treeCount, setTreeCount] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [points, setPoints] = useState([]);
  const mapInstance = useRef(null); // Store map instance reference
  const [mapReady, setMapReady] = useState(false); // Map readiness state

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

  const fetchWeatherData = async (latitude, longitude) => {
    const apiKey = '30f7fd6107dee07d20a062662a888268';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    
    try {
      const weatherResponse = await axios.get(weatherUrl);
      const airPollutionResponse = await axios.get(airPollutionUrl);
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

  const getAqiDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return 'Good';
      case 2:
        return 'Fair';
      case 3:
        return 'Moderate';
      case 4:
        return 'Poor';
      case 5:
        return 'Very Poor';
      default:
        return 'Unknown';
    }
  };

  const handleCreated = (e) => {
    const geoJsonData = e.layer.toGeoJSON();
    const coordinates = geoJsonData.geometry.coordinates[0];
    
    if (coordinates.length !== 5) {
      console.warn('Please draw a polygon with exactly four points.');
      return;
    }
    setPoints(coordinates);

    const [longitude, latitude] = coordinates[0];
    sendPolygonToBackend(coordinates);
    fetchWeatherData(latitude, longitude);
  };

  useEffect(() => {
    if (mapInstance.current) {
      let tileLoadCount = 0;
      let totalTiles = 0;

      // Listen for 'tileloadstart' to track total number of tiles to load
      mapInstance.current.on('tileloadstart', () => {
        totalTiles += 1;
      });

      // Listen for 'tileload' to track how many tiles have been loaded
      mapInstance.current.on('tileload', () => {
        tileLoadCount += 1;
        if (tileLoadCount === totalTiles) {
          setMapReady(true); // All tiles loaded
        }
      });
    }
  }, [mapInstance.current]);

  const captureMapArea = () => {
    if (!mapInstance.current || !mapReady) {
      console.warn('Map is not fully loaded or instance is not available.');
      return;
    }

    leafletImage(mapInstance.current, (err, canvas) => {
      if (err) {
        console.error('Error capturing map:', err);
        return;
      }
      
      const imgData = canvas.toDataURL('image/png');

      // Create a link to download the image
      const downloadLink = document.createElement('a');
      downloadLink.href = imgData;
      downloadLink.download = 'map-area-capture.png';
      downloadLink.click();
    });
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg p-6">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '500px', width: '100%' }}
        whenCreated={(map) => {
          mapInstance.current = map;
        }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com">Esri & NASA</a>'
            />
          </LayersControl.BaseLayer>
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
            draw={{
              rectangle: true,
              polygon: true,
              circle: false,
              marker: false,
              polyline: false,
              circlemarker: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>

      <button
        onClick={captureMapArea}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Capture Map Area
      </button>

      {treeCount !== null && (
        <div className="relative top-4 left-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg">
          <h3 className="text-xl">Tree Count: {parseInt(treeCount)} trees</h3>
        </div>
      )}

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
    </div>
  );
};

export default MapComponent;
