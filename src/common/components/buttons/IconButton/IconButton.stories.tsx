import type { Meta, StoryObj } from '@storybook/nextjs';

import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';

import IconButton from './IconButton.client';

const meta: Meta<typeof IconButton> = {
  title: 'Components/buttons/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
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
    // children은  JSX로 넣어야 해서 Storybook Controls에서는 조작 불가 – 숨기기
    children: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    ariaLabel: '복사 버튼',
    className: '',
    children: <FeatureTabIcons state={FeatureTabIconsState.COPY} />,
  },
};
