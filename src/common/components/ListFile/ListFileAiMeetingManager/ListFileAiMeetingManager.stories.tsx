import type { Meta, StoryObj } from '@storybook/nextjs';

import ListFileAiMeetingManager from './ListFileAiMeetingManager.client';

const meta: Meta<typeof ListFileAiMeetingManager> = {
  title: 'ListFile/AiMeetingManager',
  component: ListFileAiMeetingManager,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListFileAiMeetingManager>;

export const Default: Story = {
  args: {
    meetingId: 1,
    title: '6월 회의 기록 - AI 회의 매니저',
    updatedAt: '2025.07.09',
  },
};
