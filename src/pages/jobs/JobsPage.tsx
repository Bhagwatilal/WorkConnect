import React, { useState } from 'react';
import SearchBar from '../../components/common/SearchBar';
import FilterSection from '../../components/common/FilterSection';
import JobCard from '../../components/jobs/JobCard';
import { useJobStore } from '../../store/jobStore';
import { PUNE_LOCATIONS } from '../../constants/locations';

const JobsPage: React.FC = () => {
  const jobs = useJobStore((state) => state.jobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const areas = Object.keys(PUNE_LOCATIONS).map(area => ({
    label: area,
    value: area.toLowerCase(),
  }));

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesArea = selectedAreas.length === 0 || 
      selectedAreas.some(area => job.location.toLowerCase().includes(area.toLowerCase()));
    
    const matchesType = selectedTypes.length === 0 ||
      selectedTypes.includes(job.workType);

    return matchesSearch && matchesArea && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Jobs in Pune</h1>
      
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
            title="Area"
            options={areas}
            selectedValues={selectedAreas}
            onChange={setSelectedAreas}
          />

          <FilterSection
            title="Job Type"
            options={[
              { label: 'Full Time', value: 'full-time' },
              { label: 'Part Time', value: 'part-time' },
            ]}
            selectedValues={selectedTypes}
            onChange={setSelectedTypes}
          />
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;