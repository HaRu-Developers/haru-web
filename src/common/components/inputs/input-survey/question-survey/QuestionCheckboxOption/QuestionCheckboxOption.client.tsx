'use client';

import CheckboxIcons from '@icons/CheckboxIcons/CheckboxIcons';
import { CheckboxIconsState } from '@icons/CheckboxIcons/CheckboxIcons.types';

import { InputSurveyQuestionType, SurveyVisibility } from '../../types/input-survey.common.types';
import { QuestionCheckboxOptionProps } from './QuestionCheckboxOption.types';

const QuestionCheckboxOption = ({
  index,
  option,
  visibility,
  isChecked,
  onChange,
  onCheck,
}: QuestionCheckboxOptionProps) => {
  const handleClick = () => {
    if (visibility === SurveyVisibility.PRIVATE) return;
    onCheck?.(index);
  };

  return (
    <div key={index} className="gap-6pxr flex items-center">
      <div onClick={handleClick}>
        <CheckboxIcons
          state={
            isChecked
              ? CheckboxIconsState.SQUARE_CHECKBOX_ENABLED
              : CheckboxIconsState.SQUARE_CHECKBOX_DISABLED
          }
          className="cursor-pointer select-none"
        />
      </div>
      <input
        className="text-b3-rg text-black outline-none"
        value={option}
        placeholder={`옵션 ${index + 1}`}
        onChange={(e) => onChange?.(index, e.target.value)}
        readOnly={option.trim() === '기타...' || visibility === SurveyVisibility.PUBLIC}
      />
    </div>
  );
};

export default QuestionCheckboxOption;
