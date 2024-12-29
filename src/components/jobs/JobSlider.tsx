import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import JobCard from './JobCard';
import { Job } from '../../types';

interface JobSliderProps {
  jobs: Job[];
  itemsPerPage?: number;
}

const JobSlider: React.FC<JobSliderProps> = ({ jobs, itemsPerPage = 3 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextPage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevPage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextPage();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentPage]);

  const currentJobs = jobs.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No jobs available at the moment.
      </div>
    );
  }

  return (
    <div className="relative px-12">
      {/* Navigation Buttons */}
      <button
        onClick={prevPage}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isAnimating}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Jobs Grid */}
      <div className="overflow-hidden">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-transform duration-500 ease-in-out`}
        >
          {currentJobs.map((job) => (
            <div
              key={job.id}
              className="transform transition-all duration-500 ease-in-out"
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={nextPage}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isAnimating}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Page Indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentPage(index);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              currentPage === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default JobSlider;