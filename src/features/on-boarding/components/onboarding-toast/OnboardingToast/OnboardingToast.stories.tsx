import type { Meta, StoryObj } from '@storybook/nextjs';

import { OnboardingToastType } from '@features/on-boarding/types/OnboardingToast.types';

import OnboardingToast from './OnboardingToast.client';

const meta: Meta<typeof OnboardingToast> = {
  title: 'onboarding/OnboardingToast',
  component: OnboardingToast,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof OnboardingToast>;

export const InviteSuccess: Story = {
  render: () => (
    <OnboardingToast
      onboardingToast={{
        type: OnboardingToastType.SUCCESS_INVITE,
      }}
    />
  ),
};

export const SnsAccountSuccess: Story = {
  render: () => (
    <OnboardingToast
      onboardingToast={{
        type: OnboardingToastType.SUCCESS_SNS_ACCOUNT,
        snsAccount: 'k_nijy',
      }}
    />
  ),
};
