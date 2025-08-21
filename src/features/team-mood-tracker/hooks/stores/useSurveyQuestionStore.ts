import { surveyQuestionStore } from '@features/team-mood-tracker/stores/survey-question-store';

export const useSurveyQuestion = () => surveyQuestionStore((state) => state.questions);

export const useSurveySituation = () => {
  return surveyQuestionStore((state) => state.surveyComponentUsingSituation);
};

export const useSetSurveyQuestions = () => {
  return surveyQuestionStore((state) => state.setQuestions);
};

export const useGetQuestionIdByIndex = () => {
  return surveyQuestionStore((state) => state.getQuestionIdByIndex);
};

export const useAddSurveyQuestion = () => {
  return surveyQuestionStore((state) => state.addQuestion);
};

export const useRemoveSurveyQuestion = () => {
  return surveyQuestionStore((state) => state.removeQuestion);
};

export const useUpdateSurveyQuestion = () => {
  return surveyQuestionStore((state) => state.updateQuestion);
};

export const useUpdateSurveyQuestionOption = () => {
  return surveyQuestionStore((state) => state.updateOption);
};

export const useAddSurveyQuestionOption = () => {
  return surveyQuestionStore((state) => state.addOption);
};

export const useRemoveSurveyQuestionOption = () => {
  return surveyQuestionStore((state) => state.removeOption);
};

export const useSetSurveyQuestionOption = () => {
  return surveyQuestionStore((state) => state.setOption);
};

export const useSetSubjectiveQuestionResponse = () => {
  return surveyQuestionStore((state) => state.setSubjectiveQuestionResponse);
};

export const useSetSurveyQuestionTitle = () => {
  return surveyQuestionStore((state) => state.setQuestionTitle);
};

export const useToggleIsQuestionMandatory = () => {
  return surveyQuestionStore((state) => state.toggleIsQuestionMandatory);
};

export const useSetSurveyComponentUsingSituation = () => {
  return surveyQuestionStore((state) => state.setSurveyComponentUsingSituation);
};

export const useSetCheckedOptionList = () => {
  return surveyQuestionStore((state) => state.setCheckedOptionList);
};

export const useSetSurveyQuestionType = () => {
  return surveyQuestionStore((state) => state.setQuestionType);
};

export const useSetQuestionsFromApiFormat = () => {
  return surveyQuestionStore((state) => state.setQuestionsFromApiFormat);
};

export const useGetSurveyQuestionById = () => {
  return surveyQuestionStore((state) => state.getQuestionById);
};

export const useTransferQuestionsToCreateSurveyRequestFormat = () => {
  return surveyQuestionStore((state) => state.transferQuestionsToCreateSurveyRequestFormat);
};

export const useTransferQuestionsToParticipateSurveyRequestFormat = () => {
  return surveyQuestionStore((state) => state.transferQuestionsToParticipateSurveyRequestFormat);
};
