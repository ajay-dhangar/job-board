import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Calendar, 
  ExternalLink, 
  Building,
  Briefcase,
  Star,
  Globe
} from 'lucide-react';
import Button from '../components/UI/Button';
import JobCard from '../components/Jobs/JobCard';
import { mockJobs } from '../data/mockData';

const CompanyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  // Find company data from jobs
  const companyJobs = mockJobs.filter(job => job.employerId === id);
  
  if (companyJobs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Company not found
          </h2>
          <Button onClick={() => navigate('/companies')}>
            Back to Companies
          </Button>
        </div>
      </div>
    );
  }

  const company = {
    id: id!,
    name: companyJobs[0].company,
    logo: companyJobs[0].companyLogo,
    description: `${companyJobs[0].company} is a leading technology company dedicated to innovation and excellence. We're building the future through cutting-edge solutions and talented teams. Our mission is to create products that make a meaningful impact on people's lives while fostering a culture of creativity, collaboration, and continuous learning.`,
    location: companyJobs[0].location.split(',')[0] + ', ' + (companyJobs[0].location.includes('Remote') ? 'Global' : companyJobs[0].location.split(',')[1] || 'USA'),
    website: `https://${companyJobs[0].company.toLowerCase().replace(/\s+/g, '')}.com`,
    size: companyJobs.length > 3 ? '500-1000' : companyJobs.length > 1 ? '50-200' : '10-50',
    industry: companyJobs[0].tags.includes('AI') || companyJobs[0].tags.includes('Data Science') ? 'Artificial Intelligence' :
             companyJobs[0].tags.includes('Design') || companyJobs[0].tags.includes('UI/UX') ? 'Design & Creative' :
             companyJobs[0].tags.includes('DevOps') || companyJobs[0].tags.includes('Cloud') ? 'Cloud & Infrastructure' :
             'Software Development',
    founded: '2015',
    jobCount: companyJobs.length,
    jobs: companyJobs,
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health insurance',
      'Flexible work arrangements',
      'Professional development budget',
      'Unlimited PTO policy',
      'Modern office spaces',
      'Team building events',
      'Free meals and snacks'
    ],
    values: [
      'Innovation and creativity',
      'Collaboration and teamwork',
      'Diversity and inclusion',
      'Work-life balance',
      'Continuous learning',
      'Customer focus'
    ]
  };

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/companies')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Companies
        </motion.button>

        {/* Company Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-8"
        >
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 relative">
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="p-8 -mt-16 relative">
            <div className="flex flex-col lg:flex-row items-start lg:items-end space-y-4 lg:space-y-0 lg:space-x-6">
              {/* Company Logo */}
              <div className="relative">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="w-24 h-24 rounded-xl object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg">
                    <Building className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>

              {/* Company Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {company.name}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  {company.industry}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {company.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {company.size} employees
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Founded {company.founded}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {company.jobCount} open positions
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" icon={ExternalLink}>
                      Visit Website
                    </Button>
                  </a>
                )}
                <Button icon={Star}>
                  Follow Company
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                About {company.name}
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {company.description}
                </p>
              </div>
            </motion.div>

            {/* Company Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Our Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {company.values.map((value, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-gray-700 dark:text-gray-300">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Open Positions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Open Positions ({company.jobCount})
                </h2>
              </div>
              <div className="p-8">
                <div className="grid gap-6">
                  {company.jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onSave={handleSaveJob}
                      isSaved={savedJobs.includes(job.id)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Company Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Industry</span>
                  <span className="text-gray-900 dark:text-white font-medium">{company.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Company Size</span>
                  <span className="text-gray-900 dark:text-white font-medium">{company.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Founded</span>
                  <span className="text-gray-900 dark:text-white font-medium">{company.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Location</span>
                  <span className="text-gray-900 dark:text-white font-medium">{company.location}</span>
                </div>
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Benefits & Perks
              </h3>
              <div className="space-y-2">
                {company.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg p-6 text-white"
            >
              <h3 className="text-lg font-semibold mb-4">
                Interested in Working Here?
              </h3>
              <p className="text-purple-100 text-sm mb-4">
                Explore our open positions and join our amazing team.
              </p>
              <div className="space-y-2">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Open Positions
                </Button>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                      icon={Globe}
                    >
                      Visit Website
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
