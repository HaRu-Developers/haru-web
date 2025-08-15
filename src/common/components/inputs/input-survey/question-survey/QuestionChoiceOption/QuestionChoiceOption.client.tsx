'use client';

import CheckboxIcons from '@icons/CheckboxIcons/CheckboxIcons';
import { CheckboxIconsState } from '@icons/CheckboxIcons/CheckboxIcons.types';

import { SurveyVisibility } from '../../types/input-survey.common.types';
import { QuestionChoiceOptionProps } from './QuestionChoiceOption.types';

const QuestionChoiceOption = ({
  index,
  option,
  visibility,
  isSelected,
  onChange,
  onCheck,
}: QuestionChoiceOptionProps) => {
  const handleClick = () => {
    if (visibility === SurveyVisibility.PRIVATE) return;
    onCheck?.(index);
  };

  return (
    <div key={index} className="gap-6pxr flex items-center">
      <div onClick={handleClick}>
        <CheckboxIcons
          state={
            isSelected
              ? CheckboxIconsState.CIRCLE_CHECKBOX_ENABLED
              : CheckboxIconsState.CIRCLE_CHECKBOX_DISABLED
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

export default QuestionChoiceOption;
