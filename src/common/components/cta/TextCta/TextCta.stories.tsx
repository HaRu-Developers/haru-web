import type { Meta, StoryObj } from '@storybook/nextjs';

import TextCta from './TextCta.client';
import { TextCtaType } from './TextCta.types';

const meta: Meta<typeof TextCta> = {
  title: 'Component/TextCta',
  component: TextCta,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TextCta>;

export const AiMeeting: Story = {
  args: {
    type: TextCtaType.AI_MEETING_MANAGER,
    onClick: () => alert('AI 회의 클릭'),
  },
};

export const SnsEvent: Story = {
  args: {
    type: TextCtaType.SNS_EVENT_ASSISTANT,
    onClick: () => alert('SNS 이벤트 클릭'),
  },
};

export const TeamTracker: Story = {
  args: {
    type: TextCtaType.TEAM_MOOD_TRACKER,
    onClick: () => alert('팀 트래커 클릭'),
  },
};
