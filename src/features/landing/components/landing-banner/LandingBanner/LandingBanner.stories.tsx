import { Meta, StoryObj } from '@storybook/nextjs';

import LandingBanner from '@features/landing/components/landing-banner/LandingBanner/LandingBanner.client';

const meta: Meta<typeof LandingBanner> = {
  title: 'features/landing/landing-banner/LandingBanner',
  component: LandingBanner,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LandingBanner>;

export const Default: Story = {};
