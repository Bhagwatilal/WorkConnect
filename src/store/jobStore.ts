import { create } from 'zustand';
import { Job } from '../types';

interface JobState {
  jobs: Job[];
  addJob: (job: Job) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  initializeJobs: () => void;
}

// Sample initial jobs data
const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    title: 'Store Assistant',
    description: 'Looking for a store assistant to help with daily operations.',
    businessName: 'Super Mart',
    ownerId: 'owner1',
    location: 'Mumbai',
    workType: 'full-time',
    salary: {
      amount: 15000,
      period: 'month',
    },
    requirements: ['Retail', 'Customer Service', 'Inventory Management'],
    status: 'open',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Restaurant Server',
    description: 'Experienced server needed for busy restaurant.',
    businessName: 'Tasty Bites',
    ownerId: 'owner2',
    location: 'Delhi',
    workType: 'part-time',
    salary: {
      amount: 300,
      period: 'day',
    },
    requirements: ['Restaurant Service', 'Food Handling', 'Customer Service'],
    status: 'open',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Delivery Driver',
    description: 'Delivery driver needed for local deliveries.',
    businessName: 'Quick Delivery',
    ownerId: 'owner3',
    location: 'Mumbai',
    workType: 'full-time',
    salary: {
      amount: 20000,
      period: 'month',
    },
    requirements: ['Driving License', 'Vehicle', 'Navigation Skills'],
    status: 'open',
    createdAt: new Date().toISOString(),
  },
];

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
  updateJob: (id, updatedJob) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === id ? { ...job, ...updatedJob } : job
      ),
    })),
  deleteJob: (id) =>
    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== id),
    })),
  initializeJobs: () => set({ jobs: INITIAL_JOBS }),
}));