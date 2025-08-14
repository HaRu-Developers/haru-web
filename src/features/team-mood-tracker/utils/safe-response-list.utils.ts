import { TeamMoodTrackerSurveyQuestionType } from '@features/team-mood-tracker/constants/question.constants';

import { SurveyQuestion } from '@/api/team-mood-tracker/apis.types';

/**
 * @description API 응답의 responseList에서 각 질문 유형에 맞는 응답 배열이 실제로 존재하는 항목만 필터링합니다.
 * @param responseList API로부터 받은 질문 응답 목록 배열
 * @returns 런타임 에러 없이 안전하게 렌더링할 수 있는 필터링된 질문 목록 배열
 */

export const filterSafeResponseList = (
  responseList: SurveyQuestion[] | undefined,
): SurveyQuestion[] => {
  if (!responseList) {
    return [];
  }

  return responseList.filter((response) => {
    switch (response.type) {
      case TeamMoodTrackerSurveyQuestionType.MULTIPLE_CHOICE:
        return Array.isArray(response.multipleChoiceResponseList);
      case TeamMoodTrackerSurveyQuestionType.CHECKBOX_CHOICE:
        return Array.isArray(response.checkboxChoiceResponseList);
      case TeamMoodTrackerSurveyQuestionType.SUBJECTIVE:
        return Array.isArray(response.subjectiveResponseList);
      default:
        return false;
    }
  });
};
