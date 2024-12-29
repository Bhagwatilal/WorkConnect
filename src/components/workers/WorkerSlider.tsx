import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import WorkerCard from './WorkerCard';
import { Worker } from '../../types';

interface WorkerSliderProps {
  workers: Worker[];
  itemsPerPage?: number;
}

export const WorkerSlider: React.FC<WorkerSliderProps> = ({ workers, itemsPerPage = 3 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(workers.length / itemsPerPage);
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

  useEffect(() => {
    const timer = setInterval(() => {
      nextPage();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentPage]);

  const currentWorkers = workers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="relative px-12">
      <button
        onClick={prevPage}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        disabled={isAnimating}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      </div>

      <button
        onClick={nextPage}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        disabled={isAnimating}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

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

export default WorkerSlider;