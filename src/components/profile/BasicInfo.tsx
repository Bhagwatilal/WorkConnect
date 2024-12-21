import React from 'react';
import { User } from '../../types';

interface BasicInfoProps {
  user: User | null;
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  isEditing: boolean;
  onChange: (name: string, value: string) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ user, formData, isEditing, onChange }) => {
  if (!user) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
          alt={user.name}
          className="w-20 h-20 rounded-full"
        />
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onChange('name', e.target.value)}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Your name"
            />
          ) : (
            <h2 className="text-xl font-semibold">{formData.name}</h2>
          )}
          <p className="text-gray-600">{formData.email}</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        {isEditing ? (
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Your phone number"
          />
        ) : (
          <p className="text-gray-900">{formData.phone}</p>
        )}
      </div>
    </div>
  );
};

export default BasicInfo;