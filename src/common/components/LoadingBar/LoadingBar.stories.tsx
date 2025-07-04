import { Meta, StoryObj } from '@storybook/nextjs';

import LoadingBar from './LoadingBar';

const meta: Meta<typeof LoadingBar> = {
  title: 'Example/LoadingBar',
  component: LoadingBar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
