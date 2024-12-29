export interface Location {
  area: string;
  subArea: string;
}

export interface LocationState {
  selectedArea: string;
  selectedSubArea: string;
  setLocation: (area: string, subArea: string) => void;
}