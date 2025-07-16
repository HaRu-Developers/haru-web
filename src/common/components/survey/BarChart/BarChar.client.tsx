'use client';

import { useEffect, useRef } from 'react';

import { BarController, BarElement, CategoryScale, Chart, LinearScale, Tooltip } from 'chart.js';

import ChartContainer from '@common/components/survey/ChartContainer/ChartContainer.server';

import type { BarChartProps } from './BarChart.types';
import createChartConfig from './bar-chart-config';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, BarController);

const BarChart = ({ data, title }: BarChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const calculatedHeight = data.labels.length * 32 + 16;

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const gradient = ctx.createLinearGradient(0, 0, chartRef.current.width, 0);
    gradient.addColorStop(0, 'rgba(230, 87, 135, 0.7)');
    gradient.addColorStop(1, '#E65787');

    const config = createChartConfig(data, gradient);
    chartInstanceRef.current = new Chart(ctx, config);

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [data]);

  return (
    <ChartContainer title={title}>
      <div className="flex w-full items-start" style={{ height: `${calculatedHeight / 16}rem` }}>
        <canvas ref={chartRef} />
      </div>
    </ChartContainer>
  );
};

export default BarChart;
