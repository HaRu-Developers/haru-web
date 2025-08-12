import { TeamMoodTrackerToastType } from '@features/team-mood-tracker/types/TeamMoodTrackerToastStore.types';

export const TeamMoodTrackerToastLabels = {
  [TeamMoodTrackerToastType.COPY_SUCCESS]: '리포트가 클립보드에 복사되었습니다.',
  [TeamMoodTrackerToastType.COPY_EMPTY]: '복사할 리포트 내용이 없습니다.',
} as const;
