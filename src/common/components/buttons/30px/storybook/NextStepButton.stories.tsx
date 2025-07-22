import { Meta, StoryObj } from '@storybook/nextjs';

import NextStepButton from '../NextStepButton/NextStepButton.client';

const meta: Meta<typeof NextStepButton> = {
  title: 'Components/NextStepButton',
  component: NextStepButton,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
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
    disabled: true,
  },
};

export const Inactive: Story = {
  args: {
    disabled: false,
  },
};
