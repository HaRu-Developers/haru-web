import { type ChartConfiguration } from 'chart.js';

import { ChartData } from './PieChart.types';
import createPieDataLabelsPlugin from './pie-chart-plugin';

/**
 * PieChart의 설정 객체를 반환합니다.
 * @param data - 차트에 표시할 데이터
 * @returns {ChartConfiguration} Chart.js 설정 객체
 */

const getPieChartConfig = (data: ChartData): ChartConfiguration => {
  const pieDataLabelsPlugin = createPieDataLabelsPlugin();

  return {
    type: 'pie',
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.values,
          backgroundColor: data.colors,
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: { top: 50, right: 20, bottom: 20, left: 20 },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed;
              const total = (context.chart.data.datasets[0].data as number[]).reduce(
                (a, b) => a + b,
                0,
              );
              const percentage = ((value / total) * 100).toFixed(1);
              return ` ${label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
    },

    plugins: [pieDataLabelsPlugin],
  };
};

export default getPieChartConfig;
