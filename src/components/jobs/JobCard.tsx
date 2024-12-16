import React from 'react';
import { MapPin, Clock, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Job } from '../../types';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition bg-white">
      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
      <p className="text-gray-600 mb-4">{job.businessName}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-500">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <Clock className="h-4 w-4 mr-2" />
          <span>{job.workType}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <IndianRupee className="h-4 w-4 mr-2" />
          <span>₹{job.salary.amount.toLocaleString()}/{job.salary.period}</span>
        </div>
      </div>

      <Link
        to={`/jobs/${job.id}`}
        className="block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Apply Now
      </Link>
    </div>
  );
};

export default JobCard;