import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import DatePicker from './DatePicker.client';
import type { DatePickerProps } from './DatePicker.types';

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
  return (
    <DatePicker
      {...args}
      onChange={(dates) => console.log('Changed dates:', dates)}
      onConfirm={(dates) => console.log('Confirmed dates:', dates)}
      onCancel={() => console.log('Canceled')}
    />
  );
};

export const Default: Story = {
  name: 'Default (Interactive)',
  render: (args) => <InteractiveWrapper {...args} />,
};
