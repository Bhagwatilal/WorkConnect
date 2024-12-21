import React from 'react';
import { MapPin, Clock, IndianRupee } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Job } from '../../types';
import { useJobApplicationStore } from '../../store/jobApplicationStore';
import { useAuthStore } from '../../store/authStore';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const applications = useJobApplicationStore(state => 
    user ? state.getApplicationsByWorker(user.id) : []
  );

  const hasApplied = applications.some(app => app.jobId === job.id);

  const handleApply = () => {
    if (!user) {
      navigate('/login', { state: { from: `/jobs/${job.id}/apply` } });
      return;
    }
    navigate(`/jobs/${job.id}/apply`);
  };

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

      <button
        onClick={handleApply}
        disabled={hasApplied}
        className={`w-full text-center px-4 py-2 rounded ${
          hasApplied 
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {hasApplied ? 'Already Applied' : 'Apply Now'}
      </button>
    </div>
  );
};

export default JobCard;