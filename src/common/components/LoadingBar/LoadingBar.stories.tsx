import { Meta, StoryObj } from '@storybook/nextjs';

import LoadingBar from './LoadingBar.server';

const meta: Meta<typeof LoadingBar> = {
  title: 'Components/LoadingBar',
  component: LoadingBar,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
