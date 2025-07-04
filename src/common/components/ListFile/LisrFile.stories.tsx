import { Meta, StoryObj } from '@storybook/nextjs';

import MeetingItem from './ListFile';
import { MeetingRole } from './ListFile.types';

const meta: Meta<typeof MeetingItem> = {
  title: '컴포넌트/MeetingItem',
  component: MeetingItem,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  isChecked: false,
  onCheck: (id: number | string) => console.log(`[Storybook] onCheck called with id: ${id}`),
};

export const AIManager: Story = {
  name: '역할: AI Manager',
  args: {
    ...baseArgs,
    id: 1,
    role: MeetingRole.AI_MANAGER,
    title: 'AI 모델 성능 분석 회의',
    date: '2025년 7월 7일, 16:30 PM',
  },
};

export const TeamMoodMaker: Story = {
  name: '역할: Team Mood Maker',
  args: {
    ...baseArgs,
    id: 2,
    role: MeetingRole.TEAM_MOOD_MAKER,
    title: '7월 팀 회식 장소 투표',
    date: '2025년 7월 7일, 16:30 PM',
    deadline: '2025.07.15',
    attendees: 12,
  },
};

export const SNSAssistantWithLink: Story = {
  name: '역할: SNS Assistant (링크 표시)',
  args: {
    ...baseArgs,
    id: 3,
    role: MeetingRole.SNS_ASSISTANT,
    title: '여름 이벤트 홍보 게시물',
    date: '2025년 7월 7일, 16:30',
    instagramLink: '@event_promotion_post',
  },
};

export const SNSAssistantWithCounts: Story = {
  name: '역할: SNS Assistant (인원수 표시)',
  args: {
    ...baseArgs,
    id: 4,
    role: MeetingRole.SNS_ASSISTANT,
    title: '댓글 이벤트 당첨자 발표',
    date: '2025년 7월 7일, 16:30 PM',
    attendees: 152,
    winners: 10,
  },
};
