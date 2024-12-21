import { create } from 'zustand';

interface WorkerProfile {
  skills: string[];
  experience: string;
  preferredWorkType: string;
  availability: string;
  education: string;
  languages: string[];
  address: string;
  phone: string;
}

interface WorkerState {
  profile: WorkerProfile | null;
  updateWorkerProfile: (profile: WorkerProfile) => void;
}

export const useWorkerStore = create<WorkerState>((set) => ({
  profile: null,
  updateWorkerProfile: (profile) => set({ profile }),
}));