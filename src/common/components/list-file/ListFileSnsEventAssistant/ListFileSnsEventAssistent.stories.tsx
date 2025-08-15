import type { Meta, StoryObj } from '@storybook/nextjs';

import ListFileSnsEventAssistent from './ListFileSnsEventAssistant.client';

const meta: Meta<typeof ListFileSnsEventAssistent> = {
  title: 'ListFile/SnsEventAssistent',
  component: ListFileSnsEventAssistent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListFileSnsEventAssistent>;

export const Default: Story = {
  args: {
    snsEventId: '1',
    title: '7월 인스타그램 SNS 이벤트',
    updatedAt: new Date('2025.07.09'),
    participantCount: 314,
    winnerCount: 10,
  },
};
