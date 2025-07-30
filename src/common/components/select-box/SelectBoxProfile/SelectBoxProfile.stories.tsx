import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import SelectBoxProfile from './SelectBoxProfile.server';

const meta: Meta<typeof SelectBoxProfile> = {
  title: 'Components/select-box/SelectBoxProfile',
  component: SelectBoxProfile,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SelectBoxProfile>;

export const Default: Story = {
  render: () => {
    const Wrapper = () => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <div style={{ padding: '100px', background: '#999999', height: '100vh' }}>
          <button onClick={() => setIsOpen((prev) => !prev)}>토글</button>
          <SelectBoxProfile isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      );
    };

    return <Wrapper />;
  },
};
