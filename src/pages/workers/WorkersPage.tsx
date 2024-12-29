import React, { useState } from 'react';
import SearchBar from '../../components/common/SearchBar';
import FilterSection from '../../components/common/FilterSection';
import { WorkerSlider } from '../../components/workers/WorkerSlider';
import { SAMPLE_WORKERS } from '../../data/workers';

const WorkersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  const filteredWorkers = SAMPLE_WORKERS.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSkills = selectedSkills.length === 0 ||
      worker.skills.some(skill => selectedSkills.includes(skill.toLowerCase()));
    
    const matchesAvailability = selectedAvailability.length === 0 ||
      selectedAvailability.includes(worker.availability.toLowerCase());

    return matchesSearch && matchesSkills && matchesAvailability;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Workers in Pune</h1>
      
      <div className="mb-8">
        <SearchBar
          placeholder="Search for workers..."
          onSearch={setSearchQuery}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <FilterSection
            title="Skills"
            options={[
              { label: 'Retail', value: 'retail' },
              { label: 'Restaurant', value: 'restaurant' },
              { label: 'Customer Service', value: 'customer-service' },
              { label: 'Cleaning', value: 'cleaning' },
              { label: 'Security', value: 'security' },
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

        <div className="lg:col-span-3">
          <WorkerSlider workers={filteredWorkers} itemsPerPage={6} />
        </div>
      </div>
    </div>
  );
};

export default WorkersPage;