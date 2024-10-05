import axios from 'axios';
import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

const MapComponent = () => {
  const [treeCount, setTreeCount] = useState(null);

  // Function to send polygon to the backend
  const sendPolygonToBackend = async (coordinates) => {
    try {
      const response = await fetch('http://localhost:5000/count-trees', {
        method: 'POST', // Use POST request
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify({ coordinates }), // Send the polygon coordinates in the request body
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data) // Parse the JSON from the response
      setTreeCount(data.estimated_tree_count); // Set the tree count from the response
    } catch (error) {
      console.error('Error counting trees:', error); // Log any errors
    }
  };
  

  const handleCreated = (e) => {
    const layer = e.layer;
    const geoJsonData = layer.toGeoJSON();
    const coordinates = geoJsonData.geometry.coordinates;

    // Send coordinates to the backend
    sendPolygonToBackend(coordinates);
  };

  return (
    <div>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com">Esri & NASA</a>'
        />

        {/* Drawing Tools */}
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleCreated}
            draw={{
              rectangle: true,
              polygon: true,
            }}
          />
        </FeatureGroup>
      </MapContainer>

      {/* Display the Tree Count */}
      {treeCount !== null && (
        <div>
          <h3>Tree Count in Selected Area:  {parseInt(treeCount)}  trees</h3>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
