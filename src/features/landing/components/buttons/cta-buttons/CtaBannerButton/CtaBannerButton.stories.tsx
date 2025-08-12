import { Meta, StoryObj } from '@storybook/nextjs';

import CtaBannerButton from '@features/landing/components/buttons/cta-buttons/CtaBannerButton/CtaBannerButton.client';

const meta: Meta<typeof CtaBannerButton> = {
  title: 'features/CtaButtons/CtaBannerButton',
  component: CtaBannerButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CtaBannerButton>;

export const Default: Story = {
  args: {
    onClick: () => console.log('clicked'),
  },
};
