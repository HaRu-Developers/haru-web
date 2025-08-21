'use client';

import CheckboxIcons from '@icons/CheckboxIcons/CheckboxIcons';
import { CheckboxIconsState } from '@icons/CheckboxIcons/CheckboxIcons.types';

import { InputSurveyQuestionType } from '../../types/input-survey.common.types';
import { AddQuestionProps } from './AddQuestion.types';

const AddQuestion = ({
  type,
  onOptionAddClick,
  // onEtcAddClick,
  // isQuestionHaveEtcChoice,
}: AddQuestionProps) => {
  return (
    <div className="mt-12pxr gap-x-6pxr flex items-center self-stretch">
      {/* 질문 타입에 따라서 아이콘 렌더링을 해줍니다. */}
      <CheckboxIcons
        state={
          type === InputSurveyQuestionType.CHECKBOX
            ? CheckboxIconsState.SQUARE_CHECKBOX_DISABLED
            : CheckboxIconsState.CIRCLE_CHECKBOX_DISABLED
        }
        className="cursor-pointer select-none"
      />
      <span className="text-b4-rg cursor-pointer text-gray-400" onClick={onOptionAddClick}>
        옵션 추가
      </span>

      {/*BE 측에서 기타 옵션에 대한 핸들링을 하고 있지 않아 임시로 삭제 처리합니다.*/}

      {/*{!isQuestionHaveEtcChoice && (*/}
      {/*  <>*/}
      {/*    {' 또는 '}*/}
      {/*    <span className="text-audio-bar cursor-pointer" onClick={onEtcAddClick}>*/}
      {/*      ‘기타‘ 추가*/}
      {/*    </span>*/}
      {/*  </>*/}
      {/*)}*/}
    </div>
  );
};

export default AddQuestion;
