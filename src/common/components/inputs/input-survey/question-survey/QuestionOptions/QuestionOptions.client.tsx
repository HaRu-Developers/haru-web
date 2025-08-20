'use client';

import { useState } from 'react';

import QuestionCheckboxOption from '@common/components/inputs/input-survey/question-survey/QuestionCheckboxOption/QuestionCheckboxOption.client';
import QuestionChoiceOption from '@common/components/inputs/input-survey/question-survey/QuestionChoiceOption/QuestionChoiceOption.client';

import { InputSurveyQuestionType, SurveySituation } from '../../types/input-survey.common.types';
import { QuestionOptionsProps } from './QuestionOptions.types';

const QuestionOptions = ({
  optionList = [],
  surveyComponentUsingSituation,
  questionType,
  onOptionListChange,
  onQuestionOptionCheck,
}: QuestionOptionsProps) => {
  // 선택된 인덱스입니다. 단일 선택 가능한 경우에 대한 인덱스입니다.
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  // 복수 선택 가능한 경우에 대한 인덱스 목록입니다.
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const isParticipating = surveyComponentUsingSituation === SurveySituation.PARTICIPATING_SURVEY;

  /**
   * 체크박스 (복수 선택 가능한 경우) 에 대한 핸들러 입니다.
   */
  const handleCheckboxCheck = (index: number) => {
    if (!isParticipating) return;

    let updated: number[];

    if (selectedIndices.includes(index)) {
      // 이미 선택된 경우, 선택 해제 합니다.
      updated = selectedIndices.filter((i) => i !== index);
    } else {
      // 기존에 선택되지 않은 항목인 경우, 선택 처리 합니다.
      updated = [...selectedIndices, index];
    }

    setSelectedIndices(updated);
    onQuestionOptionCheck?.(updated); // 선택된 인덱스 배열을 넘기도록 변경
  };

  /**
   * 객관식 (단일 선택 가능한 경우) 에 대한 핸들러 입니다.
   */
  const handleChoiceCheck = (index: number) => {
    if (!isParticipating) return;

    setSelectedIndex(index);
    // onQuestionOptionCheck?.([optionList[index]]); // 기존 요소 배열을 넘기던 코드
    onQuestionOptionCheck?.([index]); // 선택된 인덱스 배열을 넘기도록 변경
  };

  return (
    <>
      {optionList.map((option, index) => {
        // refactored by kyeoungwoon
        // 코드 가독성 향상을 위해 삼항 연산자 -> if 문으로 변경하였습니다.

        // 객관식 질문인 경우와 체크박스 질문인 경우에 따라 다른 컴포넌트를 렌더링합니다.
        // 주관식 질문은 별도의 컴포넌트로 처리합니다.

        if (questionType === InputSurveyQuestionType.CHECKBOX) {
          // CHECKBOX, 복수 선택 가능한 경우에 대한 렌더링입니다.
          return (
            <QuestionCheckboxOption
              key={index}
              questionIndex={index}
              optionName={option}
              surveyComponentUsingSituation={surveyComponentUsingSituation}
              isCheckboxChecked={selectedIndices.includes(index)}
              onOptionNameChange={onOptionListChange}
              onCheckboxClick={() => handleCheckboxCheck(index)}
            />
          );
        } else if (questionType === InputSurveyQuestionType.CHOICE) {
          // CHOICE, 단일 선택 가능한 경우에 대한 렌더링입니다.
          return (
            <QuestionChoiceOption
              key={index}
              questionIndex={index}
              optionName={option}
              surveyComponentUsingSituation={surveyComponentUsingSituation}
              isCheckboxSelected={selectedIndex === index}
              onOptionNameChange={onOptionListChange}
              onCheckboxClick={() => handleChoiceCheck(index)}
            />
          );
        } else {
          // 잘못된 타입이 들어온 경우, 아무것도 렌더링하지 않습니다.
          return null;
        }
      })}
    </>
  );
};

export default QuestionOptions;
