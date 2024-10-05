import React from 'react';
import MapComponent from './components/MapComponent';
import EnvironmentalImpactForm from './components/InputForm';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Tree Count & Environmental Impact App</h1>
      <div className="w-full max-w-7xl">
        <MapComponent />
      </div>
      <div className="w-full max-w-3xl mt-8">
        <EnvironmentalImpactForm />
      </div>
    </div>
  );
};

export default App;
