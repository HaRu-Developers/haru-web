import { FileType } from '@common/types/file-type.enum';

import { DocumentType } from '@common/components/etc/BoxedFile/BoxedFile.types';

export const ctaItems = [
  { type: FileType.AI_MEETING_MANAGER, onClick: () => console.log('AI') },
  { type: FileType.SNS_EVENT_ASSISTANT, onClick: () => console.log('SNS') },
  { type: FileType.TEAM_MOOD_TRACKER, onClick: () => console.log('TEAM') },
];

const now = new Date();
const docTypes: DocumentType[] = [
  DocumentType.AI_MEETING_MANAGER,
  DocumentType.SNS_EVENT_ASSISTANT,
  DocumentType.TEAM_MOOD_TRACKER,
];

export const dummyFiles = Array.from({ length: 5 }, (_, index) => {
  const date = new Date(now);
  date.setHours(date.getHours() - index * 4);
  const title = `${date.getMonth() + 1}월 ${date.getDate()}일 회의록`;

  return {
    title,
    lastOpened: date.toISOString(),
    documentType: docTypes[index % docTypes.length],
    thumbnailUrl: '',
  };
});
