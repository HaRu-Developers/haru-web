import { InputSurveyQuestionProps } from '@common/components/inputs/input-survey/InputSurvey/InputSurvey.types';
import {
  InputSurveyQuestionType,
  SurveySituation,
} from '@common/components/inputs/input-survey/types/input-survey.common.types';

export const surveyDefaultQuestions: InputSurveyQuestionProps[] = [
  {
    questionTitle: '',
    questionTitlePlaceholder: '문항의 제목을 입력하세요.',
    surveyComponentUsingSituation: SurveySituation.CREATING_SURVEY, // 설문 생성 시에는 PRIVATE로 설정
    questionType: InputSurveyQuestionType.CHOICE,
    multipleOrCheckboxOptions: [''],
    isQuestionMandatory: false,
    subjectiveQuestionDescription: '',
  },
];

export const transferQuestionListToApiFormat = (qList: InputSurveyQuestionProps[]) => {
  return qList.map((question) => {
    return {
      title: question.questionTitle,
      type: question.questionType,
      isMandatory: question.isQuestionMandatory ?? false,
      options:
        question.questionType === InputSurveyQuestionType.SUBJECT
          ? undefined
          : question.multipleOrCheckboxOptions,
    };
  });
};
