import type { Meta, StoryObj } from '@storybook/nextjs';

import AiQuestionCard from './AiQuestionCard.client';

const meta: Meta<typeof AiQuestionCard> = {
  title: 'Component/AiQuestionCard',
  component: AiQuestionCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AiQuestionCard>;

export const RecommendFromUserStatement: Story = {
  name: 'AI 추천 질문 - 화자 발화 기반',
  args: {
    userAnswer: '그럼 회비는 인당 25,000원으로 가정하고, 예산 구조를 항목별로 나눠봅니다.',
    aiRecommendQuestion:
      '해당 금액에 밥값 외에 음료까지 포함되는 건가요? 아니면 순수 식사만 기준인가요?',
  },
};

export const AnotherRecommendation: Story = {
  name: 'AI 추천 질문 - 발화 문맥 이해 예시',
  args: {
    userAnswer: '좋아. 회비 예산이 320,000원이니까 잘 생각해서 산정해야 할 것 같네.',
    aiRecommendQuestion: '해당 예산에 장소 대여료도 포함되어 있는 건가요?',
  },
};

export const LongStatementExample: Story = {
  name: 'AI 추천 질문 - 긴 화자 발화 기반',
  args: {
    userAnswer:
      '이번 회의에서는 작년과 달리 장소 예약비, 식사, 음료까지 모두 포함하여 전체 예산을 정해야 할 것 같아요.',
    aiRecommendQuestion: '작년에는 어떤 기준으로 예산을 산정했었나요?',
  },
};
