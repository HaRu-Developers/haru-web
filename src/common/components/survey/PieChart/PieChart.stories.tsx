import { Meta, StoryObj } from '@storybook/nextjs';

import PieChart from './PieChart.client';

const meta: Meta<typeof PieChart> = {
  title: 'Charts/PieChart',
  component: PieChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '현재의 팀 환경에 대해 어떻게 생각하시나요?',
    data: {
      labels: ['불만 많음', '별 생각 없음', '좋음'],
      values: [32, 22, 4],
      colors: ['#E991A3', '#7FC4A5', '#9B9FD1'],
    },
  },
};

export const FewData: Story = {
  args: {
    title: '선호하는 계절은?',
    data: {
      labels: ['여름', '겨울'],
      values: [68, 32],
      colors: ['#FF6384', '#36A2EB'],
    },
  },
};

export const ManyData: Story = {
  args: {
    title: '가장 선호하는 과일은?',
    data: {
      labels: ['사과', '바나나', '딸기', '오렌지', '포도'],
      values: [25, 20, 30, 15, 10],
      colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    },
  },
};
