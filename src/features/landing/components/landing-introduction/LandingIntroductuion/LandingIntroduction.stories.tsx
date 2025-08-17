import { Meta, StoryObj } from '@storybook/nextjs';

import LandingIntroduction from '@features/landing/components/landing-introduction/LandingIntroductuion/LandingIntroduction.client';

const meta: Meta<typeof LandingIntroduction> = {
  title: 'features/landing/landing-team/LandingIntroduction',
  component: LandingIntroduction,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LandingIntroduction>;

export const Default: Story = {
  args: {},
};
