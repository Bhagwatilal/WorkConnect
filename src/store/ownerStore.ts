import { create } from 'zustand';

interface OwnerProfile {
  businessName: string;
  businessType: string;
  location: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  workingHours: string;
}

interface OwnerState {
  profile: OwnerProfile | null;
  updateOwnerProfile: (profile: OwnerProfile) => void;
}

export const useOwnerStore = create<OwnerState>((set) => ({
  profile: null,
  updateOwnerProfile: (profile) => set({ profile }),
}));