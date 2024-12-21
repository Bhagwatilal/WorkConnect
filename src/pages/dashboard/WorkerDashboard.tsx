import React, { useState } from 'react';
import { Briefcase, CheckCircle, Clock } from 'lucide-react';
import { useJobApplicationStore } from '../../store/jobApplicationStore';
import { useAuthStore } from '../../store/authStore';
import DashboardStats from '../../components/dashboard/DashboardStats';
import ApplicationsTable from '../../components/dashboard/ApplicationsTable';
import RecommendedJobs from '../../components/jobs/RecommendedJobs';

const WorkerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'accepted'>('all');
  const { user } = useAuthStore();
  const applications = useJobApplicationStore(state => 
    user ? state.getApplicationsByWorker(user.id) : []
  );

  return (
    <div className="space-y-8">
      <DashboardStats applications={applications} />

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Applications
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending Applications
          </button>
          <button
            onClick={() => setActiveTab('accepted')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'accepted'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Accepted Applications
          </button>
        </div>

        <ApplicationsTable applications={applications} type={activeTab} />
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <RecommendedJobs />
      </div>
    </div>
  );
};

export default WorkerDashboard;