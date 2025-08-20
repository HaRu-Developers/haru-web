'use client';

import CheckboxIcons from '@icons/CheckboxIcons/CheckboxIcons';
import { CheckboxIconsState } from '@icons/CheckboxIcons/CheckboxIcons.types';

import { InputSurveyQuestionType, SurveySituation } from '../../types/input-survey.common.types';
import { QuestionCheckboxOptionProps } from './QuestionCheckboxOption.types';

/**
 * 체크박스 옵션 컴포넌트입니다.
 */
const QuestionCheckboxOption = ({
  questionIndex,
  optionName,
  surveyComponentUsingSituation,
  isCheckboxChecked,
  onOptionNameChange,
  onCheckboxClick,
}: QuestionCheckboxOptionProps) => {
  // 아이콘에 대한 클릭 이벤트를 처리합니다.
  const handleCheckboxClick = () => {
    // 설문 수정 시에는 아이콘 클릭을 무시합니다.
    if (surveyComponentUsingSituation === SurveySituation.PRIVATE) return;
    onCheckboxClick?.(questionIndex);
  };

  return (
    <div key={questionIndex} className="gap-6pxr flex items-center">
      <div onClick={handleCheckboxClick}>
        <CheckboxIcons
          state={
            isCheckboxChecked
              ? CheckboxIconsState.SQUARE_CHECKBOX_ENABLED
              : CheckboxIconsState.SQUARE_CHECKBOX_DISABLED
          }
          className="cursor-pointer select-none"
        />
      </div>
      <input
        className="text-b3-rg text-black outline-none"
        value={optionName}
        placeholder={`옵션 ${questionIndex + 1}`}
        onChange={(e) => onOptionNameChange?.(questionIndex, e.target.value)}
        // 기타 옵션이거나 설문 참여 상황에서는 수정을 막습니다
        // 였는데~ BE에서 기타에 대한 구현이 안되어 있는 관계로 스킵합니다..
        readOnly={
          // optionName.trim() === '기타...' ||
          surveyComponentUsingSituation === SurveySituation.PUBLIC
        }
      />
    </div>
  );
};

export default QuestionCheckboxOption;
