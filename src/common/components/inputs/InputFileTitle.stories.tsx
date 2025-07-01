import { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from '@storybook/test';

import InputFileTitle from '@common/components/inputs/InputFileTitle';

const meta: Meta<typeof InputFileTitle> = {
  title: 'Components/InputFileTitle',
  component: InputFileTitle,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: {
        type: 'select',
      },
      options: ['default', 'hover', 'editable'],
      description: '상태 모드',
    },
    value: {
      control: 'text',
      description: '표시되거나 수정될 파일 이름',
    },
    onSave: {
      action: 'saved',
      description: '값이 저장될 때 호출되는 콜백 함수',
    },
    onCancel: {
      action: 'canceled',
      description: '수정이 취소될 때 호출되는 콜백 함수',
    },
  },
  args: {
    value: 'UMC 8기 운영진 회의',
    onSave: fn(),
    onCancel: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof InputFileTitle>;

export const Default: Story = {
  args: {
    mode: 'default',
  },
};

export const Hover: Story = {
  args: {
    mode: 'hover',
  },
};

export const Editable: Story = {
  args: {
    mode: 'editable',
  },
};
