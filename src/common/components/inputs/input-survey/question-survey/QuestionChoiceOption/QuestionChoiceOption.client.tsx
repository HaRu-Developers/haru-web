'use client';

import { clsx } from 'clsx';

import CheckboxIcons from '@icons/CheckboxIcons/CheckboxIcons';
import { CheckboxIconsState } from '@icons/CheckboxIcons/CheckboxIcons.types';

import { SurveySituation } from '../../types/input-survey.common.types';
import { QuestionChoiceOptionProps } from './QuestionChoiceOption.types';

const QuestionChoiceOption = ({
  questionIndex,
  optionName,
  surveyComponentUsingSituation,
  isCheckboxSelected,
  onOptionNameChange,
  onCheckboxClick,
}: QuestionChoiceOptionProps) => {
  const isParticipatingSurvey =
    surveyComponentUsingSituation === SurveySituation.PARTICIPATING_SURVEY;

  const handleClick = () => {
    // 설문에 참여하고 있지 않다면 클릭 이벤트를 무시합니다.
    if (!isParticipatingSurvey) return;
    onCheckboxClick?.(questionIndex);
  };

  return (
    <div key={questionIndex} className="gap-6pxr flex items-center">
      <div onClick={handleClick}>
        <CheckboxIcons
          state={
            isCheckboxSelected
              ? CheckboxIconsState.CIRCLE_CHECKBOX_ENABLED
              : CheckboxIconsState.CIRCLE_CHECKBOX_DISABLED
          }
          className={clsx(
            'select-none',
            !isParticipatingSurvey ? 'cursor-default' : 'cursor-pointer',
          )}
        />
      </div>
      <input
        className={clsx(
          'text-b3-rg text-black outline-none select-none',
          !isParticipatingSurvey && 'cursor-default',
        )}
        value={optionName}
        placeholder={`옵션 ${questionIndex + 1}`}
        onChange={(e) => onOptionNameChange?.(questionIndex, e.target.value)}
        // 설문에 참여하고 있는 경우에는 readOnly로 설정합니다.
        readOnly={isParticipatingSurvey}
      />
    </div>
  );
};

export default QuestionChoiceOption;
