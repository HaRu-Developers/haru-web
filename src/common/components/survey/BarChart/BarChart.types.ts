export interface BarData {
  labels: string[];
  values: number[];
}

export interface BarChartProps {
  data: BarData;
  title: string;
}
