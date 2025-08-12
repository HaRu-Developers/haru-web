import { Meta, StoryObj } from '@storybook/nextjs';

import LandingStart from '@features/landing/components/LandingStart/LandingStart.client';

const meta: Meta<typeof LandingStart> = {
  title: 'features/landing/LandingStart',
  component: LandingStart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LandingStart>;

export const Default: Story = {
  args: {},
};
