import { Meta, StoryObj } from '@storybook/nextjs';

import SelectBoxOption from '@common/components/select-box/SelectBoxOption/SelectBoxOption.client';

const meta: Meta<typeof SelectBoxOption> = {
  title: 'Components/SelectBoxOption',
  component: SelectBoxOption,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SelectBoxOption>;

const options1 = [
  { state: '객관식 질문', label: '객관식 질문' },
  { state: '주관식 질문', label: '주관식 질문' },
  { state: '체크 박스', label: '체크 박스' },
];
const options2 = [
  { state: '공개', label: '공개' },
  { state: '비공개', label: '비공개' },
];
export const Default: Story = {
  args: {
    options: options1,
    onClick: (state: string) => console.log(state),
    placeholder: '선택하세요',
  },
};

export const Question: Story = {
  args: {
    options: options1,
    initState: options1[0].state,
    onClick: (state: string) => console.log(state),
    placeholder: '선택하세요',
  },
};

export const Visible: Story = {
  args: {
    options: options2,
    initState: options2[0].state,
    onClick: (state: string) => console.log(state),
    placeholder: '선택하세요',
  },
};
