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
        'border-stroke-200 h-[38px] w-[128px] rounded-[7px] px-[16px] py-[12px] hover:bg-gray-600':
          buttonType == SkipForNowButtonType.SIZE_38,
        'border-stroke-100 h-[48px] w-[146px] rounded-[9px] py-[16.5px]':
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
