import { FileType } from '@common/types/file-type.enum';

export const modalHrefByFileType: Record<FileType, string> = {
  [FileType.AI_MEETING_MANAGER]: 'create-new-meeting-minutes',
  [FileType.SNS_EVENT_ASSISTANT]: '',
  [FileType.TEAM_MOOD_TRACKER]: '',
} as const;
