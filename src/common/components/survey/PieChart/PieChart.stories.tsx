import type { Meta, StoryObj } from '@storybook/nextjs';

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
      legendLabels: ['불만 많음', '별 생각 없음', '좋음'],
      legendColors: ['#E991A3', '#7FC4A5', '#9B9FD1'],
      chartLabels: ['불만 많음', '별 생각 없음', '좋음'],
      chartValues: [32, 22, 4],
      chartColors: ['#E991A3', '#7FC4A5', '#9B9FD1'],
    },
  },
};

export const FewData: Story = {
  args: {
    title: '선호하는 계절은?',
    data: {
      legendLabels: ['여름', '겨울'],
      legendColors: ['#FF6384', '#36A2EB'],
      chartLabels: ['여름', '겨울'],
      chartValues: [68, 32],
      chartColors: ['#FF6384', '#36A2EB'],
    },
  },
};

export const ManyData: Story = {
  args: {
    title: '가장 선호하는 과일은?',
    data: {
      legendLabels: ['사과', '바나나', '딸기', '오렌지', '포도'],
      legendColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      chartLabels: ['사과', '바나나', '딸기', '오렌지', '포도'],
      chartValues: [25, 20, 30, 15, 10],
      chartColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    },
  },
};

// 0 값을 포함하는 데이터 스토리
// 이 스토리를 통해 '주스'는 범례에만 표시되고, 차트에는 그려지지 않는 것을 확인할 수 있습니다.
export const WithZeroValue: Story = {
  args: {
    title: '선호하는 음료는? (0값 포함)',
    data: {
      legendLabels: ['커피', '차', '주스', '물'],
      legendColors: ['#A67C52', '#7FC4A5', '#FFCE56', '#36A2EB'],
      chartLabels: ['커피', '차', '물'],
      chartValues: [45, 15, 20],
      chartColors: ['#A67C52', '#7FC4A5', '#36A2EB'],
    },
  },
};
