import { useState } from 'react';

import { InputSurveyProps } from '@common/components/inputs/input-survey/InputSurvey/InputSurvey.types';
import {
  InputSurveyQuestionType,
  SurveyVisibility,
} from '@common/components/inputs/input-survey/types/input-survey.common.types';

import { surveyDefaultQuestions } from '@features/team-mood-tracker/utils/create-survey.utils';

export const useCreateSurveyQuestionList = () => {
  const [questionList, setQuestionList] = useState<InputSurveyProps[]>([...surveyDefaultQuestions]);

  /**
   * questionList에 설문을 추가하기 위한 함수
   *
   * 내용은 비어있되, 마지막에 있는 문항과 동일한 type으로 추가합니다.
   */
  const handleAddQuestion = () => {
    const newQuestion: InputSurveyProps = {
      title: '',
      placeholder: '문항의 제목을 입력하세요.',
      visibility: SurveyVisibility.PRIVATE, // 설문 생성 시에는 PRIVATE로 설정
      type: questionList[questionList.length - 1].type, // 마지막으로 선택된 타입을 사용
      options: [''],
      isMandatory: false,
      isEtc: false,
      description: '',
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
    field: keyof InputSurveyProps,
    value: InputSurveyProps[keyof InputSurveyProps],
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
  const handlerSet = (index: number) => {
    return {
      onMovingBarClick: () => console.log('Moving bar clicked for question', index),
      onTitleChange: (title: string) => handleQuestionPropertyChange(index, 'title', title),
      onTypeChange: (type: InputSurveyQuestionType) =>
        handleQuestionPropertyChange(index, 'type', type),
      onToggle: () =>
        handleQuestionPropertyChange(index, 'isMandatory', !questionList[index].isMandatory),
      onDelete: () =>
        setQuestionList((prev) => {
          if (prev.length <= 1) {
            alert('최소 하나의 문항은 있어야 합니다.');
            return prev; // 최소 하나의 문항은 유지
          }
          return prev.filter((_, i) => i !== index);
        }),
      onOptionChange: (options: string[]) =>
        handleQuestionPropertyChange(index, 'options', options),
      onDescriptionChange: (description: string) =>
        handleQuestionPropertyChange(index, 'description', description),
      onEtcChange: (isEtc: boolean) => handleQuestionPropertyChange(index, 'isEtc', isEtc),
      onCheck: (checkedOptions: string[]) => {
        console.log('Checked options for question', index, checkedOptions);
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
