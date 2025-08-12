import { Meta, StoryObj } from '@storybook/nextjs';

import TitleDisplay from '@features/landing/components/landing-banner/TitleDisplay/TitleDisplay.server';

const meta: Meta<typeof TitleDisplay> = {
  title: 'features/landing/landing-banner/TitleDisplay',
  component: TitleDisplay,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TitleDisplay>;

export const Default: Story = {
  args: {},
};
