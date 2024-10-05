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
      const response = await axios.post('http://localhost:5000/count-trees', {
        coordinates,
      });
      setTreeCount(response.data.tree_count_hectares);
    } catch (error) { 
      console.error('Error counting trees:', error);
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
          <h3>Tree Count in Selected Area: {treeCount} hectares</h3>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
