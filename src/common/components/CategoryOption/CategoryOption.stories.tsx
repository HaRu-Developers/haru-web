import type { Meta, StoryObj } from '@storybook/nextjs';

import CategoryOption from './CategoryOption.client';

const meta: Meta<typeof CategoryOption> = {
  title: 'Components/CategoryOption',
  component: CategoryOption,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '표시될 레이블',
    },
    count: {
      control: 'number',
      description: '표시될 숫자 (선택)',
    },
    active: {
      control: 'boolean',
      description: '활성화 여부 (선택)',
    },
    onClick: {
      description: '클릭 이벤트 핸들러 (선택)',
      action: 'clicked',
    },
    className: {
      control: 'text',
      description: 'Tailwind 스타일 클래스 (선택)',
    },
    ariaLabel: {
      control: 'text',
      description: '접근성을 위한 설명 (선택)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CategoryOption>;

export const Default: Story = {
  args: {
    label: '참여자 리스트',
    count: 20,
    active: false,
    ariaLabel: '참여자 리스트 카테고리',
    className: '',
  },
};
