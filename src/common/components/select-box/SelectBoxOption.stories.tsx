import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/nextjs';

import SelectBoxOption from './SelectBoxOption';

const meta: Meta<typeof SelectBoxOption> = {
  title: 'Components/SelectBoxOption',
  component: SelectBoxOption,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SelectBoxOption>;

const options = [
  { value: '객관식 질문', label: '객관식 질문' },
  { value: '주관식 질문', label: '주관식 질문' },
  { value: '체크 박스', label: '체크 박스' },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState('객관식 질문');

    return <SelectBoxOption options={options} value={selected} onChange={setSelected} />;
  },
};
