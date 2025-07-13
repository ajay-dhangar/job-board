import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Building, 
  ArrowLeft,
  Bookmark,
  Share2,
  CheckCircle
} from 'lucide-react';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import Input from '../components/UI/Input';
import { mockJobs } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    resume: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const job = mockJobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Job not found
          </h2>
          <Button onClick={() => navigate('/jobs')}>
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    // Mock application submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setHasApplied(true);
    setIsApplicationModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const typeColors = {
    'full-time': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    'part-time': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    'contract': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    'remote': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/jobs')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Jobs
        </motion.button>

        {/* Job Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              {job.companyLogo && (
                <img
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {job.title}
                </h1>
                <div className="flex items-center text-gray-600 dark:text-gray-400 space-x-4">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-1" />
                    {job.company}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
              {hasApplied ? (
                <div className="flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-lg">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Applied
                </div>
              ) : (
                <Button
                  onClick={() => setIsApplicationModalOpen(true)}
                  size="lg"
                >
                  Apply Now
                </Button>
              )}
            </div>
          </div>

          {/* Job Meta */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">Posted {formatDate(job.postedDate)}</span>
            </div>
            {job.salary && (
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <DollarSign className="w-4 h-4 mr-2" />
                <span className="text-sm">{job.salary}</span>
              </div>
            )}
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">{job.applications.length} applicants</span>
            </div>
            <div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[job.type]}`}>
                {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Job Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Job Description
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {job.description}
                </p>
              </div>
            </motion.div>

            {/* Responsibilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Key Responsibilities
              </h2>
              <ul className="space-y-2">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Requirements
              </h2>
              <ul className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Benefits & Perks
              </h2>
              <ul className="space-y-2">
                {job.perks.map((perk, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{perk}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                About {job.company}
              </h3>
              <div className="space-y-3">
                {job.companyLogo && (
                  <img
                    src={job.companyLogo}
                    alt={`${job.company} logo`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Learn more about {job.company} and their mission to create innovative solutions.
                </p>
              </div>
            </motion.div>

            {/* Apply Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg p-6 text-white"
            >
              <h3 className="text-lg font-semibold mb-4">
                Ready to Apply?
              </h3>
              <p className="text-purple-100 text-sm mb-4">
                Join {job.company} and be part of their innovative team.
              </p>
              {hasApplied ? (
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Application Submitted
                </div>
              ) : (
                <Button
                  onClick={() => setIsApplicationModalOpen(true)}
                  variant="secondary"
                  className="w-full"
                >
                  Apply Now
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <Modal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        title="Apply for this position"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              {job.title} at {job.company}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Complete the form below to submit your application
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Letter
              </label>
              <textarea
                value={applicationData.coverLetter}
                onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                className="w-full h-32 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Resume (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsApplicationModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              loading={isSubmitting}
              disabled={!applicationData.coverLetter || !applicationData.resume}
            >
              Submit Application
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default JobDetail;