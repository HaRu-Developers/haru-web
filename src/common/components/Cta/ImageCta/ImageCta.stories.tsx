import type { Meta, StoryObj } from '@storybook/nextjs';

import ImageCta from './ImageCta.client';
import { ImageCtaType } from './ImageCta.types';

const meta: Meta<typeof ImageCta> = {
  title: 'Component/ImageCta',
  component: ImageCta,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ImageCta>;

const handleClick = (label: string) => () => alert(`${label} 클릭됨`);

export const AiMeeting: Story = {
  args: {
    type: ImageCtaType.AI_MEETING_MANAGER,
    onClick: handleClick('AI 회의 진행 매니저'),
  },
};

export const SnsEvent: Story = {
  args: {
    type: ImageCtaType.SNS_EVENT_ASSISTANT,
    onClick: handleClick('SNS 이벤트 어시스턴트'),
  },
};

export const TeamTracker: Story = {
  args: {
    type: ImageCtaType.TEAM_MOOD_TRACKER,
    onClick: handleClick('팀 분위기 트래커'),
  },
};
