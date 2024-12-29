import React from 'react';
import { User } from '../../types';
import ProfileImageUpload from './ProfileImageUpload';
import EditableName from './EditableName';
import { useAuthStore } from '../../store/authStore';

interface ProfileHeaderProps {
  user: User | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const updateUser = useAuthStore(state => state.updateUser);

  if (!user) return null;

  const handleImageChange = (newImage: string) => {
    updateUser({ ...user, avatar: newImage });
  };

  const handleNameChange = (newName: string) => {
    updateUser({ ...user, name: newName });
  };

  return (
    <div className="flex items-center space-x-4">
      <ProfileImageUpload
        currentImage={user.avatar}
        name={user.name}
        onImageChange={handleImageChange}
      />
      <div>
        <EditableName name={user.name} onSave={handleNameChange} />
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;