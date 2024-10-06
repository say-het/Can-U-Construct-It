import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, FeatureGroup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css'; // Leaflet Draw CSS
import axios from 'axios';
import leafletImage from 'leaflet-image'; // Import leaflet-image
import BeforeConstruction from './BeforeConstruction';
import DuringConstruction from './DuringConstruction';
import AfterConstruction from './AfterConstruction';
import ConstructionCarousel from './Curosel';

const MapComponent = () => {
  const [treeCount, setTreeCount] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [points, setPoints] = useState([]);
  const mapInstance = useRef(null); // Store map instance reference

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
      // Fetch weather data
      const weatherResponse = await axios.get(weatherUrl);
      const airPollutionResponse = await axios.get(airPollutionUrl);

      // Prepare the data for the FloodReport request
      const floodData = {
        Latitude: latitude,
        Longitude: longitude,
        Rainfall: weatherResponse.data.rain ? weatherResponse.data.rain['1h'] || 0 : 0, // Example rainfall data
        Temperature: weatherResponse.data.main.temp,
        Humidity: weatherResponse.data.main.humidity,
        RiverDischarge: 300, // Replace with actual river discharge data
        WaterLevel: 10, // Replace with actual water level data
        Elevation: 500, // Replace with actual elevation data
        LandCover: "Urban", // Example land cover type
        SoilType: "Clay", // Example soil type
        PopulationDensity: 1000, // Example population density
        Infrastructure: "Developed", // Example infrastructure type
        HistoricalFloods: 2 // Example historical flood count
      };

      // Fetch earthquake data from the Flask server
      const earthquakeResponse = await fetch('http://localhost:5000/getQuackReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Latitude: latitude,
          Longitude: longitude,
        }),
      });

      if (!earthquakeResponse.ok) {
        throw new Error('Network response for earthquake data was not ok');
      }

      const earthquakeData = await earthquakeResponse.json();
      console.log(earthquakeData)

      // Fetch flood data from the Flask server
      const floodResponse = await fetch('http://localhost:5000/FloodReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(floodData),
      });

      if (!floodResponse.ok) {
        throw new Error('Network response for flood data was not ok');
      }

      const floodDataResponse = await floodResponse.json();
      console.log(floodDataResponse)
      // Set the weather, earthquake, and flood data in the state
      setWeatherData({
        temperature: weatherResponse.data.main.temp,
        humidity: weatherResponse.data.main.humidity,
        windSpeed: weatherResponse.data.wind.speed,
        windDeg: weatherResponse.data.wind.deg,
        aqi: airPollutionResponse.data.list[0].main.aqi,
        depth: earthquakeData.Depth,
        magnitude: earthquakeData.Magnitude,
        seismicActivity: earthquakeData.Seismic_Activity,
        floodPrediction: floodDataResponse['Flood Will Ocuur Or Not']
      });
    } catch (error) {
      console.error('Error fetching weather, earthquake, or flood data:', error);
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
    
    // Ensure a polygon with four points is drawn
    if (coordinates.length !== 5) {
      console.warn('Please draw a polygon with exactly four points.');
      return;
    }
    setPoints(coordinates);

    const [longitude, latitude] = coordinates[0];
    sendPolygonToBackend(coordinates);
    fetchWeatherData(latitude, longitude);
  };

  const captureMapArea = () => {
    const map = mapInstance.current; // Access the map instance
  
    // Check if the map instance is available
    if (!map) {
      console.error('Map instance is not available.');
      return;
    }
  
    leafletImage(map, (err, canvas) => {
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
      center={[23.0225, 72.5714]} // Ahmedabad's coordinates
      zoom={12}
      maxBounds={[[22.8, 72.3], [23.2, 72.8]]}
      maxBoundsViscosity={1.0}
      style={{ height: '500px', width: '100%' }}
      whenCreated={(map) => {
        mapInstance.current = map; // Store the map instance in ref
      }}
    >
        <LayersControl position="topright">
          {/* Map View is the default now */}
          <LayersControl.BaseLayer checked name="Map View">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>

          {/* Satellite view is available but not checked by default */}
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com">Esri & NASA</a>'
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
{/* 
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
      )} */}
{/* <div className="w-full max-w-7xl bg-white shadow-xl rounded-xl p-8 mb-12">
 
  
<ConstructionCarousel

weatherData={weatherData}/>
</div> */}
<BeforeConstruction
aqi={weatherData?.aqi}
humidity={weatherData?.humidity}
treeCount={treeCount}
temperature={weatherData?.temperature}
windSpeed={weatherData?.windSpeed}
soilType={"Clay"}
/>
    </div>
    
  );
};

export default MapComponent;