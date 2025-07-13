import { Meta, StoryObj } from '@storybook/nextjs';

import DatePickerFooter from './DatePickerFooter.client';
import { DatePickerFooterProps } from './DatePickerFooter.types';

const meta: Meta<DatePickerFooterProps> = {
  title: 'Components/DatePicker/DatePickerFooter',
  component: DatePickerFooter,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000000' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<DatePickerFooterProps>;

export const DefaultFooter: Story = {
  args: {
    onConfirm: () => console.log('확인 클릭!'),
    onCancel: () => console.log('취소 클릭!'),
  },
};
