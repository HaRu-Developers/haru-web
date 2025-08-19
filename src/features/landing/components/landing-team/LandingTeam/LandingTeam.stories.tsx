import { Meta, StoryObj } from '@storybook/nextjs';

import LandingTeam from '@features/landing/components/landing-team/LandingTeam/LandingTeam.client';

const meta: Meta<typeof LandingTeam> = {
  title: 'features/landing/landing-team/LandingTeam',
  component: LandingTeam,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LandingTeam>;

export const Default: Story = {
  args: {},
};
