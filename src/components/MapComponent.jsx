import React, { useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css'; // Leaflet Draw CSS

const MapComponent = () => {
  const [treeCount, setTreeCount] = useState(null);

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

  const handleCreated = (e) => {
    const geoJsonData = e.layer.toGeoJSON();
    sendPolygonToBackend(geoJsonData.geometry.coordinates);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg p-6">
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com">Esri & NASA</a>'
        />
        <FeatureGroup>
          <EditControl position="topright" onCreated={handleCreated} draw={{ rectangle: true, polygon: true }} />
        </FeatureGroup>
      </MapContainer>

      {treeCount !== null && (
        <div className="relative top-4 left-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg">
          <h3 className="text-xl">Tree Count: {parseInt(treeCount)} trees</h3>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
