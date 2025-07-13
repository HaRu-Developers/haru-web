import { type Chart, type Plugin } from 'chart.js';

/**
 * @file pie-chart-plugin.ts
 * @description PieChart 외부에 데이터 값과 비율을 그리는 커스텀 플러그인을 생성하는 함수
 */

const createPieDataLabelsPlugin = (): Plugin => ({
  id: 'pieDataLabels',
  afterDatasetsDraw: (chart: Chart) => {
    const { ctx, data: chartData } = chart;
    const meta = chart.getDatasetMeta(0);
    const total = (chartData.datasets[0].data as number[]).reduce((a, b) => a + b, 0);

    meta.data.forEach((element, index) => {
      const { x, y, outerRadius, startAngle, endAngle } = element.getProps(
        ['x', 'y', 'outerRadius', 'startAngle', 'endAngle'],
        true,
      );
      const value = chartData.datasets[0].data[index] as number;
      const percentage = ((value / total) * 100).toFixed(1);

      const midAngle = startAngle + (endAngle - startAngle) / 2;
      const distance = outerRadius + 30;
      const labelX = x + Math.cos(midAngle) * distance;
      const labelY = y + Math.sin(midAngle) * distance;

      ctx.font = '600 14px Pretendard';
      ctx.fillStyle = '#111';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(value.toString(), labelX, labelY - 10);

      ctx.font = '400 12px Pretendard';
      ctx.fillStyle = '#767676';
      ctx.fillText(`${percentage}%`, labelX, labelY + 10);
    });
  },
});

export default createPieDataLabelsPlugin;
