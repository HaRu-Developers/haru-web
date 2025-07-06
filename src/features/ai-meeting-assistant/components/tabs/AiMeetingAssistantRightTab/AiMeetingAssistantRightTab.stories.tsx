import type { Meta, StoryObj } from '@storybook/nextjs';

import { AiMeetingAssistantRightTabType } from '@features/ai-meeting-assistant/constants/tabs';

import AiMeetingAssistantRightTab from './AiMeetingAssistantRightTab.client';

const meta: Meta<typeof AiMeetingAssistantRightTab> = {
  title: 'Components/ai-meeting-assistant/tabs/AiMeetingAssistantRightTab',
  component: AiMeetingAssistantRightTab,
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: 'radio',
      options: Object.values(AiMeetingAssistantRightTabType),
      description: '현재 선택된 탭',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AiMeetingAssistantRightTab>;

export const Default: Story = {
  args: {
    current: AiMeetingAssistantRightTabType.AiQuestions,
  },
};
