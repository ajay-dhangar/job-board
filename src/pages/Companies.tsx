import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Users, Briefcase, ExternalLink, Building, Filter } from 'lucide-react';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { mockJobs } from '../data/mockData';

interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  location: string;
  website?: string;
  size: string;
  industry: string;
  founded: string;
  jobCount: number;
  jobs: typeof mockJobs;
}

const Companies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 12;

  // Generate companies from job data
  const companies: Company[] = useMemo(() => {
    const companyMap = new Map<string, Company>();
    
    mockJobs.forEach(job => {
      if (!companyMap.has(job.company)) {
        const companyJobs = mockJobs.filter(j => j.company === job.company);
        companyMap.set(job.company, {
          id: job.employerId,
          name: job.company,
          logo: job.companyLogo,
          description: `${job.company} is a leading company in the technology sector, committed to innovation and excellence. We're building the future through cutting-edge solutions and talented teams.`,
          location: job.location.split(',')[0] + ', ' + (job.location.includes('Remote') ? 'Global' : job.location.split(',')[1] || 'USA'),
          website: `https://${job.company.toLowerCase().replace(/\s+/g, '')}.com`,
          size: companyJobs.length > 3 ? '500-1000' : companyJobs.length > 1 ? '50-200' : '10-50',
          industry: job.tags.includes('AI') || job.tags.includes('Data Science') ? 'Artificial Intelligence' :
                   job.tags.includes('Design') || job.tags.includes('UI/UX') ? 'Design & Creative' :
                   job.tags.includes('DevOps') || job.tags.includes('Cloud') ? 'Cloud & Infrastructure' :
                   'Software Development',
          founded: '2015',
          jobCount: companyJobs.length,
          jobs: companyJobs,
        });
      }
    });
    
    return Array.from(companyMap.values());
  }, []);

  const industries = [...new Set(companies.map(c => c.industry))];
  const companySizes = ['10-50', '50-200', '200-500', '500-1000', '1000+'];

  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const matchesSearch = !searchTerm || 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry;
      const matchesSize = !selectedSize || company.size === selectedSize;

      return matchesSearch && matchesIndustry && matchesSize;
    });
  }, [companies, searchTerm, selectedIndustry, selectedSize]);

  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * companiesPerPage;
    return filteredCompanies.slice(startIndex, startIndex + companiesPerPage);
  }, [filteredCompanies, currentPage]);

  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedIndustry('');
    setSelectedSize('');
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
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Discover Amazing Companies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Explore top companies and find your perfect workplace culture
          </motion.p>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                icon={Search}
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Company Size</option>
                {companySizes.map(size => (
                  <option key={size} value={size}>{size} employees</option>
                ))}
              </select>
            </div>
          </div>

          {(searchTerm || selectedIndustry || selectedSize) && (
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredCompanies.length} companies found
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                icon={Filter}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </motion.div>

        {/* Companies Grid */}
        {paginatedCompanies.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <Building className="w-12 h-12 mx-auto mb-4" />
              <p className="text-lg">No companies found matching your criteria</p>
              <p className="text-sm">Try adjusting your search terms or filters</p>
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {paginatedCompanies.map((company) => (
                <motion.div
                  key={company.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Company Header */}
                    <div className="flex items-center space-x-4 mb-4">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={`${company.name} logo`}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <Building className="w-8 h-8 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {company.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {company.industry}
                        </p>
                      </div>
                    </div>

                    {/* Company Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        {company.location}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <Users className="w-4 h-4 mr-2" />
                        {company.size} employees
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {company.jobCount} open positions
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {company.description}
                    </p>

                    {/* Actions */}
                    <div className="flex justify-between items-center">
                      <Link
                        to={`/companies/${company.id}`}
                        className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm transition-colors"
                      >
                        View Company →
                      </Link>
                      {company.website && (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Job Count Badge */}
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Open Positions</span>
                      <span className="font-semibold">{company.jobCount}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
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
  );
};

export default Companies;
