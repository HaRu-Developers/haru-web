import type { ChartConfiguration } from 'chart.js';

import type { BarData } from './BarChart.types';
import createBarDataLabelsPlugin from './bar-chart-plugin';

/**
 * Bar 차트의 전체 설정(Configuration) 객체를 생성합니다.
 */

const createChartConfig = (
  data: BarData,
  backgroundGradient: CanvasGradient,
): ChartConfiguration => {
  const barDataLabelsPlugin = createBarDataLabelsPlugin(data);

  return {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.values,
          backgroundColor: backgroundGradient,
          borderWidth: 0,
          barThickness: 22,
          borderRadius: {
            topRight: 100,
            bottomRight: 100,
          },
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: { right: 80 },
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          grid: { display: false },
          ticks: { display: false },
          // ticks: { font: { size: 14 }, color: '#111' },
          // 이후 왼쪽에 데이터 레이블을 표기할 수 있을 수도 있으니, 주석처리 해두었습니다.
          border: {
            display: true,
            width: 2,
            color: '#d8dadc',
          },
        },
      },
    },
    plugins: [barDataLabelsPlugin],
  };
};

export default createChartConfig;
