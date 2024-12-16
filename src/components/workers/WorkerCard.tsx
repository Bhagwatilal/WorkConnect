import React from 'react';
import { MapPin, Star, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Worker } from '../../types';

interface WorkerCardProps {
  worker: Worker;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition bg-white">
      <div className="flex items-center mb-4">
        <img
          src={worker.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.name)}`}
          alt={worker.name}
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4">
          <h3 className="text-xl font-semibold">{worker.name}</h3>
          <div className="flex items-center text-gray-500">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{worker.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex flex-wrap gap-2">
          {worker.skills.map((skill) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="flex items-center text-gray-500">
          <Briefcase className="h-4 w-4 mr-2" />
          <span>{worker.preferredWorkType}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{worker.availability}</span>
        </div>
      </div>

      <Link
        to={`/workers/${worker.id}`}
        className="block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Profile
      </Link>
    </div>
  );
};

export default WorkerCard;