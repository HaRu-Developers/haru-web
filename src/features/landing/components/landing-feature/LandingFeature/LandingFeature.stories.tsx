import { Meta, StoryObj } from '@storybook/nextjs';

import LandingFeature from '@features/landing/components/landing-feature/LandingFeature/LandingFeature.client';

const meta: Meta<typeof LandingFeature> = {
  title: 'features/landing/LandingFeature',
  component: LandingFeature,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LandingFeature>;

export const Default: Story = {};
