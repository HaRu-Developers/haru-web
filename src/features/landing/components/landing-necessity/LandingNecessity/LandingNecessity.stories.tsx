import { Meta, StoryObj } from '@storybook/nextjs';

import LandingNecessity from '@features/landing/components/landing-necessity/LandingNecessity/LandingNecessity.client';

const meta: Meta<typeof LandingNecessity> = {
  title: 'features/landing/landing-team/LandingNecessity',
  component: LandingNecessity,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LandingNecessity>;

export const Default: Story = {};
