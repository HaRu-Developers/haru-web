import type { Meta, StoryObj } from '@storybook/nextjs';

import ListFileTeamMoodTracker from './ListFileTeamMoodTracker.client';

const meta: Meta<typeof ListFileTeamMoodTracker> = {
  title: 'ListFile/TeamMoodTracker',
  component: ListFileTeamMoodTracker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListFileTeamMoodTracker>;

export const Default: Story = {
  args: {
    surveyId: 1,
    title: '6월 팀 분위기 트래커',
    createdAt: '2025.07.09',
    dueDate: '2025.07.15',
    respondentsNum: 24,
  },
};
