'use client';

import clsx from 'clsx';

import { SkipForNowButtonProps, SkipForNowButtonType } from './SkipForNowButton.types';

/**
 * '지금 건너뛰기' 버튼
 */
const SkipForNowButton = ({ onClick, buttonType, ...props }: SkipForNowButtonProps) => {
  let buttonText = '';
  if (buttonType === SkipForNowButtonType.SIZE_38) {
    buttonText = '지금 건너뛰기';
  } else if (buttonType === SkipForNowButtonType.SIZE_48) {
    buttonText = '지금은 건너뛰기';
  }
  return (
    <button
      className={clsx({
        'text-bt1-sb inline-flex items-center justify-center border bg-white text-gray-100': true,
        'border-stroke-200 h-38pxr w-128pxr rounded-7pxr px-16pxr py-12pxr hover:bg-gray-600':
          buttonType == SkipForNowButtonType.SIZE_38,
        'border-stroke-100 h-48pxr w-146pxr rounded-9pxr py-16-5pxr':
          buttonType === SkipForNowButtonType.SIZE_48,
      })}
      onClick={onClick}
      {...props}
    >
      {buttonText}
    </button>
  );
};

export default SkipForNowButton;
