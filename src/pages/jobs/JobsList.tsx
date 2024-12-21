import React from 'react';
import JobCard from '../../components/jobs/JobCard';
import { useJobStore } from '../../store/jobStore';

interface JobsListProps {
  limit?: number;
}

const JobsList: React.FC<JobsListProps> = ({ limit }) => {
  const jobs = useJobStore((state) => state.jobs);
  const displayedJobs = limit ? jobs.slice(0, limit) : jobs;

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No jobs available at the moment.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {displayedJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobsList;