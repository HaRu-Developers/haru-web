import type { Meta, StoryObj } from '@storybook/nextjs';

import { RightTabType } from '@features/ai-meeting-manager/constants/tabs';

import RightTab from './RightTab.client';

const meta: Meta<typeof RightTab> = {
  title: 'Components/ai-meeting-manager/tabs/RightTab',
  component: RightTab,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RightTab>;

export const AIQuestionsTab: Story = {
  args: {
    current: RightTabType.AI_QUESTIONS,
  },
};

export const AIRecommendationsTab: Story = {
  args: {
    current: RightTabType.AI_RECOMMENDATIONS,
  },
};
