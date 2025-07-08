import type { Meta, StoryObj } from '@storybook/nextjs';

import { RightTabType } from '@features/ai-meeting-manager/constants/tabs';

import RightTab from './RightTab.client';

const meta: Meta<typeof RightTab> = {
  title: 'Components/ai-meeting-manager/tabs/RightTab',
  component: RightTab,
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: 'radio',
      options: Object.values(RightTabType),
      description: '현재 선택된 탭',
    },
  },
};

export default meta;

type Story = StoryObj<typeof RightTab>;

export const Default: Story = {
  args: {
    current: RightTabType.AI_QUESTIONS,
  },
};
