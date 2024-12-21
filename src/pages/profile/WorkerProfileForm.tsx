import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useWorkerStore } from '../../store/workerStore';
import ProfileHeader from '../../components/profile/ProfileHeader';
import SkillsSection from '../../components/profile/SkillsSection';
import WorkPreferences from '../../components/profile/WorkPreferences';
import ContactInfo from '../../components/profile/ContactInfo';

interface WorkerProfileFormProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const WorkerProfileForm: React.FC<WorkerProfileFormProps> = ({ isEditing, setIsEditing }) => {
  const { user } = useAuthStore();
  const { profile, updateWorkerProfile } = useWorkerStore();
  const [formData, setFormData] = useState(profile || {
    skills: ['Retail', 'Customer Service'],
    experience: '2 years',
    preferredWorkType: 'full-time',
    availability: 'Immediate',
    education: 'High School',
    languages: ['English', 'Hindi'],
    address: '123 Worker St, Mumbai',
    phone: '+91 98765 43210',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkerProfile(formData);
    setIsEditing(false);
  };

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <ProfileHeader user={user} />
          
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