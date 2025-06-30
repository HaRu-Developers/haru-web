import { Meta, StoryObj } from '@storybook/nextjs';

import TestButton from './Test';

const meta: Meta<typeof TestButton> = {
  title: 'Test/TestButton',
  component: TestButton,
};

export default meta;

type Story = StoryObj<typeof TestButton>;

export const Default: Story = {
  args: {
    label: 'Test Button',
  },
};
