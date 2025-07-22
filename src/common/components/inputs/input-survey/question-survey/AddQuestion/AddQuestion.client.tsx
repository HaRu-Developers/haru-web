'use client';

import CheckboxIcons from '@icons/CheckboxIcons/CheckboxIcons';
import { CheckboxIconsState } from '@icons/CheckboxIcons/CheckboxIcons.types';

import { Type } from '../../types/input-survey.common.types';
import { AddQuestionProps } from './AddQuestion.types';

const AddQuestion = ({ type, onOptionAddClick, onEtcAddClick, isEtc }: AddQuestionProps) => {
  return (
    <div className="gap-6pxr text-b3-rg flex items-center self-stretch">
      <CheckboxIcons
        state={
          type === Type.CHECKBOX
            ? CheckboxIconsState.SQUARE_CHECKBOX_DISABLED
            : CheckboxIconsState.CIRCLE_CHECKBOX_DISABLED
        }
        className="cursor-pointer select-none"
      />
      <span className="cursor-pointer text-gray-400" onClick={onOptionAddClick}>
        옵션 추가
      </span>
      {!isEtc && (
        <>
          {' 또는 '}
          <span className="text-audio-bar cursor-pointer" onClick={onEtcAddClick}>
            ‘기타‘ 추가
          </span>
        </>
      )}
    </div>
  );
};

export default AddQuestion;
