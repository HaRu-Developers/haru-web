import type { Meta, StoryObj } from '@storybook/nextjs';

import { FileType } from '@common/types/file-type.enum';

import TextCta from './TextCta.client';

const meta: Meta<typeof TextCta> = {
  title: 'Component/TextCta',
  component: TextCta,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TextCta>;

export const AiMeeting: Story = {
  args: {
    type: FileType.AI_MEETING_MANAGER,
    onClick: () => alert('AI 회의 클릭'),
  },
};

export const SnsEvent: Story = {
  args: {
    type: FileType.SNS_EVENT_ASSISTANT,
    onClick: () => alert('SNS 이벤트 클릭'),
  },
};

export const TeamTracker: Story = {
  args: {
    type: FileType.TEAM_MOOD_TRACKER,
    onClick: () => alert('팀 트래커 클릭'),
  },
};
