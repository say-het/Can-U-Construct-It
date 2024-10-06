import React, { useState, useEffect } from 'react';
import AfterConstruction from './AfterConstruction';
const FactoryForm = () => {
  const [formData, setFormData] = useState({
    floorsAbove: '',
    floorsBelow: '',
    baseDepth: '',
    fuelUsed: [],
    productType: [],
    quantityProcessed: '',
  });

  const [environmentalImpact, setEnvironmentalImpact] = useState({
    materialUsage: {},
    overallImpact: '',
    pm10Emission: 0,
    foundationVolume: 0,
    fuelEmissions: {},
    totalEmissions: 0, // Store total emissions
    emissionsWeight: 0, // Store emissions weight from product type
    impactCategory: '',  // Store impact category
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
          ? [...formData[name], value]
          : formData[name].filter((item) => item !== value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Function to calculate emissions based on the provided formula
  const calculateEmissions = (Q, FC, EF = 3.67) => {
    return Q * FC * EF;
  };

  const calculateEmissionsWeight = (Q, EF, industryType) => {
    const W = Q * EF;
    let impactCategory = '';

    if (industryType.toLowerCase() === "textile") {
      impactCategory = "Water pollution, solid waste from scraps";
    } else if (industryType.toLowerCase() === "electronics") {
      impactCategory = "E-waste, toxic chemicals";
    } else if (industryType.toLowerCase() === "automobile") {
      impactCategory = "Air pollution, solid waste from manufacturing";
    } else if (industryType.toLowerCase() === "chemical") {
      impactCategory = "Hazardous waste, air emissions (VOCs, particulates)";
    } else if (industryType.toLowerCase() === "food") {
      impactCategory = "Organic waste, high water use";
    } else {
      impactCategory = "Unknown industry type";
    }

    return { W, impactCategory };
  };

  const calculateEnvironmentalImpact = (numFloors) => {
    const materials = {
      Concrete: { quantity_per_floor: 200, waste_percentage: 0.1, impact: 'High' },
      Steel: { quantity_per_floor: 30000, waste_percentage: 0.05, impact: 'Moderate to High' },
      Wood: { quantity_per_floor: 15000, waste_percentage: 0.08, impact: 'Low/High' },
      Brick: { quantity_per_floor: 10000, waste_percentage: 0.07, impact: 'Moderate' },
      Glass: { quantity_per_floor: 5000, waste_percentage: 0.15, impact: 'Moderate' },
    };

    const totalWaste = {};
    const totalEnvironmentalImpact = [];

    for (const material in materials) {
      const data = materials[material];
      const totalQuantity = data.quantity_per_floor * numFloors;
      const wasteGenerated = totalQuantity * data.waste_percentage;
      totalWaste[material] = wasteGenerated;
      totalEnvironmentalImpact.push(data.impact);
    }

    const uniqueImpacts = new Set(totalEnvironmentalImpact);
    const overallImpact = uniqueImpacts.has('High')
      ? 'High'
      : uniqueImpacts.has('Moderate')
      ? 'Moderate'
      : 'Low';

    return { totalWaste, overallImpact };
  };

  const calculatePM10Emission = (depth, area, emissionFactor) => {
    return depth * area * emissionFactor;
  };

  const calculateFoundationVolume = (magnitude, area) => {
    const depth =
      magnitude < 5 ? 1 : magnitude < 6 ? 2 : magnitude < 7 ? 3 : magnitude < 8 ? 4 : 5;
    return area * depth;
  };

  const calculateFuelEmissions = (fuelUsed) => {
    const fuelEmissionFactors = {
      Coal: 746,
      Oil: 850,
      'Gasoline/Petroleum': 850,
      'Natural Gas': 750,
      Wood: 500,
      Diesel: 860,
      Propane: 820,
      Kerosene: 860,
      Charcoal: 710,
    };

    const fuelEmissions = {};
    let totalEmissions = 0;

    fuelUsed.forEach((fuel) => {
      const FC = fuelEmissionFactors[fuel] || 0;
      const Q = 10; // Assuming 10 tons of fuel consumed for calculation
      const emissions = calculateEmissions(Q, FC);
      fuelEmissions[fuel] = emissions;
      totalEmissions += emissions; // Summing up total emissions
    });

    return { fuelEmissions, totalEmissions };
  };

  const handleCalculate = () => {
    const { floorsAbove, floorsBelow, baseDepth, fuelUsed, productType, quantityProcessed } = formData;

    // Environmental impact calculation
    const impactData = calculateEnvironmentalImpact(floorsAbove);

    // PM10 emission calculation
    const pm10Emission = calculatePM10Emission(baseDepth, floorsAbove * 100, 0.01); // Example values

    // Foundation volume calculation based on seismic magnitude
    const foundationVolume = calculateFoundationVolume(6.5, floorsAbove * 100); // Example magnitude and area

    // Fuel emissions calculation
    const { fuelEmissions, totalEmissions } = calculateFuelEmissions(fuelUsed);

    // Emissions weight calculation for each selected product type
    const emissionFactor = 0.5; // Example emission factor for demonstration
    let totalWeight = 0;
    let impactCategory = '';

    productType.forEach(type => {
      const { W, impactCategory: cat } = calculateEmissionsWeight(quantityProcessed, emissionFactor, type);
      totalWeight += W;
      impactCategory = cat; // Overwriting impactCategory to the last one
    });

    setEnvironmentalImpact({
      materialUsage: impactData.totalWaste,
      overallImpact: impactData.overallImpact,
      pm10Emission,
      foundationVolume,
      fuelEmissions,
      totalEmissions, // Setting total emissions
      emissionsWeight: totalWeight, // Setting total emissions weight from product type
      impactCategory, // Setting impact category
    });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Factory Environmental Impact Assessment</h2>
      <form>
        <label className="block mb-2">
          Floors Above Ground:
          <input
            type="number"
            name="floorsAbove"
            value={formData.floorsAbove}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </label>
        <label className="block mb-2">
          Floors Below Ground:
          <input
            type="number"
            name="floorsBelow"
            value={formData.floorsBelow}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </label>
        <label className="block mb-2">
          Base Depth (in meters):
          <input
            type="number"
            name="baseDepth"
            value={formData.baseDepth}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </label>
        <label className="block mb-2">Fuel Used:</label>
        <div className="flex flex-wrap gap-4 mb-4">
          {['Coal', 'Oil', 'Gasoline/Petroleum', 'Natural Gas', 'Wood', 'Diesel', 'Propane', 'Kerosene', 'Charcoal'].map((fuel) => (
            <label key={fuel}>
              <input
                type="checkbox"
                name="fuelUsed"
                value={fuel}
                onChange={handleInputChange}
                className="mr-2"
              />
              {fuel}
            </label>
          ))}
        </div>
        <label className="block mb-2">Product Type:</label>
        <div className="flex flex-wrap gap-4 mb-4">
          {['Textile', 'Electronics', 'Automobile', 'Chemical', 'Food'].map((type) => (
            <label key={type}>
              <input
                type="checkbox"
                name="productType"
                value={type}
                onChange={handleInputChange}
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>
        <label className="block mb-2">
          Quantity Processed (in kg):
          <input
            type="number"
            name="quantityProcessed"
            value={formData.quantityProcessed}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </label>
        <button
          type="button"
          onClick={handleCalculate}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Calculate Impact
        </button>
      </form>

      {'' && (
        <div className="mt-6">
          <h3 className="text-xl font-bold">Impact Results</h3>
          <p>Total Emissions from Fuel: {environmentalImpact.totalEmissions} kg CO₂</p>
          <p>Fuel Emissions Breakdown:</p>
          <ul>
            {Object.entries(environmentalImpact.fuelEmissions).map(([fuel, emission]) => (
              <li key={fuel}>
                {fuel}: {emission} kg CO₂
              </li>
            ))}
          </ul>
          <p>Material Waste:</p>
          <ul>
            {Object.entries(environmentalImpact.materialUsage).map(([material, waste]) => (
              <li key={material}>
                {material}: {waste} kg
              </li>
            ))}
          </ul>
          <p>Overall Environmental Impact: {environmentalImpact.overallImpact}</p>
          <p>PM10 Emission: {environmentalImpact.pm10Emission} g</p>
          <p>Foundation Volume: {environmentalImpact.foundationVolume} m³</p>
          <p>Product Emissions Weight: {environmentalImpact.emissionsWeight} kg</p>
          <p>Impact Category: {environmentalImpact.impactCategory}</p>
        </div>
      )}
      <AfterConstruction factoryData={environmentalImpact}/>
    </div>
  );
};

export default FactoryForm;
