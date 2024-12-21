import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobStore } from '../../store/jobStore';
import { Job } from '../../types';

const JobForm: React.FC = () => {
  const navigate = useNavigate();
  const addJob = useJobStore((state) => state.addJob);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    workType: 'full-time',
    salaryAmount: '',
    salaryPeriod: 'month',
    requirements: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      businessName: 'Your Business Name', // Get from owner profile
      ownerId: 'owner-id', // Get from auth store
      location: formData.location,
      workType: formData.workType as 'full-time' | 'part-time',
      salary: {
        amount: parseInt(formData.salaryAmount),
        period: formData.salaryPeriod as 'hour' | 'day' | 'month',
      },
      requirements: formData.requirements.split(',').map(r => r.trim()),
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    addJob(newJob);
    navigate('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="workType" className="block text-sm font-medium text-gray-700">
              Work Type
            </label>
            <select
              id="workType"
              name="workType"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.workType}
              onChange={handleChange}
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="salaryAmount" className="block text-sm font-medium text-gray-700">
              Salary Amount
            </label>
            <input
              type="number"
              id="salaryAmount"
              name="salaryAmount"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.salaryAmount}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="salaryPeriod" className="block text-sm font-medium text-gray-700">
              Salary Period
            </label>
            <select
              id="salaryPeriod"
              name="salaryPeriod"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.salaryPeriod}
              onChange={handleChange}
            >
              <option value="hour">Per Hour</option>
              <option value="day">Per Day</option>
              <option value="month">Per Month</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
            Requirements (comma-separated)
          </label>
          <input
            type="text"
            id="requirements"
            name="requirements"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="e.g., Basic English, Physical fitness, Customer service experience"
          />
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
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;