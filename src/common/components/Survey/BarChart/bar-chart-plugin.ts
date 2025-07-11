import type { Plugin } from 'chart.js';

import type { BarData } from './BarChart.types';

/**
 * 막대 오른쪽에 데이터 레이블을 그리는 커스텀 플러그인을 생성합니다.
 */
const createBarDataLabelsPlugin = (data: BarData): Plugin => {
  return {
    id: 'barDataLabels',
    afterDatasetsDraw: (chart) => {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);
      const total = data.values.reduce((a, b) => a + b, 0);

      meta.data.forEach((bar, index) => {
        const value = data.values[index];
        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
        const { x, y } = bar.getProps(['x', 'y'], true);

        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';

        ctx.font = '600 14px Pretendard'; // Chart.js의 CanvasRenderingContext2D에서 사용하는 ctx.font는 px 만 인식 pxr 및 rem 인식 X
        ctx.fillStyle = '#111';
        const valueText = value.toString();
        ctx.fillText(valueText, x + 10, y);

        const valueWidth = ctx.measureText(valueText).width;

        ctx.font = '400 12px Pretendard'; // Chart.js의 CanvasRenderingContext2D에서 사용하는 ctx.font는 px 만 인식 pxr 및 rem 인식 X
        ctx.fillStyle = '#767676';
        const percentageText = ` ${percentage}%`;
        ctx.fillText(percentageText, x + 10 + valueWidth, y);
      });
    },
  };
};

export default createBarDataLabelsPlugin;
