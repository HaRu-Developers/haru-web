import type { Meta, StoryObj } from '@storybook/nextjs';

import { TeamMoodReportTabType } from '@features/team-mood-tracker/constants/tabs';

import TeamMoodReportTab from './TeamMoodReportTab.client';

const meta: Meta<typeof TeamMoodReportTab> = {
  title: 'Components/team-mood-tracker/tabs/TeamMoodReportTab',
  component: TeamMoodReportTab,
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: 'radio',
      options: Object.values(TeamMoodReportTabType),
      description: '현재 선택된 탭',
    },
    counts: {
      control: 'object',
      description: '응답 탭 count 값',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TeamMoodReportTab>;

export const Default: Story = {
  args: {
    current: TeamMoodReportTabType.TEAM_MOOD_REPORT,
    counts: {
      [TeamMoodReportTabType.ANSWER_SUMMARY]: 10,
      [TeamMoodReportTabType.SURVEY_LIST]: 10,
    },
  },
};
