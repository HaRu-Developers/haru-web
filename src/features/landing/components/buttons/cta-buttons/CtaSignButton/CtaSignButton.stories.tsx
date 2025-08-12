import { Meta, StoryObj } from '@storybook/nextjs';

import CtaSignButton from '@features/landing/components/buttons/cta-buttons/CtaSignButton/CtaSignButton.client';

const meta: Meta<typeof CtaSignButton> = {
  title: 'features/CtaButtons/CtaSignButton',
  component: CtaSignButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CtaSignButton>;

export const Default: Story = {
  args: {
    onClick: () => console.log('clicked'),
  },
};
