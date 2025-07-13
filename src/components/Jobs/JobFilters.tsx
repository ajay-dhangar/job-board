import React from 'react';
import { Search, MapPin, Briefcase, DollarSign, X } from 'lucide-react';
import Input from '../UI/Input';

export interface FilterState {
  search: string;
  location: string;
  type: string;
  salary: string;
  tags: string[];
}

interface JobFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const handleInputChange = (field: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFilterChange({ ...filters, tags: newTags });
  };

  const popularTags = [
    'React', 'JavaScript', 'Python', 'Node.js', 'TypeScript',
    'UI/UX', 'Frontend', 'Backend', 'Full Stack', 'Remote'
  ];

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ''
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors"
          >
            <X className="w-4 h-4 mr-1" />
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <Input
            label="Search jobs"
            icon={Search}
            placeholder="Job title, company, or keywords"
            value={filters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
          />
        </div>

        {/* Location */}
        <div>
          <Input
            label="Location"
            icon={MapPin}
            placeholder="City, state, or remote"
            value={filters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Job Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          >
            <option value="">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
          </select>
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Salary Range
          </label>
          <select
            value={filters.salary}
            onChange={(e) => handleInputChange('salary', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          >
            <option value="">Any Salary</option>
            <option value="0-50000">Under $50K</option>
            <option value="50000-100000">$50K - $100K</option>
            <option value="100000-150000">$100K - $150K</option>
            <option value="150000+">$150K+</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skills & Technologies
          </label>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filters.tags.includes(tag)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;