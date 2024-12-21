import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import WorkerProfileForm from './WorkerProfileForm';
import OwnerProfileForm from './OwnerProfileForm';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {user.role === 'worker' ? (
          <WorkerProfileForm isEditing={isEditing} setIsEditing={setIsEditing} />
        ) : (
          <OwnerProfileForm isEditing={isEditing} setIsEditing={setIsEditing} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;