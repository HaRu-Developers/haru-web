import { Meta, StoryObj } from '@storybook/nextjs';

import InputSearchBox from '@/common/components/inputs/InputSearchBox/InputSearchBox.client';

const meta: Meta<typeof InputSearchBox> = {
  title: 'Components/InputSearchBox',
  component: InputSearchBox,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InputSearchBox>;

export const Default: Story = {};
