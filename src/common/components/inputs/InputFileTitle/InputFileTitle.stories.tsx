import { Meta, StoryObj } from '@storybook/nextjs';

import InputFileTitle from '@common/components/inputs/InputFileTitle/InputFileTitle.client';

import { InputFileTitleMode } from './InputFileTitle.types';

const meta: Meta<typeof InputFileTitle> = {
  title: 'Components/InputFileTitle',
  component: InputFileTitle,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InputFileTitle>;

export const Default: Story = {
  args: {
    mode: InputFileTitleMode.DEFAULT,
  },
};

export const Hover: Story = {
  args: {
    mode: InputFileTitleMode.HOVER, // 명시적으로만 사용
  },
};

export const Editable: Story = {
  args: {
    mode: InputFileTitleMode.EDITABLE,
  },
};
