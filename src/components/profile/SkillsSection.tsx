import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SkillsSectionProps {
  skills: string[];
  isEditing: boolean;
  onChange: (skills: string[]) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, isEditing, onChange }) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
      {isEditing ? (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded flex items-center">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Add a new skill"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span key={skill} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsSection;