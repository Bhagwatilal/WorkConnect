import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useWorkerStore } from '../../store/workerStore';
import { useLocationStore } from '../../store/locationStore';
import ProfileHeader from '../../components/profile/ProfileHeader';
import SkillsSection from '../../components/profile/SkillsSection';
import WorkPreferences from '../../components/profile/WorkPreferences';
import ContactInfo from '../../components/profile/ContactInfo';
import LocationSelector from '../../components/location/LocationSelector';

interface WorkerProfileFormProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const WorkerProfileForm: React.FC<WorkerProfileFormProps> = ({ isEditing, setIsEditing }) => {
  const { user } = useAuthStore();
  const { profile, updateWorkerProfile } = useWorkerStore();
  const { selectedArea, selectedSubArea } = useLocationStore();
  
  const [formData, setFormData] = useState({
    skills: profile?.skills || ['Retail', 'Customer Service'],
    experience: profile?.experience || '2 years',
    preferredWorkType: profile?.preferredWorkType || 'full-time',
    availability: profile?.availability || 'Immediate',
    education: profile?.education || 'High School',
    languages: profile?.languages || ['English', 'Hindi'],
    address: profile?.address || '',
    phone: profile?.phone || '',
    area: selectedArea || '',
    subArea: selectedSubArea || '',
  });

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkerProfile(formData);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <ProfileHeader user={user} />
          
          <LocationSelector 
            isEditing={isEditing}
            onChange={(area, subArea) => {
              handleChange('area', area);
              handleChange('subArea', subArea);
            }}
          />

          <SkillsSection
            skills={formData.skills}
            isEditing={isEditing}
            onChange={(skills) => handleChange('skills', skills)}
          />

          <WorkPreferences
            formData={formData}
            isEditing={isEditing}
            onChange={handleChange}
          />

          <ContactInfo
            formData={formData}
            isEditing={isEditing}
            onChange={handleChange}
          />

          {isEditing && (
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default WorkerProfileForm;