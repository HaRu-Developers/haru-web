import { Meta, StoryObj } from '@storybook/nextjs';

import Banner from '@features/landing/components/landing-banner/Banner/Banner.server';

import { FeatureButtonType } from '../../buttons/FeatureButton/FeatureButton.types';

const meta: Meta<typeof Banner> = {
  title: 'features/landing/landing-banner/Banner',
  component: Banner,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const AiMeetings: Story = {
  args: {
    state: FeatureButtonType.MEETING,
  },
};

export const Events: Story = {
  args: {
    state: FeatureButtonType.EVENT,
  },
};

export const MoodTracker: Story = {
  args: {
    state: FeatureButtonType.MOODTRACKER,
  },
};

export const Calendar: Story = {
  args: {
    state: FeatureButtonType.CALENDAR,
  },
};
