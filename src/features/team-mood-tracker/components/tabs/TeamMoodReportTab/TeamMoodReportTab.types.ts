export interface TeamMoodReportTabProps {
  current: TeamMoodReportTabType;
  counts: Partial<Record<TeamMoodReportTabType, number>>;
}

export enum TeamMoodReportTabType {
  TEAM_MOOD_REPORT = 'TEAM_MOOD_REPORT',
  ANSWER_SUMMARY = 'ANSWER_SUMMARY',
  SURVEY_LIST = 'SURVEY_LIST',
}
