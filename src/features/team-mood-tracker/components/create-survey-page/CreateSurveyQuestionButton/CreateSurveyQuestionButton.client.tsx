'use client';

import { ButtonsCommonProps } from '@buttons/types/buttons.common.types';

const CreateSurveyQuestionButton = ({ onClick }: ButtonsCommonProps) => {
  return (
    <button
      onClick={onClick}
      className="text-bt3-sb w-90pxr h-30pxr rounded-7pxr flex items-center justify-center bg-gray-600 text-black"
    >
      설문 문항 생성
    </button>
  );
};

export default CreateSurveyQuestionButton;
