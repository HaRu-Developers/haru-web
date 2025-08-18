import { InputSurveyProps } from '@common/components/inputs/input-survey/InputSurvey/InputSurvey.types';
import {
  InputSurveyQuestionType,
  SurveyVisibility,
} from '@common/components/inputs/input-survey/types/input-survey.common.types';

export const surveyDefaultQuestions: InputSurveyProps[] = [
  {
    title: '',
    placeholder: '문항의 제목을 입력하세요.',
    visibility: SurveyVisibility.PRIVATE, // 설문 생성 시에는 PRIVATE로 설정
    type: InputSurveyQuestionType.CHOICE,
    options: [''],
    isMandatory: false,
    isEtc: false,
    description: '',
  },
];

export const transferQuestionListToApiFormat = (qList: InputSurveyProps[]) => {
  return qList.map((question) => {
    return {
      title: question.title,
      type: question.type,
      isMandatory: question.isMandatory ?? false,
      options: question.type === InputSurveyQuestionType.SUBJECT ? undefined : question.options,
    };
  });
};
