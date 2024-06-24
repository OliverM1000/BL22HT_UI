export interface FrameData {
  _id: string;
  tag: string;
  user: string;
  committed: boolean;
  description: string;
  created: string;
  received: string;
  dataAvailable: boolean;
  samplePlateL: PlateData;
  samplePlateR: PlateData;
}

export interface PlateData {
  _id: string;
  sampleFrame: string;
  type: number;
  samples: SampleData[];
}

export interface SampleData {
  _id: string;
  samplePlate: string;
  description: string;
  position: string;
  scanSetups: ScanData[];
}

export interface ScanData {
  _id: string;
  sample: string;
  element: string;
  edge: string;
  range: string;
  setup: string;
  sweeps: number;
}
