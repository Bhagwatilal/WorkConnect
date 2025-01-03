import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, Users } from 'lucide-react';
import { useJobStore } from '../store/jobStore';
import JobSlider from '../components/jobs/JobSlider';

const Home: React.FC = () => {
  const jobs = useJobStore(state => state.jobs);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Next Opportunity
          </h1>
          <p className="text-xl mb-8">
            Connect with local businesses and workers in your area
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/register?type=worker"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Find Work
            </Link>
            <Link
              to="/register?type=owner"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600"
            >
              Hire Workers
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Search</h3>
            <p className="text-gray-600">
              Browse through available jobs or workers in your area
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-gray-600">
              Connect with businesses or workers that match your needs
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Work</h3>
            <p className="text-gray-600">
              Start working or hire workers for your business
            </p>
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest Jobs</h2>
          <Link to="/jobs" className="text-blue-600 hover:text-blue-700">
            View All Jobs →
          </Link>
        </div>
        <JobSlider jobs={jobs.slice(0, 15)} itemsPerPage={3} />
      </section>
    </div>
  );
}

export default Home;