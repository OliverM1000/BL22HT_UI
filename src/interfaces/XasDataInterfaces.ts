import { ScanData, SampleData } from "./FrameDataInterfaces";

export interface XasData {
  sample: SampleData;
  scanSetup: ScanData;

  encoderResolution: number;
  encoderOffset: number;
  latticeSpacing: number;

  adcOffset1: number;
  adcOffset2: number;
  adcOffset3: number;
  adcOffset4: number;

  encoder: number[];
  energy: number[];
  adc1: number[];
  adc2: number[];
  adc3: number[];
  adc4: number[];
  time: number[];
  gate: number[];
}

export interface DataPoint {
  x: number;
  y: number;
}

export interface Data {
  type: string;
  dataPoints: DataPoint[];
}

export interface AxisOption {
  title: string;
  lineThickness: number;
  gridColor: string;
  gridDashType: string;
  gridThickness: number;
  tickColor: string;
  tickLength: number;
  tickThickness: number;
}

export interface ChartOptions {
  theme: string;
  animationEnabled: boolean;
  zoomEnabled: boolean;
  title: {
    text: string;
    fontSize: number;
    fontFamily: string;
  };
  axisX: AxisOption;
  axisY: AxisOption;
  data: Data[];
}
