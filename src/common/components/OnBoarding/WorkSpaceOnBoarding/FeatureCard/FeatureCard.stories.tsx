import type { Meta, StoryObj } from '@storybook/nextjs';

import { OnboardingIconsState } from '@icons/OnboardingIcons/OnboardingIcons.types';

import FeatureCard from './FeatureCard.server';

const meta: Meta<typeof FeatureCard> = {
  title: 'Onboarding/WorkSpaceOnBoarding/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeatureCard>;

export const Default: Story = {
  args: {
    title: 'Meetings',
    description: 'HaRu와 함께 회의를 진행\n하고, 실시간 질문 추천과\n 회의록까지 받아보세요.',
    icon: OnboardingIconsState.MEETING,
  },
};

export const Events: Story = {
  args: {
    ...Default.args,
    title: 'Events',
    description: 'SNS 이벤트를 등록하고\n 참여자 수집과 추첨까지\n 한 번에 진행하세요.',
    icon: OnboardingIconsState.EVENT,
  },
};

export const MoodTracker: Story = {
  args: {
    ...Default.args,
    title: 'Mood Tracker',
    description: '간단한 설문을 통해\n 팀의 분위기를 한눈에\n 파악해 보세요.',
    icon: OnboardingIconsState.MOOD_TRACKER,
  },
};

export const Calendar: Story = {
  args: {
    ...Default.args,
    title: 'Calendar',
    description: '우리 팀 일정을 한눈에\n 확인하고, 중요한 일정도\n 손쉽게 관리해 보세요.',
    icon: OnboardingIconsState.CALENDAR,
  },
};
