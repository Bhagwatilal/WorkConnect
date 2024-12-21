import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, Briefcase } from 'lucide-react';
import { useJobStore } from '../../store/jobStore';
import { useJobApplicationStore } from '../../store/jobApplicationStore';
import { useAuthStore } from '../../store/authStore';
import JobsManagementTable from '../../components/dashboard/JobsManagementTable';

const OwnerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'applications'>('active');
  const { user } = useAuthStore();
  const jobs = useJobStore(state => state.jobs);
  const applications = useJobApplicationStore(state => 
    user ? state.getApplicationsByJob(jobs.map(j => j.id)) : []
  );

  const activeJobs = jobs.filter(job => job.status === 'open');
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(app => app.status === 'pending').length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Active Jobs</h3>
            <Briefcase className="text-blue-600" />
          </div>
          <p className="text-3xl font-bold">{activeJobs.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Applications</h3>
            <Users className="text-green-600" />
          </div>
          <p className="text-3xl font-bold">{totalApplications}</p>
          <p className="text-sm text-gray-500 mt-1">{pendingApplications} pending</p>
        </div>

        <Link
          to="/jobs/new"
          className="bg-white p-6 rounded-lg shadow-sm border hover:border-blue-500 group"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold group-hover:text-blue-600">Post New Job</h3>
            <Plus className="text-blue-600" />
          </div>
          <p className="text-sm text-gray-600">Create a new job listing</p>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'active'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active Jobs
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'applications'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Applications
            </button>
          </div>
        </div>

        {activeTab === 'active' ? (
          <JobsManagementTable jobs={activeJobs} />
        ) : (
          <ApplicationsTable applications={applications} type="all" />
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;