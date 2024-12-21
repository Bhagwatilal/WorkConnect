import React from 'react';
import { JobApplication } from '../../types';
import { useJobStore } from '../../store/jobStore';
import { formatDate } from '../../utils/dateUtils';

interface ApplicationsTableProps {
  applications: JobApplication[];
  type: 'all' | 'pending' | 'accepted';
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ applications, type }) => {
  const jobs = useJobStore(state => state.jobs);

  const filteredApplications = applications.filter(app => {
    if (type === 'pending') return app.status === 'pending';
    if (type === 'accepted') return app.status === 'accepted';
    return true;
  });

  if (filteredApplications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No {type} applications found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applied Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredApplications.map(application => {
            const job = jobs.find(j => j.id === application.jobId);
            if (!job) return null;

            return (
              <tr key={application.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{job.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{job.businessName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {formatDate(application.appliedAt)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${application.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable;