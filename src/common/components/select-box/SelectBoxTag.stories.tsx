import { Meta, StoryObj } from '@storybook/nextjs';

import SelectBoxTag from './SelectBoxTag.client';

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
    isSelected: false,
    onClick: () => console.log('Tag clicked'),
    onToggle: (isSelected) => console.log(`Tag selected: ${isSelected}`),
  },
};

export const Selected: Story = {
  args: {
    label: '태그 여부',
    isSelected: true,
    onClick: () => console.log('Tag clicked'),
    onToggle: (isSelected) => console.log(`Tag selected: ${isSelected}`),
  },
};
