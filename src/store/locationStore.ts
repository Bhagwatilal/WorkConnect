import { create } from 'zustand';
import { LocationState } from '../types/location';

export const useLocationStore = create<LocationState>((set) => ({
  selectedArea: '',
  selectedSubArea: '',
  setLocation: (area: string, subArea: string) => 
    set({ selectedArea: area, selectedSubArea: subArea }),
}));