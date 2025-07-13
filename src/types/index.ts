export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employer' | 'candidate';
  avatar?: string;
  createdAt: string;
}

export interface Employer extends User {
  company: string;
  companyLogo?: string;
  companyDescription?: string;
  website?: string;
}

export interface Candidate extends User {
  resume?: string;
  skills: string[];
  experience: string;
  location: string;
  savedJobs: string[];
  appliedJobs: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  perks: string[];
  postedDate: string;
  employerId: string;
  tags: string[];
  applications: Application[];
  featured: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  coverLetter: string;
  resumeUrl: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedDate: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}