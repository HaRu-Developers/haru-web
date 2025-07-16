import type { Meta, StoryObj } from '@storybook/nextjs';

import ListFileSnsEventAssistentLink from './ListFileSnsEventAssistantLink.client';

const meta: Meta<typeof ListFileSnsEventAssistentLink> = {
  title: 'ListFile/ListFileSnsEventAssistentLink',
  component: ListFileSnsEventAssistentLink,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListFileSnsEventAssistentLink>;

export const Default: Story = {
  args: {
    snsEventId: 123,
    title: '7월 인스타그램 SNS 이벤트',
    updatedAt: '2025.07.09',
    snsLink: 'https://www.instagram.com/p/DHSN1tIPXT1/.com/event123',
  },
};
