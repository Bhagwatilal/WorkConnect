import React from 'react';
import { User } from '../../types';

interface ProfileHeaderProps {
  user: User | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  if (!user) return null;

  return (
    <div className="flex items-center space-x-4">
      <img
        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
        alt={user.name}
        className="w-20 h-20 rounded-full"
      />
      <div>
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;