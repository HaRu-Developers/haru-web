import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import InputFieldModal from './InputFieldModal.client';

const meta: Meta<typeof InputFieldModal> = {
  title: 'Common/Inputs/Modals/InputFieldModal',
  component: InputFieldModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InputFieldModal>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <InputFieldModal {...args} value={value} onChange={setValue} />;
  },
  args: {
    title: '이름 입력',
    placeholder: '이름을 입력하세요',
  },
};

export const WithInitialValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('홍길동');
    return <InputFieldModal {...args} value={value} onChange={setValue} />;
  },
  args: {
    title: '이름 입력',
    placeholder: '이름을 입력하세요',
  },
};
