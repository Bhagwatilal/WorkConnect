import React from 'react';

interface ContactInfoProps {
  formData: {
    address: string;
    phone: string;
    languages: string[];
  };
  isEditing: boolean;
  onChange: (name: string, value: any) => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ formData, isEditing, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        {isEditing ? (
          <input
            type="text"
            value={formData.address}
            onChange={(e) => onChange('address', e.target.value)}
            className="w-full p-2 border rounded"
          />
        ) : (
          <p className="text-gray-900">{formData.address}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        {isEditing ? (
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="w-full p-2 border rounded"
          />
        ) : (
          <p className="text-gray-900">{formData.phone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Languages
        </label>
        {isEditing ? (
          <input
            type="text"
            value={formData.languages.join(', ')}
            onChange={(e) => onChange('languages', e.target.value.split(',').map(lang => lang.trim()))}
            className="w-full p-2 border rounded"
            placeholder="Enter languages separated by commas"
          />
        ) : (
          <p className="text-gray-900">{formData.languages.join(', ')}</p>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;