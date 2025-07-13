import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, FileText, Bookmark, Send, Eye, Edit, Upload } from 'lucide-react';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import Input from '../components/UI/Input';
import JobCard from '../components/Jobs/JobCard';
import { useAuth } from '../context/AuthContext';
import { mockJobs } from '../data/mockData';

const CandidateDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>(['1', '2']);
  const [appliedJobs, setAppliedJobs] = useState<string[]>(['1']);
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: '',
    skills: '',
    experience: '',
    bio: '',
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update user profile
    setIsProfileModalOpen(false);
  };

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const savedJobsData = mockJobs.filter(job => savedJobs.includes(job.id));
  const appliedJobsData = mockJobs.filter(job => appliedJobs.includes(job.id));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Candidate Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user?.name}
            </p>
          </div>
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <Button
              icon={Edit}
              variant="outline"
              onClick={() => setIsProfileModalOpen(true)}
            >
              Edit Profile
            </Button>
            <Link to="/jobs">
              <Button icon={Eye}>
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Profile Views</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">127</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Applications</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{appliedJobs.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Send className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Saved Jobs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{savedJobs.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Bookmark className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Resume Downloads</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">43</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Profile
                </h2>
                <Button
                  size="sm"
                  variant="outline"
                  icon={Edit}
                  onClick={() => setIsProfileModalOpen(true)}
                >
                  Edit
                </Button>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {user?.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Software Developer
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Email</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    New York, NY
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Experience</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    3+ years
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  className="w-full"
                  icon={Upload}
                >
                  Upload Resume
                </Button>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'SQL'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Applied Jobs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Applied Jobs
                </h2>
              </div>
              {appliedJobsData.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No applications yet. Start applying to jobs!
                  </p>
                  <Link to="/jobs">
                    <Button>Browse Jobs</Button>
                  </Link>
                </div>
              ) : (
                <div className="p-6">
                  <div className="grid gap-4">
                    {appliedJobsData.map((job) => (
                      <div key={job.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {job.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                              {job.company} • {job.location}
                            </p>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                              Under Review
                            </span>
                          </div>
                          <Link to={`/jobs/${job.id}`}>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Saved Jobs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Saved Jobs
                </h2>
              </div>
              {savedJobsData.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No saved jobs yet. Start saving jobs you're interested in!
                  </p>
                  <Link to="/jobs">
                    <Button>Browse Jobs</Button>
                  </Link>
                </div>
              ) : (
                <div className="p-6">
                  <div className="grid gap-6">
                    {savedJobsData.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onSave={handleSaveJob}
                        isSaved={savedJobs.includes(job.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="Edit Profile"
        size="lg"
      >
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={profileForm.name}
              onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            <Input
              label="Email"
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Location"
              value={profileForm.location}
              onChange={(e) => setProfileForm(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g. New York, NY"
            />
            <Input
              label="Experience"
              value={profileForm.experience}
              onChange={(e) => setProfileForm(prev => ({ ...prev, experience: e.target.value }))}
              placeholder="e.g. 3+ years"
            />
          </div>

          <Input
            label="Skills (comma-separated)"
            value={profileForm.skills}
            onChange={(e) => setProfileForm(prev => ({ ...prev, skills: e.target.value }))}
            placeholder="e.g. JavaScript, React, Node.js"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              value={profileForm.bio}
              onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself, your experience, and what you're looking for..."
              className="w-full h-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsProfileModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CandidateDashboard;