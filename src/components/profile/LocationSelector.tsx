import React, { useState } from 'react';

interface Location {
  city: string;
  areas: string[];
}

const LOCATIONS: Location[] = [
  {
    city: 'Pune',
    areas: ['Karve Nagar', 'Kothrud', 'Deccan', 'Shivaji Nagar', 'Hinjewadi']
  },
  {
    city: 'Mumbai',
    areas: ['Andheri', 'Bandra', 'Colaba', 'Dadar', 'Worli']
  },
  {
    city: 'Bangalore',
    areas: ['Whitefield', 'Koramangala', 'Indiranagar', 'HSR Layout', 'Electronic City']
  }
];

interface LocationSelectorProps {
  selectedCity: string;
  selectedArea: string;
  onChange: (city: string, area: string) => void;
  isEditing: boolean;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedCity,
  selectedArea,
  onChange,
  isEditing
}) => {
  const [city, setCity] = useState(selectedCity);
  const areas = LOCATIONS.find(loc => loc.city === city)?.areas || [];

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    onChange(newCity, '');
  };

  if (!isEditing) {
    return (
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">Location</p>
        <p className="text-gray-900">{selectedCity} {selectedArea && `- ${selectedArea}`}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City
        </label>
        <select
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select City</option>
          {LOCATIONS.map(loc => (
            <option key={loc.city} value={loc.city}>{loc.city}</option>
          ))}
        </select>
      </div>

      {city && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area
          </label>
          <select
            value={selectedArea}
            onChange={(e) => onChange(city, e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Area</option>
            {areas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;