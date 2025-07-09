import type { Meta, StoryObj } from '@storybook/nextjs';

import LoginOnBoarding from './LoginOnBoarding.client';

const meta: Meta<typeof LoginOnBoarding> = {
  title: 'Onboarding/LoginOnBoarding',
  component: LoginOnBoarding,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LoginOnBoarding>;

export const Default: Story = {
  render: () => <LoginOnBoarding />,
};
