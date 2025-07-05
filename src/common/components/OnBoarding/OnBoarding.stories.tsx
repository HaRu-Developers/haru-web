import type { Meta, StoryObj } from '@storybook/nextjs';

import OnBoarding from './OnBoarding';

const meta: Meta<typeof OnBoarding> = {
  title: 'Onboarding/OnBoarding',
  component: OnBoarding,
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
type Story = StoryObj<typeof OnBoarding>;

export const Default: Story = {
  render: () => <OnBoarding />,
};
