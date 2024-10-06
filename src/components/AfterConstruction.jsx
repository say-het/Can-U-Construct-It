import React from 'react';
import { FaCloudSun, FaWind, FaTemperatureHigh, FaTint, FaSmog, FaTree, FaRecycle } from 'react-icons/fa';

const AfterConstruction = ({ aqiAfter, pm10, pm25, temperature, humidity, windSpeed, treeCount, envEffects }) => {
  // Function to interpret AQI level
  const getAqiDescription = (aqi) => {
    const descriptions = {
      1: 'Good',
      2: 'Fair',
      3: 'Moderate',
      4: 'Poor',
      5: 'Very Poor',
    };
    return descriptions[aqi] || 'Unknown';
  };

  return (
    <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl p-10 mb-8 h-[450px] overflow-hidden transition duration-300 ease-in-out">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">After Construction</h2>

      <div className="flex flex-wrap justify-between items-start h-full">
        {/* AQI After Construction */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center mb-6 w-full sm:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaSmog className="text-red-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">AQI After Construction</h3>
            <p className="text-gray-600">{aqiAfter ? `${aqiAfter} (${getAqiDescription(aqiAfter)})` : 'Loading...'}</p>
          </div>
        </div>

        {/* PM10 Level */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center mb-6 w-full sm:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaCloudSun className="text-yellow-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">PM10 Level</h3>
            <p className="text-gray-600">{pm10 ? `${pm10} µg/m³` : 'Loading...'}</p>
          </div>
        </div>

        {/* PM2.5 Level */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center mb-6 w-full sm:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaCloudSun className="text-yellow-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">PM2.5 Level</h3>
            <p className="text-gray-600">{pm25 ? `${pm25} µg/m³` : 'Loading...'}</p>
          </div>
        </div>

        {/* Temperature */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center mb-6 w-full sm:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaTemperatureHigh className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Temperature</h3>
            <p className="text-gray-600">{temperature != null ? `${temperature}°C` : 'Loading...'}</p>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center mb-6 w-full sm:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaTint className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Humidity</h3>
            <p className="text-gray-600">{humidity != null ? `${humidity}%` : 'Loading...'}</p>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center mb-6 w-full sm:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaWind className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Wind Speed</h3>
            <p className="text-gray-600">{windSpeed ? `${windSpeed} km/h` : 'Loading...'}</p>
          </div>
        </div>

        {/* Tree Count */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center mb-6 w-full sm:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaTree className="text-green-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Tree Count</h3>
            <p className="text-gray-600">{treeCount != null ? treeCount : 'Loading...'}</p>
          </div>
        </div>

        {/* Environmental Effects */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center mb-6 w-full sm:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaRecycle className="text-green-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Environmental Effects</h3>
            <p className="text-gray-600">{envEffects ? envEffects : 'Loading...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterConstruction;
