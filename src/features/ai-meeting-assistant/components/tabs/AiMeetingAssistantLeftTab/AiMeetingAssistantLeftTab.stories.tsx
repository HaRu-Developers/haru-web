import type { Meta, StoryObj } from '@storybook/nextjs';

import { AiMeetingAssistantLeftTabType } from '@features/ai-meeting-assistant/constants/tabs';

import AiMeetingAssistantLeftTab from './AiMeetingAssistantLeftTab.client';

const meta: Meta<typeof AiMeetingAssistantLeftTab> = {
  title: 'Components/ai-meeting-assistant/tabs/AiMeetingAssistantLeftTab',
  component: AiMeetingAssistantLeftTab,
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: 'radio',
      options: Object.values(AiMeetingAssistantLeftTabType),
      description: '현재 선택된 탭',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AiMeetingAssistantLeftTab>;

export const Default: Story = {
  args: {
    current: AiMeetingAssistantLeftTabType.AiNotes,
  },
};
