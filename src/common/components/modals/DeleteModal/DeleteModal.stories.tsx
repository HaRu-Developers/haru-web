import { Meta, StoryObj } from '@storybook/nextjs';

import DeleteModal from './DeleteModal.client';
import { DeleteModalType } from './DeleteModal.types';

const meta: Meta<typeof DeleteModal> = {
  title: 'Components/Modals/DeleteModal',
  component: DeleteModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    deleteModalType: {
      control: { type: 'select' },
      options: Object.values(DeleteModalType),
    },
    onClose: { action: 'onClose' },
    onAbort: { action: 'onAbort' },
    onProceed: { action: 'onProceed' },
  },
};
export default meta;

type Story = StoryObj<typeof DeleteModal>;

export const DeleteReport: Story = {
  args: {
    deleteModalType: DeleteModalType.DELETE_REPORT,
    onClose: () => {},
    onAbort: () => {},
    onProceed: () => {},
  },
};

export const DeleteMeetingMinutes: Story = {
  args: {
    deleteModalType: DeleteModalType.DELETE_MEETING_MINUTES,
    onClose: () => {},
    onAbort: () => {},
    onProceed: () => {},
  },
};

export const DeleteEvent: Story = {
  args: {
    deleteModalType: DeleteModalType.DELETE_EVENT,
    onClose: () => {},
    onAbort: () => {},
    onProceed: () => {},
  },
};

export const LeaveMeetingRecord: Story = {
  args: {
    deleteModalType: DeleteModalType.LEAVE_MEETING_RECORD,
    onClose: () => {},
    onAbort: () => {},
    onProceed: () => {},
  },
};

export const ConnectInstagramAccount: Story = {
  args: {
    deleteModalType: DeleteModalType.CONNECT_INSTAGRAM_ACCOUNT,
    onClose: () => {},
    onAbort: () => {},
    onProceed: () => {},
  },
};
