import { Meta, StoryObj } from '@storybook/nextjs';

import ProgressBar from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Example/LoadingBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    progress: 50,
  },
};
