import type { Meta, StoryObj } from '@storybook/nextjs';

import { TabType } from '@features/sns-event-assistant/constants/tabs';

import Tab from './Tab.client';

const meta: Meta<typeof Tab> = {
  title: 'Components/sns-event-assistant/Tab',
  component: Tab,
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: 'radio',
      options: Object.values(TabType),
      description: '현재 선택된 탭',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  args: {
    current: TabType.PARTICIPANT_LIST,
  },
};
