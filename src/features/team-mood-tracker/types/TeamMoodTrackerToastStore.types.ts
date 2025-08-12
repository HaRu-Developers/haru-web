export enum TeamMoodTrackerToastType {
  COPY_SUCCESS = 'COPY_SUCCESS',
  COPY_EMPTY = 'COPY_EMPTY',
}

export interface TeamMoodTrackerToastItem {
  type: TeamMoodTrackerToastType;
}
