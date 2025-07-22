import type { Meta, StoryObj } from '@storybook/nextjs';

import CreateMeetingMinutesModal from './CreateMeetingMinutesModal.client';

const meta: Meta<typeof CreateMeetingMinutesModal> = {
  title: 'Modals/새로운 회의록 생성',
  component: CreateMeetingMinutesModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CreateMeetingMinutesModal>;

export const Default: Story = {
  render: (args) => {
    return (
      <CreateMeetingMinutesModal
        {...args}
        onClose={() => {}}
        onNextStep={() => alert('다음 단계로 이동')}
      />
    );
  },
};
