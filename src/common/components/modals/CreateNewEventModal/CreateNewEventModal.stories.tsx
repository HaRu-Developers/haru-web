import type { Meta, StoryObj } from '@storybook/nextjs';

import CreateNewEventModal from './CreateNewEventModal.client';

const meta: Meta<typeof CreateNewEventModal> = {
  title: 'Modals/CreateNewEventModal',
  component: CreateNewEventModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CreateNewEventModal>;

export const Default: Story = {
  args: {
    onClose: () => alert('모달 닫기'),
    onNextStep: () => alert('다음 단계'),
  },
};
