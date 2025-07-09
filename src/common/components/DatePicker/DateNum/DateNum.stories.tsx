import type { Meta, StoryObj } from '@storybook/nextjs';

import DateNum from './DateNum.client';
import type { DateNumProps } from './DateNum.types';

const meta: Meta<DateNumProps> = {
  title: 'Components/DatePicker/DateNum',
  component: DateNum,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<DateNumProps>;

const today = new Date();
today.setHours(0, 0, 0, 0);

export const Default: Story = {
  args: {
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    currentMonth: today.getMonth(),
    selectedList: [],
    onSelect: (d) => console.log('선택:', d),
  },
};

export const PastDate: Story = {
  args: {
    date: new Date(2024, 10, 15),
    currentMonth: 10,
    selectedList: [],
    onSelect: (d) => console.log('선택:', d),
  },
};

export const Today: Story = {
  args: {
    date: today,
    currentMonth: today.getMonth(),
    selectedList: [],
    onSelect: (d) => console.log('선택:', d),
  },
};

export const Selected: Story = {
  args: {
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    currentMonth: today.getMonth(),
    selectedList: [new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)],
    onSelect: (d) => console.log('선택:', d),
  },
};

export const EmptyCell: Story = {
  args: {
    date: new Date(today.getFullYear(), today.getMonth() - 1, 28),
    currentMonth: today.getMonth(),
    selectedList: [],
    onSelect: (d) => console.log('선택:', d),
  },
};
