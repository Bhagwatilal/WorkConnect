import React from 'react';

interface WorkPreferencesProps {
  formData: {
    experience: string;
    preferredWorkType: string;
    availability: string;
    education: string;
  };
  isEditing: boolean;
  onChange: (name: string, value: string) => void;
}

const WorkPreferences: React.FC<WorkPreferencesProps> = ({ formData, isEditing, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Experience
        </label>
        {isEditing ? (
          <input
            type="text"
            value={formData.experience}
            onChange={(e) => onChange('experience', e.target.value)}
            className="w-full p-2 border rounded"
          />
        ) : (
          <p className="text-gray-900">{formData.experience}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Work Type
        </label>
        {isEditing ? (
          <select
            value={formData.preferredWorkType}
            onChange={(e) => onChange('preferredWorkType', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="both">Both</option>
          </select>
        ) : (
          <p className="text-gray-900">{formData.preferredWorkType}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Availability
        </label>
        {isEditing ? (
          <input
            type="text"
            value={formData.availability}
            onChange={(e) => onChange('availability', e.target.value)}
            className="w-full p-2 border rounded"
          />
        ) : (
          <p className="text-gray-900">{formData.availability}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Education
        </label>
        {isEditing ? (
          <input
            type="text"
            value={formData.education}
            onChange={(e) => onChange('education', e.target.value)}
            className="w-full p-2 border rounded"
          />
        ) : (
          <p className="text-gray-900">{formData.education}</p>
        )}
      </div>
    </div>
  );
};

export default WorkPreferences;