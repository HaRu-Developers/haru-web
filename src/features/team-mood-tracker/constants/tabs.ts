export enum SurveyQuestionTabType {
  QUESTION_GENERATE = 'QUESTION_GENERATE',
  QUESTION_LIST = 'QUESTION_LIST',
}

export const SurveyQuestionTabLabels: Record<SurveyQuestionTabType, string> = {
  [SurveyQuestionTabType.QUESTION_GENERATE]: '설문 문항 생성',
  [SurveyQuestionTabType.QUESTION_LIST]: '설문 문항',
};

export enum TeamMoodReportTabType {
  TEAM_MOOD_REPORT = 'TEAM_MOOD_REPORT',
  RESPONSE_SUMMARY = 'RESPONSE_SUMMARY',
  QUESTION_LIST = 'QUESTION_LIST',
}

export const TeamMoodReportTabLabels: Record<TeamMoodReportTabType, string> = {
  [TeamMoodReportTabType.TEAM_MOOD_REPORT]: '팀 분위기 리포트',
  [TeamMoodReportTabType.RESPONSE_SUMMARY]: '응답',
  [TeamMoodReportTabType.QUESTION_LIST]: '설문 문항',
};
