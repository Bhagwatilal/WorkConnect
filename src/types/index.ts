export type UserRole = 'worker' | 'owner' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Worker extends User {
  skills: string[];
  experience: string;
  preferredWorkType: 'full-time' | 'part-time' | 'both';
  availability: string;
  rating: number;
  completedJobs: number;
}

export interface Owner extends User {
  businessName: string;
  businessType: string;
  location: string;
  rating: number;
  activeJobs: number;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  businessName: string;
  ownerId: string;
  location: string;
  workType: 'full-time' | 'part-time';
  salary: {
    amount: number;
    period: 'hour' | 'day' | 'month';
  };
  requirements: string[];
  status: 'open' | 'closed';
  createdAt: string;
}