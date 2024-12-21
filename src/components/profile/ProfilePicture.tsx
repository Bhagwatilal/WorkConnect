import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';

interface ProfilePictureProps {
  currentImage: string;
  name: string;
  onImageChange: (image: string) => void;
  isEditing: boolean;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  currentImage,
  name,
  onImageChange,
  isEditing,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState(currentImage);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <img
        src={previewUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`}
        alt={name}
        className="w-24 h-24 rounded-full object-cover"
      />
      {isEditing && (
        <>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
};