import { Meta, StoryObj } from '@storybook/nextjs';

import CalenderSlice from '@common/components/etc/calender/CalenderSlice/CalenderSlice.client';

import { DocumentType } from '../types/calender.common.types';

const meta: Meta<typeof CalenderSlice> = {
  title: 'Components/Etc/Calender/CalenderSlice',
  component: CalenderSlice,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CalenderSlice>;

const files = [
  {
    id: 1,
    title: '회의록 - 2025년 6월 24일',
    type: DocumentType.AI_MEETING_MANAGER,
  },
  {
    id: 2,
    title: 'SNS 이벤트 초안 - 2025년 7월 8일',
    type: DocumentType.SNS_EVENT_ASSISTANT,
  },
  {
    id: 3,
    title: '팀 분위기 보고서 Q1 - 2025년 7월 8일',
    type: DocumentType.TEAM_MOOD_TRACKER,
  },
  {
    id: 4,
    title: '회의록 - 2025년 6월 24일',
    type: DocumentType.AI_MEETING_MANAGER,
  },
  {
    id: 5,
    title: 'SNS 이벤트 초안 - 2025년 7월 8일',
    type: DocumentType.SNS_EVENT_ASSISTANT,
  },
  {
    id: 6,
    title: '팀 분위기 보고서 Q1 - 2025년 7월 8일',
    type: DocumentType.TEAM_MOOD_TRACKER,
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
