import { Meta, StoryObj } from '@storybook/nextjs';

import DocumentFile from '@common/components/etc/calender/DocumentFile/DocumentFile.client';
import { DocumentType } from '@common/components/etc/calender/types/calender.common.types';

const meta: Meta<typeof DocumentFile> = {
  title: 'Components/Etc/Calender/DocumentFile',
  component: DocumentFile,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DocumentFile>;
const documentFile = [
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
];
export const AiMeetingManager: Story = {
  args: {
    file: documentFile[0],
    onClick: (id: number) => {
      console.log(`Clicked on file with id: ${id}`);
    },
  },
};
export const SnsEventAssistant: Story = {
  args: {
    file: documentFile[1],
    onClick: (id: number) => {
      console.log(`Clicked on file with id: ${id}`);
    },
  },
};
export const TeamMoodTracker: Story = {
  args: {
    file: documentFile[2],
    onClick: (id: number) => {
      console.log(`Clicked on file with id: ${id}`);
    },
  },
};
