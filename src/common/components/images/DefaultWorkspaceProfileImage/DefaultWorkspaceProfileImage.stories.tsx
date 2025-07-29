import type { Meta, StoryObj } from '@storybook/nextjs';

import DefaultWorkspaceProfileImage from './DefaultWorkspaceProfileImage.client';

const meta: Meta<typeof DefaultWorkspaceProfileImage> = {
  title: 'Components/DefaultWorkspaceProfileImage',
  component: DefaultWorkspaceProfileImage,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'UMC 회의',
    },
    workspaceId: {
      control: 'text',
      defaultValue: '1n',
    },
    color: {
      control: 'color',
      description: '배경색 직접 지정시 사용',
    },
    className: {
      ontrol: 'text',
      description: '이미지 크기, 추가 스타일링시 사용',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DefaultWorkspaceProfileImage>;

export const Default: Story = {
  args: {
    title: '멋사 11기',
    workspaceId: '1n',
  },
};

export const WithCustomColor: Story = {
  args: {
    title: '멋사 11기',
    workspaceId: '1n',
    color: '#FFD700',
  },
};

export const WithCustomStyle: Story = {
  args: {
    title: '멋사 11기',
    workspaceId: '1n',
    className: 'w-14 h-14 shrink-0',
  },
};
