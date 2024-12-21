import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobStore } from '../../store/jobStore';

const JobEditPage: React.FC = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { jobs, updateJob } = useJobStore();
  const job = jobs.find(j => j.id === jobId);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    workType: 'full-time',
    salaryAmount: '',
    salaryPeriod: 'month',
    requirements: '',
    status: 'open',
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        description: job.description,
        location: job.location,
        workType: job.workType,
        salaryAmount: job.salary.amount.toString(),
        salaryPeriod: job.salary.period,
        requirements: job.requirements.join(', '),
        status: job.status,
      });
    }
  }, [job]);

  if (!job) {
    return <div>Job not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateJob(jobId!, {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      workType: formData.workType as 'full-time' | 'part-time',
      salary: {
        amount: parseInt(formData.salaryAmount),
        period: formData.salaryPeriod as 'hour' | 'day' | 'month',
      },
      requirements: formData.requirements.split(',').map(r => r.trim()),
      status: formData.status as 'open' | 'closed',
    });
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold mb-6">Edit Job</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-md"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              rows={4}
              className="w-full p-2 border rounded-md"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-md"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Type
              </label>
              <select
                required
                className="w-full p-2 border rounded-md"
                value={formData.workType}
                onChange={(e) => setFormData(prev => ({ ...prev, workType: e.target.value }))}
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Amount
              </label>
              <input
                type="number"
                required
                className="w-full p-2 border rounded-md"
                value={formData.salaryAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, salaryAmount: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Period
              </label>
              <select
                required
                className="w-full p-2 border rounded-md"
                value={formData.salaryPeriod}
                onChange={(e) => setFormData(prev => ({ ...prev, salaryPeriod: e.target.value }))}
              >
                <option value="hour">Per Hour</option>
                <option value="day">Per Day</option>
                <option value="month">Per Month</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requirements (comma-separated)
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-md"
              value={formData.requirements}
              onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              required
              className="w-full p-2 border rounded-md"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobEditPage;