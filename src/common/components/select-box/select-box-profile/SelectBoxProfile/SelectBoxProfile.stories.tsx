import type { Meta, StoryObj } from '@storybook/nextjs';

import SelectBoxProfile from './SelectBoxProfile.server';

const meta: Meta<typeof SelectBoxProfile> = {
  title: 'Components/select-box/SelectBoxProfile',
  component: SelectBoxProfile,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SelectBoxProfile>;

export const Default: Story = {
  args: {
    profile: {
      imagePath: '/assets/images/profileImage.jpg',
      name: 'UMC 8기 운영진',
      email: 'tngh9509@gmail.com',
    },
    workspaces: [
      { id: 'ws1', name: 'UMC 8기 운영진' },
      { id: 'ws2', name: 'Team Haru' },
      { id: 'ws3', name: '멋쟁이사자처럼 11기' },
      { id: 'ws4', name: '구름톤 유니브 6기' },
      { id: 'ws5', name: '구름톤 유니브 7기' },
      { id: 'ws6', name: '구름톤 유니브 8기' },
    ],
  },
};
