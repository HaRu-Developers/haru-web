import { Meta, StoryObj } from '@storybook/nextjs';

import { FileType } from '@common/types/file-type.enum';

import FeatureImage from '@features/landing/components/landing-feature/feature/FeatureImage/FeatureImage.server';

const meta: Meta<typeof FeatureImage> = {
  title: 'features/landing/feature/FeatureImage',
  component: FeatureImage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeatureImage>;

export const AiMeetingMannager: Story = {
  args: {
    fileType: FileType.AI_MEETING_MANAGER,
  },
};

export const SnsEventAssistant: Story = {
  args: {
    fileType: FileType.SNS_EVENT_ASSISTANT,
  },
};

export const TeamMoodTracker: Story = {
  args: {
    fileType: FileType.TEAM_MOOD_TRACKER,
  },
};
