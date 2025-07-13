import { TeamMoodReportTabType } from '@features/team-mood-tracker/constants/tabs';

export interface TeamMoodReportTabProps {
  current: TeamMoodReportTabType;
  counts: Partial<Record<TeamMoodReportTabType, number>>;
}
