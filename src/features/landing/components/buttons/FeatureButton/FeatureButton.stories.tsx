import { Meta, StoryObj } from '@storybook/nextjs';

import FeatureButton from '@features/landing/components/buttons/FeatureButton/FeatureButton.client';

import { FeatureButtonType } from './FeatureButton.types';

const meta: Meta<typeof FeatureButton> = {
  title: 'features/FeatureButton',
  component: FeatureButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeatureButton>;

export const AiMeetings: Story = {
  args: {
    name: 'AI Meetings',
    iconType: FeatureButtonType.MEETING,
    onClick: () => console.log('AI Meetings clicked'),
  },
};

export const Events: Story = {
  args: {
    name: 'Events',
    iconType: FeatureButtonType.EVENT,
    onClick: () => console.log('Events clicked'),
  },
};

export const MoodTracker: Story = {
  args: {
    name: 'Mood Trackers',
    iconType: FeatureButtonType.MOODTRACKER,
    onClick: () => console.log('Mood Trackers clicked'),
  },
};

export const Calandar: Story = {
  args: {
    name: 'Calendar',
    iconType: FeatureButtonType.CALENDAR,
    onClick: () => console.log('Calendar clicked'),
  },
};

export const AiMeetingsSelect: Story = {
  args: {
    name: 'AI Meetings',
    iconType: FeatureButtonType.MEETING,
    onClick: () => console.log('AI Meetings Select clicked'),
    disabled: true,
  },
};

export const EventsSelect: Story = {
  args: {
    name: 'Events',
    iconType: FeatureButtonType.EVENT,
    onClick: () => console.log('Events Select clicked'),
    disabled: true,
  },
};

export const MoodTrackerSelect: Story = {
  args: {
    name: 'Mood Trackers',
    iconType: FeatureButtonType.MOODTRACKER,
    onClick: () => console.log('Mood Trackers Select clicked'),
    disabled: true,
  },
};

export const CalandarSelect: Story = {
  args: {
    name: 'Calendar',
    iconType: FeatureButtonType.CALENDAR,
    onClick: () => console.log('Calendar Select clicked'),
    disabled: true,
  },
};
