import React, { useState } from 'react';

const EnvironmentalImpactForm = () => {
  const [step, setStep] = useState(1);
  const [constructionType, setConstructionType] = useState('');
  const [formData, setFormData] = useState({
    floorsAbove: '',
    floorsBelow: '',
    baseDepth: '',
    fuelUsed: [],
    productType: [],
    treesCut: '',
    apartments: '',
    stores: '',
    vehicles: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step === 2 ? setConstructionType('') : step - 1);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox'
        ? checked ? [...formData[name], value] : formData[name].filter(item => item !== value)
        : value
    });
  };

  const handleConstructionType = (e) => {
    setConstructionType(e.target.value);
    setStep(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {step === 1 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Construction Type</h2>
          <select onChange={handleConstructionType} value={constructionType} className="w-full p-3 border rounded-lg">
            <option value="">Select</option>
            <option value="factory">Factory</option>
            <option value="flat">Flat</option>
            <option value="tenement">Tenement</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {constructionType.charAt(0).toUpperCase() + constructionType.slice(1)} Details
          </h2>
          {/* Form fields depending on constructionType */}
          {/* Back and Next buttons */}
        </div>
      )}
    </div>
  );
};

export default EnvironmentalImpactForm;
