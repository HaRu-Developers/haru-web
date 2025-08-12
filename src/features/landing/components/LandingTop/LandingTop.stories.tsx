import { Meta, StoryObj } from '@storybook/nextjs';

import LandingTop from '@features/landing/components/LandingTop/LandingTop.client';

const meta: Meta<typeof LandingTop> = {
  title: 'features/landing/LandingTop',
  component: LandingTop,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LandingTop>;

export const Default: Story = {
  args: {
    onLogoClick: () => console.log('Logo clicked'),
    onButtonClick: () => console.log('Button clicked'),
  },
};
