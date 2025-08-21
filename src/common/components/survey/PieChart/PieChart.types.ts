export interface ChartData {
  legendLabels: string[];
  legendColors: string[];
  chartLabels: string[];
  chartValues: number[];
  chartColors: string[];
}

// 차트에 실제 그려질 데이터만 포함합니다.
export interface ChartConfigData {
  labels: string[];
  values: number[];
  colors: string[];
}

export interface PieChartProps {
  title: string;
  data: ChartData;
}
