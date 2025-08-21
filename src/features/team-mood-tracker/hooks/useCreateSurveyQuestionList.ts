import { useState } from 'react';

import {
  InputSurveyQuestionHandlers,
  InputSurveyQuestionProps,
} from '@common/components/inputs/input-survey/InputSurvey/InputSurvey.types';
import {
  InputSurveyQuestionType,
  SurveySituation,
} from '@common/components/inputs/input-survey/types/input-survey.common.types';

import { surveyDefaultQuestions } from '@features/team-mood-tracker/utils/create-survey.utils';

export const useCreateSurveyQuestionList = (isCreating: boolean = true) => {
  const defaultQuestionList = isCreating ? surveyDefaultQuestions : [];

  const [questionList, setQuestionList] = useState<InputSurveyQuestionProps[]>(defaultQuestionList);

  /**
   * questionList에 설문을 추가하기 위한 함수
   *
   * 내용은 비어있되, 마지막에 있는 문항과 동일한 type으로 추가합니다.
   */
  const handleAddQuestion = () => {
    const newQuestion: InputSurveyQuestionProps = {
      questionTitle: '',
      questionTitlePlaceholder: '문항의 제목을 입력하세요.',
      surveyComponentUsingSituation: SurveySituation.CREATING_SURVEY, // 설문 생성 시에는 PRIVATE로 설정
      questionType: questionList[questionList.length - 1].questionType, // 마지막으로 선택된 타입을 사용
      multipleOrCheckboxOptions: [''],
      isQuestionMandatory: false,
      // isQuestionHaveEtcChoice: false, // BE 미구현 주석 처리
      subjectiveQuestionDescription: '',
    };
    setQuestionList((prev) => [...prev, newQuestion]);
  };

  /**
   * questionList에 담겨있는, 설문 문항의 속성을 변경하기 위한 1차 함수 (key, value)
   *
   * @param index questionList의 인덱스
   * @param field 설문 문항에서 변경할 key
   * @param value 해당 key에 대해 설문 문항에서 변경할 value
   */
  const handleQuestionPropertyChange = (
    index: number,
    field: keyof InputSurveyQuestionProps,
    value: InputSurveyQuestionProps[keyof InputSurveyQuestionProps],
  ) => {
    setQuestionList((prev) => {
      const updatedQuestions = [...prev];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [field]: value,
      };
      return updatedQuestions;
    });
  };

  /**
   * InputSurvey 컴포넌트에 제공할 Question 관련 handler set
   * @param index questionList의 인덱스
   */
  const handlerSet = (index: number): InputSurveyQuestionHandlers => {
    return {
      onTopMovingBarClick: () => console.log('Moving bar clicked for question', index),
      onQuestionTitleChange: (title: string) =>
        handleQuestionPropertyChange(index, 'questionTitle', title),
      onQuestionTypeChange: (type: InputSurveyQuestionType) =>
        handleQuestionPropertyChange(index, 'questionType', type),
      onIsMandatoryToggle: () =>
        handleQuestionPropertyChange(
          index,
          'isQuestionMandatory',
          !questionList[index].isQuestionMandatory,
        ),
      onQuestionDelete: () =>
        setQuestionList((prev) => {
          if (prev.length <= 1) {
            alert('최소 하나의 문항은 있어야 합니다.');
            return prev; // 최소 하나의 문항은 유지
          }
          return prev.filter((_, i) => i !== index);
        }),
      onOptionListChange: (options: string[]) =>
        handleQuestionPropertyChange(index, 'multipleOrCheckboxOptions', options),
      onSubjectiveQuestionResponseChange: (description: string) =>
        handleQuestionPropertyChange(index, 'subjectiveQuestionDescription', description),
      onQuestionOptionCheck: (checkedOptionIndexList: number[]) => {
        console.log('Checked options for question', index, checkedOptionIndexList);
      },
      // 체크박스 선택 이벤트 핸들러
    };
  };

  return {
    questionList,
    handleAddQuestion,
    handlerSet,
  };
};
