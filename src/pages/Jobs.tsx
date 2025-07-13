import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, Filter } from 'lucide-react';
import JobCard from '../components/Jobs/JobCard';
import JobFilters, { FilterState } from '../components/Jobs/JobFilters';
import Button from '../components/UI/Button';
import { mockJobs } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const Jobs: React.FC = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const jobsPerPage = 9;

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    location: '',
    type: '',
    salary: '',
    tags: [],
  });

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesSearch = !filters.search || 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesLocation = !filters.location || 
        job.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchesType = !filters.type || job.type === filters.type;

      const matchesTags = filters.tags.length === 0 || 
        filters.tags.some(tag => job.tags.includes(tag));

      const matchesSalary = !filters.salary || (() => {
        if (!job.salary) return false;
        const salaryRange = job.salary.toLowerCase();
        
        if (filters.salary === '0-50000') return salaryRange.includes('50') && !salaryRange.includes('100');
        if (filters.salary === '50000-100000') return salaryRange.includes('50') || salaryRange.includes('80') || salaryRange.includes('90');
        if (filters.salary === '100000-150000') return salaryRange.includes('100') || salaryRange.includes('120') || salaryRange.includes('130');
        if (filters.salary === '150000+') return salaryRange.includes('150') || salaryRange.includes('180');
        
        return true;
      })();

      return matchesSearch && matchesLocation && matchesType && matchesTags && matchesSalary;
    });
  }, [filters]);

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * jobsPerPage;
    return filteredJobs.slice(startIndex, startIndex + jobsPerPage);
  }, [filteredJobs, currentPage]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      location: '',
      type: '',
      salary: '',
      tags: [],
    });
    setCurrentPage(1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Browse Jobs
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredJobs.length} jobs found
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
              icon={Filter}
            >
              Filters
            </Button>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <JobFilters
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            {paginatedJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-600 mb-4">
                  <Filter className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-lg">No jobs found matching your criteria</p>
                  <p className="text-sm">Try adjusting your filters or search terms</p>
                </div>
                <Button onClick={handleClearFilters} className="mt-4">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}
                >
                  {paginatedJobs.map((job) => (
                    <motion.div key={job.id} variants={itemVariants}>
                      <JobCard
                        job={job}
                        onSave={user ? handleSaveJob : undefined}
                        isSaved={savedJobs.includes(job.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-12">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'primary' : 'outline'}
                        onClick={() => setCurrentPage(page)}
                        className="w-10 h-10 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;