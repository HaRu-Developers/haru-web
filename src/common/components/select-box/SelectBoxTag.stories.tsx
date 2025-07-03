import { Meta, StoryObj } from '@storybook/nextjs';

import SelectBoxTag from './SelectBoxTag';

const meta: Meta<typeof SelectBoxTag> = {
  title: 'Components/SelectBoxTag',
  component: SelectBoxTag,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SelectBoxTag>;

export const Default: Story = {
  args: {
    label: '태그 여부',
  },
};
