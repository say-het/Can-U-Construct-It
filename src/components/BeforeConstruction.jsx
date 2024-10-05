import React from 'react';
import { FaWind, FaCloudSun, FaTree, FaTemperatureHigh, FaTint, FaWater } from 'react-icons/fa';

const BeforeConstruction = () => {
  return (
    <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl p-6 mb-8 h-[350px] overflow-hidden">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Before Construction</h2>
      
      <div className="flex flex-wrap justify-between items-center h-full">
        {/* AQI */}
        <div className="bg-gray-100 p-3 rounded-lg shadow-md flex items-center mb-4 w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
          <FaWater className="text-blue-600 text-2xl mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Air Quality Index (AQI)</h3>
            <p className="text-gray-600">50 (Good)</p>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-gray-100 p-3 rounded-lg shadow-md flex items-center mb-4 w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
          <FaCloudSun className="text-blue-600 text-2xl mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Humidity</h3>
            <p className="text-gray-600">60%</p>
          </div>
        </div>

        {/* Number of Trees */}
        <div className="bg-gray-100 p-3 rounded-lg shadow-md flex items-center mb-4 w-1/2 lg:w-1/3 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
          <FaTree className="text-blue-600 text-2xl mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Number of Trees</h3>
            <p className="text-gray-600">150</p>
          </div>
        </div>

        {/* Temperature */}
        <div className="bg-gray-100 p-3 rounded-lg shadow-md flex items-center mb-4 w-1/2 lg:w-1/3 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
          <FaTemperatureHigh className="text-blue-600 text-2xl mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Temperature</h3>
            <p className="text-gray-600">25°C</p>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="bg-gray-100 p-3 rounded-lg shadow-md flex items-center mb-4 w-1/2 lg:w-1/3 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
          <FaWind className="text-blue-600 text-2xl mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Wind Speed</h3>
            <p className="text-gray-600">10 km/h</p>
          </div>
        </div>

        {/* Soil Type */}
        <div className="bg-gray-100 p-3 rounded-lg shadow-md flex items-center mb-4 w-1/3 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
          <FaTint className="text-blue-600 text-2xl mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Soil Type</h3>
            <p className="text-gray-600">Loamy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeConstruction;
