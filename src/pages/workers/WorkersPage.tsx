import React, { useState } from 'react';
import SearchBar from '../../components/common/SearchBar';
import FilterSection from '../../components/common/FilterSection';
import WorkerCard from '../../components/workers/WorkerCard';
import { Worker } from '../../types';

// Sample data - replace with API call
const SAMPLE_WORKERS: Worker[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'worker',
    skills: ['Retail', 'Customer Service', 'Inventory Management'],
    experience: '2 years',
    preferredWorkType: 'full-time',
    availability: 'Immediate',
    rating: 4.5,
    completedJobs: 15,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'worker',
    skills: ['Restaurant Service', 'Food Handling', 'Team Work'],
    experience: '3 years',
    preferredWorkType: 'part-time',
    availability: 'Weekends',
    rating: 4.8,
    completedJobs: 25,
  },
];

const WorkersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Workers</h1>
      
      <div className="mb-8">
        <SearchBar
          placeholder="Search for workers..."
          onSearch={setSearchQuery}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1 space-y-6">
          <FilterSection
            title="Skills"
            options={[
              { label: 'Retail', value: 'retail' },
              { label: 'Restaurant', value: 'restaurant' },
              { label: 'Customer Service', value: 'customer-service' },
            ]}
            selectedValues={selectedSkills}
            onChange={setSelectedSkills}
          />

          <FilterSection
            title="Availability"
            options={[
              { label: 'Immediate', value: 'immediate' },
              { label: 'Within 1 Week', value: 'one-week' },
              { label: 'Weekends Only', value: 'weekends' },
            ]}
            selectedValues={selectedAvailability}
            onChange={setSelectedAvailability}
          />
        </div>

        {/* Worker Listings */}
        <div className="lg:col-span-3">
          <div className="grid gap-6 md:grid-cols-2">
            {SAMPLE_WORKERS.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkersPage;