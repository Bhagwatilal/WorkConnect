import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobStore } from '../../store/jobStore';
import { useAuthStore } from '../../store/authStore';
import { useJobApplicationStore } from '../../store/jobApplicationStore';

const JobApplicationPage: React.FC = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const job = useJobStore(state => state.jobs.find(j => j.id === jobId));
  const addApplication = useJobApplicationStore(state => state.addApplication);

  const [formData, setFormData] = useState({
    coverLetter: '',
    availability: '',
    expectedSalary: '',
    startDate: '',
    references: '',
  });

  if (!job || !user) {
    return <div>Job not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const application = {
      id: Date.now().toString(),
      jobId: job.id,
      workerId: user.id,
      status: 'pending' as const,
      appliedAt: new Date().toISOString(),
      ...formData,
    };

    addApplication(application);
    navigate('/dashboard', { 
      state: { message: 'Application submitted successfully!' }
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold mb-6">Apply for {job.title}</h2>
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">{job.businessName}</h3>
          <p className="text-gray-600 mb-2">{job.location}</p>
          <p className="text-gray-600">₹{job.salary.amount}/{job.salary.period}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Letter
            </label>
            <textarea
              required
              rows={4}
              className="w-full p-2 border rounded-md"
              placeholder="Tell us why you're interested in this position..."
              value={formData.coverLetter}
              onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Availability
            </label>
            <select
              required
              className="w-full p-2 border rounded-md"
              value={formData.availability}
              onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
            >
              <option value="">Select availability</option>
              <option value="immediate">Immediate</option>
              <option value="1_week">Within 1 week</option>
              <option value="2_weeks">Within 2 weeks</option>
              <option value="1_month">Within 1 month</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Salary
            </label>
            <input
              type="number"
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter expected salary"
              value={formData.expectedSalary}
              onChange={(e) => setFormData(prev => ({ ...prev, expectedSalary: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Start Date
            </label>
            <input
              type="date"
              required
              className="w-full p-2 border rounded-md"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              References (Optional)
            </label>
            <textarea
              rows={3}
              className="w-full p-2 border rounded-md"
              placeholder="List any references..."
              value={formData.references}
              onChange={(e) => setFormData(prev => ({ ...prev, references: e.target.value }))}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobApplicationPage;