import { create } from 'zustand';
import { Job } from '../types';

interface JobState {
  jobs: Job[];
  addJob: (job: Job) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  initializeJobs: () => void;
}

// Sample initial jobs data - Only Pune locations
const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    title: 'Store Assistant',
    description: 'Looking for a store assistant to help with daily operations.',
    businessName: 'Super Mart',
    ownerId: 'owner1',
    location: 'Karve Nagar',
    workType: 'full-time',
    salary: { amount: 15000, period: 'month' },
    requirements: ['Retail', 'Customer Service'],
    status: 'open',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Restaurant Server',
    description: 'Experienced server needed for busy restaurant.',
    businessName: 'Tasty Bites',
    ownerId: 'owner2',
    location: 'Kothrud',
    workType: 'part-time',
    salary: { amount: 300, period: 'day' },
    requirements: ['Restaurant Service', 'Customer Service'],
    status: 'open',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Data Entry Operator',
    description: 'Data entry operator needed for office work.',
    businessName: 'Data Solutions',
    ownerId: 'owner3',
    location: 'Deccan',
    workType: 'part-time',
    salary: { amount: 12000, period: 'month' },
    requirements: ['Typing Skills', 'MS Excel'],
    status: 'open',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Office Assistant',
    description: 'Office assistant needed for administrative tasks.',
    businessName: 'Tech Corp',
    ownerId: 'owner4',
    location: 'Hinjewadi',
    workType: 'full-time',
    salary: { amount: 18000, period: 'month' },
    requirements: ['MS Office', 'Communication Skills'],
    status: 'open',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Security Guard',
    description: 'Security guard needed for night shift.',
    businessName: 'Secure Solutions',
    ownerId: 'owner5',
    location: 'Shivaji Nagar',
    workType: 'full-time',
    salary: { amount: 16000, period: 'month' },
    requirements: ['Security Experience', 'Physical Fitness'],
    status: 'open',
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Cook',
    description: 'Experienced cook needed for restaurant.',
    businessName: 'Food Paradise',
    ownerId: 'owner6',
    location: 'Kothrud',
    workType: 'full-time',
    salary: { amount: 25000, period: 'month' },
    requirements: ['Cooking Experience', 'Food Safety'],
    status: 'open',
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Sales Associate',
    description: 'Sales associate needed for retail store.',
    businessName: 'Fashion Hub',
    ownerId: 'owner7',
    location: 'Deccan',
    workType: 'full-time',
    salary: { amount: 17000, period: 'month' },
    requirements: ['Sales Experience', 'Customer Service'],
    status: 'open',
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Software Developer',
    description: 'Software developer needed for IT company.',
    businessName: 'Tech Solutions',
    ownerId: 'owner8',
    location: 'Hinjewadi',
    workType: 'full-time',
    salary: { amount: 45000, period: 'month' },
    requirements: ['JavaScript', 'React'],
    status: 'open',
    createdAt: new Date().toISOString(),
  },
  {
    id: '9',
    title: 'Warehouse Worker',
    description: 'Warehouse worker needed for inventory management.',
    businessName: 'Logistics Pro',
    ownerId: 'owner9',
    location: 'Hadapsar',
    workType: 'full-time',
    salary: { amount: 16000, period: 'month' },
    requirements: ['Physical Fitness', 'Inventory Management'],
    status: 'open',
    createdAt: new Date().toISOString(),
  },
  {
    id: '10',
    title: 'Receptionist',
    description: 'Receptionist needed for corporate office.',
    businessName: 'Business Center',
    ownerId: 'owner10',
    location: 'Baner',
    workType: 'full-time',
    salary: { amount: 18000, period: 'month' },
    requirements: ['Communication Skills', 'Computer Knowledge'],
    status: 'open',
    createdAt: new Date().toISOString(),
  }
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