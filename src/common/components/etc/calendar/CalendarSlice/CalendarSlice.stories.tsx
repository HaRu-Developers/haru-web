import { Meta, StoryObj } from '@storybook/nextjs';

import { FileType } from '@common/types/file-type.enum';

import CalendarSlice from '@common/components/etc/calendar/CalendarSlice/CalendarSlice.client';

const meta: Meta<typeof CalendarSlice> = {
  title: 'Components/Etc/Calendar/CalendarSlice',
  component: CalendarSlice,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CalendarSlice>;

const files = [
  {
    documentId: 1,
    title: 'FileType - 2025년 6월 24일',
    documentType: FileType.AI_MEETING_MANAGER,
    createdAt: '2025-06-24T00:00:00Z',
  },
  {
    documentId: 2,
    title: 'SNS 이벤트 초안 - 2025년 7월 8일',
    documentType: FileType.SNS_EVENT_ASSISTANT,
    createdAt: '2025-07-08T00:00:00Z',
  },
  {
    documentId: 3,
    title: '팀 분위기 보고서 Q1 - 2025년 7월 8일',
    documentType: FileType.TEAM_MOOD_TRACKER,
    createdAt: '2025-07-08T00:00:00Z',
  },
  {
    documentId: 4,
    title: '회의록 - 2025년 6월 24일',
    documentType: FileType.AI_MEETING_MANAGER,
    createdAt: '2025-06-24T00:00:00Z',
  },
  {
    documentId: 5,
    title: 'SNS 이벤트 초안 - 2025년 7월 8일',
    documentType: FileType.SNS_EVENT_ASSISTANT,
    createdAt: '2025-07-08T00:00:00Z',
  },
  {
    documentId: 6,
    title: '팀 분위기 보고서 Q1 - 2025년 7월 8일',
    documentType: FileType.TEAM_MOOD_TRACKER,
    createdAt: '2025-07-08T00:00:00Z',
  },
];

export const Today: Story = {
  args: {
    date: new Date(),
    isVisible: true,
    isToday: true,
    isSecondRowOrBelow: false,
    isNotLastColumn: false,
    files: [files[0]],
  },
};

export const NotVisible: Story = {
  args: {
    date: new Date(),
    isVisible: false,
    isToday: false,
    isSecondRowOrBelow: false,
    isNotLastColumn: false,
    files: [files[0]],
  },
};

export const LotOfFiles: Story = {
  args: {
    date: new Date(),
    isVisible: true,
    isToday: false,
    isSecondRowOrBelow: false,
    isNotLastColumn: false,
    files: files,
  },
};

export const SecondRow: Story = {
  args: {
    date: new Date(),
    isVisible: true,
    isToday: false,
    isSecondRowOrBelow: true,
    isNotLastColumn: false,
  },
};

export const NotLastColumn: Story = {
  args: {
    date: new Date(),
    isVisible: true,
    isToday: false,
    isSecondRowOrBelow: true,
    isNotLastColumn: false,
  },
};
