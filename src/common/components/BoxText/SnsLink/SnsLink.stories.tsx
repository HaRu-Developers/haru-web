import type { Meta, StoryObj } from '@storybook/nextjs';

import SnsLink from './SnsLink.client';

const meta: Meta<typeof SnsLink> = {
  title: 'Components/BoxText/SnsLink',
  component: SnsLink,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SnsLink>;

export const Default: Story = {
  args: {
    title: 'UMC 8기 운영진 회의 SNS 링크',
    url: 'https://www.instagram.com/p/DHSN1tlPXT1/',
  },
};
