import { Meta, StoryObj } from '@storybook/nextjs';

import LogoTest from './LogoTest';

const meta: Meta<typeof LogoTest> = {
  title: 'Test/Logo',
  component: LogoTest,
};

export default meta;

type Story = StoryObj<typeof LogoTest>;

export const Default: Story = {};
