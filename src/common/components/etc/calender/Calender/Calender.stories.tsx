import { Meta, StoryObj } from '@storybook/nextjs';

import Calender from '@common/components/etc/calender/Calender/Calender';
import { DocumentType, File } from '@common/components/etc/calender/Calender/Calender.types';

const meta: Meta<typeof Calender> = {
  title: 'Components/Calender',
  component: Calender,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Calender>;

const today = new Date('2025-06-29');
const WeekendLater = new Date(today);
WeekendLater.setDate(today.getDate() + 6);
const monthLater = new Date(today);
monthLater.setDate(today.getDate() + 34);

const mockDocuments: File[][] = [];
const numberOfDays =
  Math.floor((monthLater.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) + 1;

for (let i = 0; i < numberOfDays; i++) {
  mockDocuments.push([]);
}

if (mockDocuments[2]) {
  mockDocuments[2].push({
    title: `회의록 - 2025년 6월 24일`,
    type: DocumentType.AI_MEETING_MANAGER,
  });
}

if (mockDocuments[9]) {
  mockDocuments[9].push({
    title: `SNS 이벤트 초안 - 7월 1일`,
    type: DocumentType.SNS_EVENT_ASSISTANT,
  });
  mockDocuments[9].push({
    title: `팀 분위기 보고서 Q2`,
    type: DocumentType.TEAM_MOOD_TRACKER,
  });
  mockDocuments[9].push({
    title: `팀 분위기 보고서 Q3`,
    type: DocumentType.TEAM_MOOD_TRACKER,
  });
  mockDocuments[9].push({
    title: `팀 분위기 보고서 Q4`,
    type: DocumentType.TEAM_MOOD_TRACKER,
  });
  mockDocuments[9].push({
    title: `팀 분위기 보고서 Q5`,
    type: DocumentType.TEAM_MOOD_TRACKER,
  });
  mockDocuments[9].push({
    title: `팀 분위기 보고서 Q6`,
    type: DocumentType.TEAM_MOOD_TRACKER,
  });
}

if (mockDocuments[19]) {
  mockDocuments[19].push({
    title: `월간 회의록 요약`,
    type: DocumentType.AI_MEETING_MANAGER,
  });
}
export const Default: Story = {
  args: {
    startDate: new Date(),
    endDate: new Date(),
    documents: [
      [
        {
          title: `월간 회의록 요약1`,
          type: DocumentType.AI_MEETING_MANAGER,
        },
      ],
    ],
    operatingMonth: new Date().getMonth() + 1,
  },
};

export const Over: Story = {
  args: {
    startDate: new Date(),
    endDate: new Date(),
    documents: [
      [
        {
          title: `월간 회의록 요약1`,
          type: DocumentType.AI_MEETING_MANAGER,
        },
        {
          title: `월간 회의록 요약2`,
          type: DocumentType.SNS_EVENT_ASSISTANT,
        },
        {
          title: `월간 회의록 요약3`,
          type: DocumentType.TEAM_MOOD_TRACKER,
        },
        {
          title: `월간 회의록 요약4`,
          type: DocumentType.AI_MEETING_MANAGER,
        },
        {
          title: `월간 회의록 요약5`,
          type: DocumentType.SNS_EVENT_ASSISTANT,
        },
        {
          title: `월간 회의록 요약6`,
          type: DocumentType.TEAM_MOOD_TRACKER,
        },
      ],
    ],
    operatingMonth: new Date().getMonth() + 1,
  },
};

export const week: Story = {
  args: {
    startDate: today,
    endDate: WeekendLater,
    documents: mockDocuments,
    operatingMonth: 7,
  },
};

export const Month: Story = {
  args: {
    startDate: today,
    endDate: monthLater,
    documents: mockDocuments,
    operatingMonth: 7,
  },
};
