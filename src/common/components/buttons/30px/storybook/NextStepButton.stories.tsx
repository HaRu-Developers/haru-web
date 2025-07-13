import { Meta, StoryObj } from '@storybook/nextjs';

import NextStepButton from '@/common/components/buttons/30px/NextStepButton';

const meta: Meta<typeof NextStepButton> = {
  title: 'Components/NextStepButton',
  component: NextStepButton,
  tags: ['autodocs'],
  argTypes: {
    isActive: {
      control: 'boolean',
      description: '활성화 여부',
      defaultValue: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof NextStepButton>;

export const Active: Story = {
  args: {
    isActive: true,
  },
};

export const Inactive: Story = {
  args: {
    isActive: false,
  },
};
