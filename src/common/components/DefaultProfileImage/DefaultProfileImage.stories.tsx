import type { Meta, StoryObj } from '@storybook/nextjs';

import DefaultProfileImage from './DefaultProfileImage.server';

const meta: Meta<typeof DefaultProfileImage> = {
  title: 'Components/DefaultProfileImage',
  component: DefaultProfileImage,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: '사용자 이름',
    },
    color: {
      control: 'color',
      description: '배경색 (선택)',
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'large'],
      description: '크기',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DefaultProfileImage>;

export const Default: Story = {
  args: {
    name: '수호',
    color: '#E683A6',
    size: 'large',
  },
};
