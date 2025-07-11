import type { Meta, StoryObj } from '@storybook/nextjs';

import { GnbSection, SnsGnbTabType } from '@common/constants/gnbs';

import GnbTop from './GnbTop.client';

const meta: Meta<typeof GnbTop> = {
  title: 'Components/gnbs/GnbTop',
  component: GnbTop,
  tags: ['autodocs'],
  argTypes: {
    section: {
      description: 'GNB 상단의 섹션 유형',
      control: 'select',
      options: Object.values(GnbSection),
    },
    title: {
      description: 'CUSTOM 섹션일 경우에만 사용되는 제목',
      control: 'text',
    },
    current: {
      control: 'radio',
      options: Object.values(SnsGnbTabType),
      description: '현재 선택된 snsGnb 탭',
    },
  },
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
