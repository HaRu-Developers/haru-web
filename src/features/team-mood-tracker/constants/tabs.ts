export enum SurveyQuestionTabType {
  SURVEY_GENERATE = 'SURVEY_GENERATE',
  SURVEY_LIST = 'SURVEY_LIST',
}

export const SurveyQuestionTabLabels: Record<SurveyQuestionTabType, string> = {
  [SurveyQuestionTabType.SURVEY_GENERATE]: '설문 문항 생성',
  [SurveyQuestionTabType.SURVEY_LIST]: '설문 문항',
};

export enum TeamMoodReportTabType {
  TEAM_MOOD_REPORT = 'TEAM_MOOD_REPORT',
  ANSWER_SUMMARY = 'ANSWER_SUMMARY',
  SURVEY_LIST = 'SURVEY_LIST',
}

export const TeamMoodReportTabLabels: Record<TeamMoodReportTabType, string> = {
  [TeamMoodReportTabType.TEAM_MOOD_REPORT]: '팀 분위기 리포트',
  [TeamMoodReportTabType.ANSWER_SUMMARY]: '응답',
  [TeamMoodReportTabType.SURVEY_LIST]: '설문 문항',
};
