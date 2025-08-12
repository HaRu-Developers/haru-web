import type { Meta, StoryObj } from '@storybook/nextjs';

import GnbLeft from './GnbLeft.server';

const meta: Meta<typeof GnbLeft> = {
  title: 'Components/gnbs/GnbLeft',
  component: GnbLeft,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof GnbLeft>;

export const Default: Story = {
  render: () => <GnbLeft workspaceId={'1'} />,
};
