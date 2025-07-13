import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Users, Eye, BarChart3 } from 'lucide-react';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import Input from '../components/UI/Input';
import { useAuth } from '../context/AuthContext';
import { mockJobs } from '../data/mockData';

const EmployerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);
  const [jobs, setJobs] = useState(mockJobs.filter(job => job.employerId === user?.id));

  const [jobForm, setJobForm] = useState({
    title: '',
    location: '',
    type: 'full-time' as 'full-time' | 'part-time' | 'contract' | 'remote',
    salary: '',
    description: '',
    requirements: '',
    responsibilities: '',
    perks: '',
    tags: '',
  });

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const jobData = {
      ...jobForm,
      id: editingJob ? editingJob.id : Date.now().toString(),
      company: user?.name || 'Your Company',
      employerId: user?.id || '1',
      postedDate: new Date().toISOString().split('T')[0],
      applications: [],
      featured: false,
      requirements: jobForm.requirements.split('\n').filter(r => r.trim()),
      responsibilities: jobForm.responsibilities.split('\n').filter(r => r.trim()),
      perks: jobForm.perks.split('\n').filter(p => p.trim()),
      tags: jobForm.tags.split(',').map(t => t.trim()).filter(t => t),
    };

    if (editingJob) {
      setJobs(jobs.map(job => job.id === editingJob.id ? jobData : job));
    } else {
      setJobs([...jobs, jobData]);
    }

    setIsJobModalOpen(false);
    setEditingJob(null);
    setJobForm({
      title: '',
      location: '',
      type: 'full-time',
      salary: '',
      description: '',
      requirements: '',
      responsibilities: '',
      perks: '',
      tags: '',
    });
  };

  const handleEditJob = (job: any) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      location: job.location,
      type: job.type,
      salary: job.salary || '',
      description: job.description,
      requirements: job.requirements.join('\n'),
      responsibilities: job.responsibilities.join('\n'),
      perks: job.perks.join('\n'),
      tags: job.tags.join(', '),
    });
    setIsJobModalOpen(true);
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const totalApplications = jobs.reduce((sum, job) => sum + job.applications.length, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Employer Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user?.name}
            </p>
          </div>
          <Button
            icon={Plus}
            onClick={() => setIsJobModalOpen(true)}
            className="mt-4 lg:mt-0"
          >
            Post New Job
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{jobs.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalApplications}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Profile Views</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">248</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Job Listings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Your Job Listings
            </h2>
          </div>
          
          {jobs.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No jobs posted yet. Create your first job listing!
              </p>
              <Button
                icon={Plus}
                onClick={() => setIsJobModalOpen(true)}
              >
                Post Your First Job
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {job.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>{job.location}</span>
                        <span>•</span>
                        <span className="capitalize">{job.type}</span>
                        <span>•</span>
                        <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {job.applications.length} applications
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Edit}
                        onClick={() => handleEditJob(job)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Trash2}
                        onClick={() => handleDeleteJob(job.id)}
                        className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Job Modal */}
      <Modal
        isOpen={isJobModalOpen}
        onClose={() => {
          setIsJobModalOpen(false);
          setEditingJob(null);
          setJobForm({
            title: '',
            location: '',
            type: 'full-time',
            salary: '',
            description: '',
            requirements: '',
            responsibilities: '',
            perks: '',
            tags: '',
          });
        }}
        title={editingJob ? 'Edit Job' : 'Post New Job'}
        size="lg"
      >
        <form onSubmit={handleJobSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Job Title"
              value={jobForm.title}
              onChange={(e) => setJobForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Senior Frontend Developer"
              required
            />
            <Input
              label="Location"
              value={jobForm.location}
              onChange={(e) => setJobForm(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g. San Francisco, CA"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Job Type
              </label>
              <select
                value={jobForm.type}
                onChange={(e) => setJobForm(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="remote">Remote</option>
              </select>
            </div>
            <Input
              label="Salary Range"
              value={jobForm.salary}
              onChange={(e) => setJobForm(prev => ({ ...prev, salary: e.target.value }))}
              placeholder="e.g. $80,000 - $120,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Description
            </label>
            <textarea
              value={jobForm.description}
              onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the job role, company culture, and what makes this position exciting..."
              className="w-full h-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Requirements (one per line)
            </label>
            <textarea
              value={jobForm.requirements}
              onChange={(e) => setJobForm(prev => ({ ...prev, requirements: e.target.value }))}
              placeholder="5+ years of experience in React&#10;Strong knowledge of JavaScript&#10;Experience with TypeScript"
              className="w-full h-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Responsibilities (one per line)
            </label>
            <textarea
              value={jobForm.responsibilities}
              onChange={(e) => setJobForm(prev => ({ ...prev, responsibilities: e.target.value }))}
              placeholder="Develop user-facing features&#10;Collaborate with design team&#10;Write clean, maintainable code"
              className="w-full h-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Benefits & Perks (one per line)
            </label>
            <textarea
              value={jobForm.perks}
              onChange={(e) => setJobForm(prev => ({ ...prev, perks: e.target.value }))}
              placeholder="Health insurance&#10;Flexible work hours&#10;Professional development budget"
              className="w-full h-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
            />
          </div>

          <Input
            label="Tags (comma-separated)"
            value={jobForm.tags}
            onChange={(e) => setJobForm(prev => ({ ...prev, tags: e.target.value }))}
            placeholder="React, JavaScript, Frontend, Senior"
          />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsJobModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingJob ? 'Update Job' : 'Post Job'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EmployerDashboard;