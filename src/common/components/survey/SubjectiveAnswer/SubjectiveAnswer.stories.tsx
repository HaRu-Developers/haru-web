import { Meta, StoryObj } from '@storybook/nextjs';

import SubjectiveAnswers from './SubjectiveAnswser.server';

const meta: Meta<typeof SubjectiveAnswers> = {
  title: 'Survey/SubjectiveAnswers',
  component: SubjectiveAnswers,
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
    answers: ['아주 재밌게 보냈다.', '배울 점이 많아서 좋았다.', '협업의 경험이 좋았다.'],
  },
};

export const SixAnswers: Story = {
  args: {
    title: '현재의 팀 환경에 대해 어떻게 생각하시나요?',
    answers: [
      '아주 재밌게 보냈다.',
      '배울 점이 많아서 좋았다.',
      '협업의 경험이 좋았다.',
      '서로 존중하는 문화가 좋았다.',
      '자유롭게 의견을 낼 수 있었다.',
      '성장할 수 있는 기회가 많았다.',
    ],
  },
};
