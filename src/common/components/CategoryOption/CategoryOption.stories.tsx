import type { Meta, StoryObj } from '@storybook/nextjs';

import CategoryOption from './CategoryOption.client';

const meta: Meta<typeof CategoryOption> = {
  title: 'Components/CategoryOption',
  component: CategoryOption,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      defaultValue: '전체',
      description: '표시될 글',
    },
    count: {
      control: 'number',
      defaultValue: 10,
      description: '숫자가 필요하다면 넣기',
    },
    active: {
      control: 'boolean',
      defaultValue: false,
      description: '활성화 상태',
    },
    className: {
      control: 'text',
      description: '추가 스타일링 원할 때 사용',
    },
    ariaLabel: {
      control: 'text',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof CategoryOption>;

export const Default: Story = {
  args: {
    label: 'AI 회의록',
    active: false,
  },
};

export const Active: Story = {
  args: {
    label: 'AI 회의록',
    active: true,
  },
};

export const withCount: Story = {
  args: {
    label: '참여자 수',
    count: 10,
    active: true,
  },
};
