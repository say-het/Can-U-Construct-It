import React from 'react';
import { FaWind, FaCloudSun, FaTree, FaTemperatureHigh, FaTint, FaWater } from 'react-icons/fa';

const BeforeConstruction = ({ aqi, humidity, treeCount, temperature, windSpeed, soilType }) => {
  // Function to interpret AQI level
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

  return (
    <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl p-10 mb-8 h-[450px] overflow-hidden transition duration-300 ease-in-out transform hover:scale-[1.02]">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center"></h2>
      
      <div className="flex flex-wrap justify-between items-center h-full">
        {/* AQI */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center mb-4 w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
          <FaWater className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Air Quality Index (AQI)</h3>
            <p className="text-gray-600">{aqi ? `${aqi} (${getAqiDescription(aqi)})` : 'Loading...'}</p>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center mb-4 w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
          <FaCloudSun className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Humidity</h3>
            <p className="text-gray-600">{humidity != null ? `${humidity}%` : 'Loading...'}</p>
          </div>
        </div>

        {/* Number of Trees */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center mb-4 w-1/2 lg:w-1/3 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
          <FaTree className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Number of Trees</h3>
            <p className="text-gray-600">{treeCount !== null ? treeCount : 'Loading...'}</p>
          </div>
        </div>

        {/* Temperature */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center mb-4 w-1/2 lg:w-1/3 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
          <FaTemperatureHigh className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Temperature</h3>
            <p className="text-gray-600">{temperature != null ? `${temperature}°C` : 'Loading...'}</p>

          </div>
        </div>

        {/* Wind Speed */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center mb-4 w-1/2 lg:w-1/3 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
          <FaWind className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Wind Speed</h3>
            <p className="text-gray-600">{windSpeed != null ? `${windSpeed} km/h` : 'Loading...'}</p>
          </div>
        </div>

        {/* Soil Type */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center mb-4 w-1/3 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
          <FaTint className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Soil Type</h3>
            <p className="text-gray-600">{soilType ? soilType : 'Loading...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeConstruction;