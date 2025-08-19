import { Meta, StoryObj } from '@storybook/nextjs';

import { FileType } from '@common/types/file-type.enum';

import DocumentFile from '@common/components/etc/calendar/DocumentFile/DocumentFile.client';

const meta: Meta<typeof DocumentFile> = {
  title: 'Components/Etc/Calendar/DocumentFile',
  component: DocumentFile,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DocumentFile>;
const documentFile = [
  {
    documentId: '1',
    title: '회의록 - 2025년 6월 24일',
    documentType: FileType.AI_MEETING_MANAGER,
    createdAt: '2025-06-24T00:00:00Z',
  },
  {
    documentId: '2',
    title: 'SNS 이벤트 초안 - 2025년 7월 8일',
    documentType: FileType.SNS_EVENT_ASSISTANT,
    createdAt: '2025-07-08T00:00:00Z',
  },
  {
    documentId: '3',
    title: '팀 분위기 보고서 Q1 - 2025년 7월 8일',
    documentType: FileType.TEAM_MOOD_TRACKER,
    createdAt: '2025-07-08T00:00:00Z',
  },
  {
    documentId: '4',
    title: '팀 분위기 보고서 Q1 - 2025년 7월 8일',
    documentType: FileType.TEAM_MOOD_TRACKER,
    createdAt: '2025-07-08T00:00:00Z',
  },
];
export const AiMeetingManager: Story = {
  args: {
    file: documentFile[0],
  },
};
export const SnsEventAssistant: Story = {
  args: {
    file: documentFile[1],
  },
};
export const TeamMoodTracker: Story = {
  args: {
    file: documentFile[2],
  },
};
