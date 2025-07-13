import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, Bookmark, Star } from 'lucide-react';
import { Job } from '../../types';

interface JobCardProps {
  job: Job;
  onSave?: (jobId: string) => void;
  isSaved?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onSave, isSaved = false }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
  };

  const typeColors = {
    'full-time': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    'part-time': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    'contract': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    'remote': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {job.featured && (
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium px-4 py-2 flex items-center">
          <Star className="w-4 h-4 mr-1" />
          Featured Job
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            {job.companyLogo && (
              <img
                src={job.companyLogo}
                alt={`${job.company} logo`}
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {job.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{job.company}</p>
            </div>
          </div>
          
          {onSave && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSave(job.id)}
              className={`p-2 rounded-lg transition-colors ${
                isSaved
                  ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                  : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </motion.button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[job.type]}`}>
            {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
          </span>
          {job.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            {job.location}
          </div>
          {job.salary && (
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
              <DollarSign className="w-4 h-4 mr-2" />
              {job.salary}
            </div>
          )}
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            {formatDate(job.postedDate)}
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {job.description}
        </p>

        <div className="flex justify-between items-center">
          <Link
            to={`/jobs/${job.id}`}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm transition-colors"
          >
            View Details →
          </Link>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {job.applications.length} applicants
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;