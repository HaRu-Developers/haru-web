import { FileType } from '@common/types/file-type.enum';

export const STORAGE_KEYS = {
  RECENT_SEARCHES: 'recentSearches',
} as const;

export const FILE_TYPE_PATHS: Record<FileType, string> = {
  [FileType.AI_MEETING_MANAGER]: 'ai-meeting-manager',
  [FileType.SNS_EVENT_ASSISTANT]: 'sns-event-assistant',
  [FileType.TEAM_MOOD_TRACKER]: 'team-mood-tracker',
};

export const CONFIG = {
  MAX_RECENT_SEARCHES: 3,
  SEARCH_DEBOUNCE_MS: 500,
} as const;
