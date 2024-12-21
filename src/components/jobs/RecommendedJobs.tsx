import React from 'react';
import { useJobStore } from '../../store/jobStore';
import { useWorkerStore } from '../../store/workerStore';
import JobCard from './JobCard';
import { getRecommendedJobs } from '../../utils/jobUtils';

const RecommendedJobs: React.FC = () => {
  const jobs = useJobStore((state) => state.jobs);
  const workerProfile = useWorkerStore((state) => state.profile);

  const recommendedJobs = getRecommendedJobs(jobs, workerProfile);

  if (recommendedJobs.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommended Jobs</h3>
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            No recommended jobs found. Try updating your skills and preferences in your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recommended Jobs</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recommendedJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedJobs;