import React, { useState } from 'react';
import SearchBar from '../../components/common/SearchBar';
import FilterSection from '../../components/common/FilterSection';
import JobCard from '../../components/jobs/JobCard';
import { Job } from '../../types';

// Sample data - replace with API call
const SAMPLE_JOBS: Job[] = [
  {
    id: '1',
    title: 'Store Assistant',
    description: 'We are looking for a store assistant to help with daily operations.',
    businessName: 'Super Mart',
    ownerId: 'owner1',
    location: 'Mumbai',
    workType: 'full-time',
    salary: {
      amount: 15000,
      period: 'month',
    },
    requirements: ['Basic English', 'Physical fitness'],
    status: 'open',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Restaurant Server',
    description: 'Experienced server needed for busy restaurant.',
    businessName: 'Tasty Bites',
    ownerId: 'owner2',
    location: 'Delhi',
    workType: 'part-time',
    salary: {
      amount: 300,
      period: 'day',
    },
    requirements: ['Previous experience', 'Good communication'],
    status: 'open',
    createdAt: new Date().toISOString(),
  },
];

const JobsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Jobs</h1>
      
      <div className="mb-8">
        <SearchBar
          placeholder="Search for jobs..."
          onSearch={setSearchQuery}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1 space-y-6">
          <FilterSection
            title="Job Type"
            options={[
              { label: 'Full Time', value: 'full-time' },
              { label: 'Part Time', value: 'part-time' },
            ]}
            selectedValues={selectedTypes}
            onChange={setSelectedTypes}
          />

          <FilterSection
            title="Location"
            options={[
              { label: 'Mumbai', value: 'mumbai' },
              { label: 'Delhi', value: 'delhi' },
              { label: 'Bangalore', value: 'bangalore' },
            ]}
            selectedValues={selectedLocations}
            onChange={setSelectedLocations}
          />
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3">
          <div className="grid gap-6 md:grid-cols-2">
            {SAMPLE_JOBS.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;