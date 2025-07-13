import type { Meta, StoryObj } from '@storybook/nextjs';

import SurveyQuestionTab from './SurveyQuestionTab.client';

const meta: Meta<typeof SurveyQuestionTab> = {
  title: 'Components/team-mood-tracker/tabs/SurveyQuestionTab',
  component: SurveyQuestionTab,
  tags: ['autodocs'],
  argTypes: {
    survey: {
      control: 'object',
      description: '설문 정보',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SurveyQuestionTab>;

export const Default: Story = {
  args: {
    survey: {
      isSubmitted: true,
    },
  },
};

export const NotSubmitted: Story = {
  args: {
    survey: {
      isSubmitted: false,
    },
  },
};
