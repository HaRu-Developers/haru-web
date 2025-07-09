import type { Meta, StoryObj } from '@storybook/nextjs';

import WorkSpaceOnBoarding from './WorkSpaceOnBoarding.server';

const meta: Meta<typeof WorkSpaceOnBoarding> = {
  title: 'Onboarding/WorkSpaceOnBoarding',
  component: WorkSpaceOnBoarding,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],

  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#F3F4F6',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WorkSpaceOnBoarding>;

export const Default: Story = {};
