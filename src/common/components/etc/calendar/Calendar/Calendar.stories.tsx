import { Meta, StoryObj } from '@storybook/nextjs';

import { FileType } from '@common/types/file-type.enum';

import Calendar from '@common/components/etc/calendar/Calendar/Calendar.client';
import { DocumentList } from '@common/components/etc/calendar/types/calendar.common.types';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Etc/Calendar/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Calendar>;

const today = new Date();
const firstDayOfMonth = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1));
const sunday = new Date(firstDayOfMonth);
sunday.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
const WeekendLater = new Date(sunday);
WeekendLater.setDate(sunday.getDate() + 6);
const monthLater = new Date(sunday);
monthLater.setDate(sunday.getDate() + 34);
const operatingMonth = firstDayOfMonth.getMonth() + 1;

// mockDocuments를 1차원 배열로 정의
const mockDocuments: DocumentList[] = [
  {
    documentId: 1,
    title: `회의록 - 2025년 6월 24일`,
    documentType: FileType.AI_MEETING_MANAGER,
    createdAt: '2025-06-24T00:00:00Z',
  },
  {
    documentId: 2,
    title: `7월 8일 회의록`,
    documentType: FileType.AI_MEETING_MANAGER,
    createdAt: '2025-07-08T00:00:00Z',
  },
  {
    documentId: 3,
    title: `SNS 이벤트 초안`,
    documentType: FileType.SNS_EVENT_ASSISTANT,
    createdAt: '2025-07-08T00:00:00Z',
  },
  {
    documentId: 4,
    title: `팀 분위기 보고서 Q1`,
    documentType: FileType.TEAM_MOOD_TRACKER,
    createdAt: '2025-07-08T00:00:00Z',
  },
  {
    documentId: 5,
    title: `월간 회의록 요약`,
    documentType: FileType.AI_MEETING_MANAGER,
    createdAt: '2025-07-19T00:00:00Z',
  },
];

export const Week: Story = {
  args: {
    startDate: sunday,
    endDate: WeekendLater,
    documents: mockDocuments,
    operatingMonth: operatingMonth,
    onFileClick: (documentId: number) => {
      console.log(`Clicked on file with documentId: ${documentId}`);
    },
  },
};

export const Month: Story = {
  args: {
    startDate: sunday,
    endDate: monthLater,
    documents: mockDocuments,
    operatingMonth: operatingMonth,
    onFileClick: (documentId: number) => {
      console.log(`Clicked on file with documentId: ${documentId}`);
    },
  },
};
