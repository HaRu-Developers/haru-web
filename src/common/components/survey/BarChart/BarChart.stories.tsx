import { Meta, StoryObj } from '@storybook/nextjs';

import BarChart from './BarChar.client';

const meta: Meta<typeof BarChart> = {
  title: 'Charts/BarChart',
  component: BarChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '가장 선호하는 프로그래밍 언어는?',
    data: {
      labels: ['JavaScript', 'Python', 'TypeScript'],
      values: [300, 30, 25],
    },
  },
};

export const ManyBars: Story = {
  args: {
    title: '부서별 프로젝트 진행률 (%)',
    data: {
      labels: ['영업팀', '마케팅팀', '개발1팀', '개발2팀', '디자인팀', '인사팀'],
      values: [88, 72, 95, 85, 60, 100],
    },
  },
};
