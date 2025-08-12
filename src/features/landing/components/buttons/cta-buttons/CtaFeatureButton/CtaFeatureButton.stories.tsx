import { Meta, StoryObj } from '@storybook/nextjs';

import CtaFeatureButton from '@features/landing/components/buttons/cta-buttons/CtaFeatureButton/CtaFeatureButton.client';

const meta: Meta<typeof CtaFeatureButton> = {
  title: 'features/CtaButtons/CtaFeatureButton',
  component: CtaFeatureButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CtaFeatureButton>;

export const AiMeetings: Story = {
  args: {
    name: 'AI 회의 진행 매니저 경험해 보기',
    onClick: () => console.log('AI Meetings clicked'),
  },
};

export const Events: Story = {
  args: {
    name: 'SNS 이벤트 어시스턴트 경험해 보기',
    onClick: () => console.log('Events clicked'),
  },
};

export const MoodTracker: Story = {
  args: {
    name: '팀 분위기 트래커 경험해 보기',
    onClick: () => console.log('Mood Trackers clicked'),
  },
};
