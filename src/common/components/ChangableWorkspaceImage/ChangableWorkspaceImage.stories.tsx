import { Meta, StoryObj } from '@storybook/nextjs';

import ChangableWorkspaceImage from './ChangableWorkspaceImage.client';

const meta: Meta<typeof ChangableWorkspaceImage> = {
  title: 'Components/ChangableWorkspaceImage',
  component: ChangableWorkspaceImage,
  tags: ['autodocs'],
  argTypes: {
    onFileChange: { action: 'fileChanged' },
  },
};

export default meta;
type Story = StoryObj<typeof ChangableWorkspaceImage>;

export const Default: Story = {
  args: {
    title: '워크스페이스',
    initialPreview: '/assets/images/profileImage.jpg',
  },
};

export const WithNullInitialPreview: Story = {
  args: {
    title: '마이 팀',
    initialPreview: null,
  },
};
