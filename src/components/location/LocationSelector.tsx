import React, { useState, useEffect } from 'react';
import { PUNE_LOCATIONS } from '../../constants/locations';
import { useLocationStore } from '../../store/locationStore';

interface LocationSelectorProps {
  isEditing: boolean;
  onChange?: (area: string, subArea: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ isEditing, onChange }) => {
  const { selectedArea, selectedSubArea, setLocation } = useLocationStore();
  const [currentArea, setCurrentArea] = useState(selectedArea);
  const [currentSubArea, setCurrentSubArea] = useState(selectedSubArea);

  const areas = Object.keys(PUNE_LOCATIONS);
  const subAreas = currentArea ? PUNE_LOCATIONS[currentArea as keyof typeof PUNE_LOCATIONS] : [];

  const handleAreaChange = (area: string) => {
    setCurrentArea(area);
    setCurrentSubArea('');
  };

  const handleSubAreaChange = (subArea: string) => {
    setCurrentSubArea(subArea);
    if (onChange) {
      onChange(currentArea, subArea);
    }
    setLocation(currentArea, subArea);
  };

  if (!isEditing) {
    return (
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">Location</p>
        <p className="text-gray-900">
          {selectedArea} {selectedSubArea && `→ ${selectedSubArea}`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Area
        </label>
        <select
          value={currentArea}
          onChange={(e) => handleAreaChange(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Area</option>
          {areas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>

      {currentArea && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sub Area
          </label>
          <select
            value={currentSubArea}
            onChange={(e) => handleSubAreaChange(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Sub Area</option>
            {subAreas.map(subArea => (
              <option key={subArea} value={subArea}>{subArea}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;