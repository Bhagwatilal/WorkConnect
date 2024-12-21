import { create } from 'zustand';

interface JobApplication {
  id: string;
  jobId: string;
  workerId: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
  coverLetter: string;
  availability: string;
  expectedSalary: string;
  startDate: string;
  references?: string;
}

interface JobApplicationState {
  applications: JobApplication[];
  addApplication: (application: JobApplication) => void;
  updateApplication: (id: string, status: JobApplication['status']) => void;
  getApplicationsByWorker: (workerId: string) => JobApplication[];
  getApplicationsByJob: (jobId: string) => JobApplication[];
}

export const useJobApplicationStore = create<JobApplicationState>((set, get) => ({
  applications: [],
  addApplication: (application) =>
    set((state) => ({
      applications: [...state.applications, application],
    })),
  updateApplication: (id, status) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === id ? { ...app, status } : app
      ),
    })),
  getApplicationsByWorker: (workerId) => 
    get().applications.filter(app => app.workerId === workerId),
  getApplicationsByJob: (jobId) =>
    get().applications.filter(app => app.jobId === jobId),
}));