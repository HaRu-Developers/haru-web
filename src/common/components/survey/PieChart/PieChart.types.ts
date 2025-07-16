export interface ChartData {
  labels: string[];
  values: number[];
  colors: string[];
}

export interface PieChartProps {
  data: {
    labels: string[];
    values: number[];
    colors: string[];
  };
  title: string;
}
