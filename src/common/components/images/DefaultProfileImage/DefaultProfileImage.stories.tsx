import type { Meta, StoryObj } from '@storybook/nextjs';

import { ImageSize } from '../types/images.common.types';
import DefaultProfileImage from './DefaultProfileImage.client';

const meta: Meta<typeof DefaultProfileImage> = {
  title: 'Components/DefaultProfileImage',
  component: DefaultProfileImage,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      defaultValue: '홍길동',
    },
    userId: {
      control: 'text',
      defaultValue: 1,
    },
    color: {
      control: 'color',
      description: '배경색 직접 지정시 사용',
    },
    size: {
      control: 'radio',
      options: ['small', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof DefaultProfileImage>;

export const Default: Story = {
  args: {
    name: '홍길동',
    userId: '1',
  },
};

export const Small: Story = {
  args: {
    name: '김작은',
    userId: '2',
    size: ImageSize.SMALL,
  },
};

export const WithCustomColor: Story = {
  args: {
    name: '김커스텀',
    userId: '1',
    color: '#FFD700',
  },
};

export const DifferentUsers: Story = {
  render: () => (
    <div className="flex gap-2">
      <DefaultProfileImage name="유저A" userId="1" />
      <DefaultProfileImage name="유저B" userId="2" />
      <DefaultProfileImage name="유저C" userId="3" />
      <DefaultProfileImage name="유저A" userId="4" />
      <DefaultProfileImage name="유저B" userId="5" />
      <DefaultProfileImage name="유저C" userId="6" />
      <DefaultProfileImage name="유저C" userId="7" />
    </div>
  ),
};
