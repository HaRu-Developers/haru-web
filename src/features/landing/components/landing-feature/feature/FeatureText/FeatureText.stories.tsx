import { Meta, StoryObj } from '@storybook/nextjs';

import { FileType } from '@common/types/file-type.enum';

import FeatureText from '@features/landing/components/landing-feature/feature/FeatureText/FeatureText.client';

const meta: Meta<typeof FeatureText> = {
  title: 'features/landing/feature/FeatureText',
  component: FeatureText,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeatureText>;

export const AiMeetingMannager: Story = {
  args: {
    fileType: FileType.AI_MEETING_MANAGER,
  },
};

export const SnsEventAssistant: Story = {
  args: {
    fileType: FileType.SNS_EVENT_ASSISTANT,
    isFlip: true,
  },
};

export const TeamMoodTracker: Story = {
  args: {
    fileType: FileType.TEAM_MOOD_TRACKER,
  },
};
