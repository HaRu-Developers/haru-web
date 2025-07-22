'use client';

import { useState } from 'react';

import QuestionCheckboxOption from '@common/components/inputs/input-survey/question-survey/QuestionCheckboxOption/QuestionCheckboxOption.client';
import QuestionChoiceOption from '@common/components/inputs/input-survey/question-survey/QuestionChoiceOption/QuestionChoiceOption.client';

import { Type } from '../../types/input-survey.common.types';
import { QuestionOptionsProps } from './QuestionOptions.types';

const QuestionOptions = ({
  optionList = [],
  visibility,
  type,
  onChange,
  onCheck,
}: QuestionOptionsProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const handleCheckboxCheck = (index: number) => {
    let updated: number[] = [];

    if (selectedIndices.includes(index)) {
      updated = selectedIndices.filter((i) => i !== index);
    } else {
      updated = [...selectedIndices, index];
    }

    setSelectedIndices(updated);
    onCheck?.(updated.map((i) => optionList[i]));
  };

  const handleChoiceCheck = (index: number) => {
    setSelectedIndex(index);
    onCheck?.([optionList[index]]);
  };

  return (
    <>
      {optionList.map((option, index) =>
        type === Type.CHECKBOX ? (
          <QuestionCheckboxOption
            key={index}
            index={index}
            option={option}
            visibility={visibility}
            isChecked={selectedIndices.includes(index)}
            onChange={onChange}
            onCheck={() => handleCheckboxCheck(index)}
          />
        ) : (
          <QuestionChoiceOption
            key={index}
            index={index}
            option={option}
            visibility={visibility}
            isSelected={selectedIndex === index}
            onChange={onChange}
            onCheck={() => handleChoiceCheck(index)}
          />
        ),
      )}
    </>
  );
};

export default QuestionOptions;
