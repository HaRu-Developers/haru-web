import type { Meta, StoryObj } from '@storybook/nextjs';

import LeftTab from './LeftTab.client';
import { LeftTabType } from './LeftTab.types';

const meta: Meta<typeof LeftTab> = {
  title: 'Components/ai-meeting-manager/tabs/LeftTab',
  component: LeftTab,
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: 'radio',
      options: Object.values(LeftTabType),
      description: '현재 선택된 탭',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LeftTab>;

export const Default: Story = {
  args: {
    current: LeftTabType.MEETING_SUMMARY,
  },
};
