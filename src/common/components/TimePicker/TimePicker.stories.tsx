import { Meta, StoryObj } from '@storybook/nextjs';

import { TimePicker } from './TimePicker.client';
import { TimePickerProps } from './TimePicker.types';

const meta: Meta<TimePickerProps> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#000' }],
    },
  },
};
export default meta;

type Story = StoryObj<TimePickerProps>;

export const Default: Story = {
  args: {
    onTimeSelect: (time) => console.log('timeSelected:', time),
  },
};
