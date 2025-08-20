'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '@buttons/types/buttons.common.types';

const SubmitSurveyButton = ({ onClick, disabled }: ButtonsCommonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'text-bt3-sb w-76pxr h-30pxr rounded-100pxr flex items-center justify-center',
        disabled ? 'bg-gray-500 text-white' : 'bg-gray-100 text-white',
      )}
    >
      답변 제출
    </button>
  );
};

export default SubmitSurveyButton;
