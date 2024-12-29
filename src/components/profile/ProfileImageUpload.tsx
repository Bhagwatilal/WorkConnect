import React, { useRef, useState } from 'react';
import { Camera } from 'lucide-react';

interface ProfileImageUploadProps {
  currentImage: string | undefined;
  name: string;
  onImageChange: (image: string) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  currentImage,
  name,
  onImageChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentImage);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

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
    <div className="relative inline-block group">
      <div 
        onClick={handleImageClick}
        className="cursor-pointer relative"
      >
        <img
          src={previewUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`}
          alt={name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera className="w-6 h-6 text-white" />
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImageUpload;