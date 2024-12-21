import React from 'react';
import { Briefcase, CheckCircle, Clock } from 'lucide-react';
import StatCard from './StatCard';
import { JobApplication } from '../../types';

interface DashboardStatsProps {
  applications: JobApplication[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ applications }) => {
  const acceptedCount = applications.filter(app => app.status === 'accepted').length;
  const pendingCount = applications.filter(app => app.status === 'pending').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Applied Jobs"
        value={applications.length}
        icon={<Briefcase className="text-blue-600" />}
      />
      <StatCard
        title="Accepted"
        value={acceptedCount}
        icon={<CheckCircle className="text-green-600" />}
      />
      <StatCard
        title="Pending"
        value={pendingCount}
        icon={<Clock className="text-yellow-600" />}
      />
    </div>
  );
};

export default DashboardStats;