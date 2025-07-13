import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import DatePicker from './DatePicker.client';
import type { DatePickerProps } from './DatePicker.types';

const today = new Date();
today.setHours(0, 0, 0, 0);

const meta: Meta<DatePickerProps> = {
  title: 'Components/DatePicker/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'dark', value: '#000000' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<DatePickerProps>;

// Interactive wrapper to manage state internally
const InteractiveWrapper = (args: DatePickerProps) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>(args.selectedDates || []);
  return (
    <DatePicker
      {...args}
      selectedDates={selectedDates}
      onChange={(dates) => setSelectedDates(dates)}
      onConfirm={(dates) => console.log('Confirmed dates:', dates)}
      onCancel={() => console.log('Canceled')}
    />
  );
};

export const Default: Story = {
  name: 'Default (Interactive)',
  render: (args) => <InteractiveWrapper {...args} />,
};
