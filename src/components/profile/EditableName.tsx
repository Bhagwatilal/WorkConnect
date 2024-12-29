import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';

interface EditableNameProps {
  name: string;
  onSave: (newName: string) => void;
}

const EditableName: React.FC<EditableNameProps> = ({ name, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleSave = () => {
    if (editedName.trim()) {
      onSave(editedName.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedName(name);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">{name}</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 text-gray-400 hover:text-gray-600"
          title="Edit name"
        >
          <Pencil className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
        className="px-2 py-1 border rounded-md text-lg"
        placeholder="Enter your name"
        autoFocus
      />
      <button
        onClick={handleSave}
        className="p-1 text-green-600 hover:text-green-700"
        title="Save"
      >
        <Check className="h-4 w-4" />
      </button>
      <button
        onClick={handleCancel}
        className="p-1 text-red-600 hover:text-red-700"
        title="Cancel"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default EditableName;