import type { Meta, StoryObj } from '@storybook/nextjs';

import ImageCta from './ImageCta';
import { ImageCtaType } from './ImageCta.types';

const meta: Meta<typeof ImageCta> = {
  title: 'Component/ImageCTA',
  component: ImageCta,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ImageCta>;

export const AiMeeting: Story = {
  args: {
    type: ImageCtaType.AI_MEETING,
    onClick: () => alert('AI 회의 진행 매니저 클릭'),
  },
};

export const SnsEvent: Story = {
  args: {
    type: ImageCtaType.SNS_EVENT,
    onClick: () => alert('SNS 이벤트 어시스턴트 클릭'),
  },
};

export const TeamTracker: Story = {
  args: {
    type: ImageCtaType.TEAM_TRACKER,
    onClick: () => alert('팀 분위기 트래커 클릭'),
  },
};
