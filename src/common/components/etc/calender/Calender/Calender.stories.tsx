import { Meta, StoryObj } from '@storybook/nextjs';

import Calender from '@common/components/etc/calender/Calender/Calender.client';
import { DocumentFile, DocumentType } from '@common/components/etc/calender/types/calender.common.types';

const meta: Meta<typeof Calender> = {
  title: 'Components/Etc/Calender/Calender',
  component: Calender,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Calender>;

const today = new Date();
const firstDayOfMonth = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1)); // UTC 사용 안할 시 오늘 날짜가 값은 정상이지만 내일로 밀리는 버그가 있음
const sunday = new Date(firstDayOfMonth);
sunday.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
const WeekendLater = new Date(sunday);
WeekendLater.setDate(sunday.getDate() + 6);
const monthLater = new Date(sunday);
monthLater.setDate(sunday.getDate() + 34);
const operatingMonth = firstDayOfMonth.getMonth() + 1;
const mockDocuments: DocumentFile[][] = [];
const numberOfDays =
  Math.floor((monthLater.getTime() - sunday.getTime()) / (1000 * 60 * 60 * 24)) + 1;

for (let i = 0; i < numberOfDays; i++) {
  // 날짜 별 배열 만들기 날짜 별 문서가 제한이 없음
  mockDocuments.push([]);
}

if (mockDocuments[2]) {
  mockDocuments[2].push({
    id: 1,
    title: `회의록 - 2025년 6월 24일`,
    type: DocumentType.AI_MEETING_MANAGER,
  });
}

if (mockDocuments[9]) {
  mockDocuments[9].push(
    {
      id: 2,
      title: `7월 8일 회의록`,
      type: DocumentType.AI_MEETING_MANAGER,
    },
    {
      id: 3,
      title: `SNS 이벤트 초안`,
      type: DocumentType.SNS_EVENT_ASSISTANT,
    },
    {
      id: 4,
      title: `팀 분위기 보고서 Q1`,
      type: DocumentType.TEAM_MOOD_TRACKER,
    },
  );
}

if (mockDocuments[19]) {
  mockDocuments[19].push({
    id: 5,
    title: `월간 회의록 요약`,
    type: DocumentType.AI_MEETING_MANAGER,
  });
}

export const Week: Story = {
  args: {
    startDate: sunday,
    endDate: WeekendLater,
    documents: mockDocuments,
    operatingMonth: operatingMonth,
    onFileClick: (id: number) => {
      console.log(`Clicked on file with id: ${id}`);
    },
  },
};

export const Month: Story = {
  args: {
    startDate: sunday,
    endDate: monthLater,
    documents: mockDocuments,
    operatingMonth: operatingMonth,
    onFileClick: (id: number) => {
      console.log(`Clicked on file with id: ${id}`);
    },
  },
};
