import type { Meta, StoryObj } from '@storybook/nextjs';

import SnsFileTab from './SnsFileTab.client';
import { SnsFileTabType } from './SnsFileTab.types';

const meta: Meta<typeof SnsFileTab> = {
  title: 'Components/sns-event-assistant/SnsFileTab',
  component: SnsFileTab,
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: 'radio',
      options: Object.values(SnsFileTabType),
      description: '현재 선택된 탭',
    },
    counts: {
      control: 'object',
      description: '참여자, 당첨자 탭별 count 값',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SnsFileTab>;

export const Default: Story = {
  args: {
    current: SnsFileTabType.PARTICIPANT_LIST,
    counts: {
      [SnsFileTabType.PARTICIPANT_LIST]: 10,
      [SnsFileTabType.WINNER_LIST]: 10,
    },
  },
};
