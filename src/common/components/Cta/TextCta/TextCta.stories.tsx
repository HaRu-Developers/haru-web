import type { Meta, StoryObj } from '@storybook/nextjs';

import TextCta from './TextCta';
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
    type: TextCtaType.AI_MEETING,
    onClick: () => alert('AI 회의 클릭'),
  },
};

export const SnsEvent: Story = {
  args: {
    type: TextCtaType.SNS_EVENT,
    onClick: () => alert('SNS 이벤트 클릭'),
  },
};

export const TeamTracker: Story = {
  args: {
    type: TextCtaType.TEAM_TRACKER,
    onClick: () => alert('팀 트래커 클릭'),
  },
};
