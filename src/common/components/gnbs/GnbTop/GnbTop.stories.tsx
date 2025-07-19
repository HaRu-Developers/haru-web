import type { Meta, StoryObj } from '@storybook/nextjs';

import { GnbSection, SnsGnbTabType } from '@common/constants/gnbs';

import GnbTop from './GnbTop.client';

const meta: Meta<typeof GnbTop> = {
  title: 'Components/gnbs/GnbTop',
  component: GnbTop,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GnbTop>;

export const Main: Story = {
  render: () => <GnbTop section={GnbSection.MAIN} />,
};

export const AiMeetingManager: Story = {
  render: () => <GnbTop section={GnbSection.AI_MEETING_MANAGER} />,
};

export const TeamMoodTracker: Story = {
  render: () => <GnbTop section={GnbSection.TEAM_MOOD_TRACKER} />,
};

export const Calendar: Story = {
  render: () => <GnbTop section={GnbSection.CALENDAR} />,
};

export const SnsEventAssistantAllEvents: Story = {
  render: () => (
    <GnbTop section={GnbSection.SNS_EVENT_ASSISTANT} current={SnsGnbTabType.ALL_EVENTS} />
  ),
};

export const SnsEventAssistantLinkManage: Story = {
  render: () => (
    <GnbTop section={GnbSection.SNS_EVENT_ASSISTANT} current={SnsGnbTabType.SNS_LINK_MANAGE} />
  ),
};

export const CustomMeeting: Story = {
  render: () => <GnbTop section={GnbSection.CUSTOM} title="UMC 8기 운영진 회의" />,
};
