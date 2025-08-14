import { Survey } from '@features/team-mood-tracker/types/survey.types';

export interface SurveyQuestionTabProps {
  survey: Survey;
}

export enum SurveyQuestionTabType {
  SURVEY_GENERATE = 'SURVEY_GENERATE',
  SURVEY_LIST = 'SURVEY_LIST',
}
