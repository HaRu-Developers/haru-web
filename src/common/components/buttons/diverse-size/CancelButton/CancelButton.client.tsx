'use client';

import clsx from 'clsx';

import { CancelButtonProps, CancelButtonType } from './CancelButton.types';

/**
 * '취소하기' 버튼.
 * 32px/38px 두 사이즈 중에서 선택해서 사용해주세요.
 */
const CancelButton = ({ onClick, buttonType, ...props }: CancelButtonProps) => {
  let buttonText = '';
  switch (buttonType) {
    case CancelButtonType.SIZE_32:
      buttonText = '취소';
      break;
    case CancelButtonType.SIZE_38:
      buttonText = '취소하기';
      break;
    default:
      buttonText = '';
  }
  return (
    <button
      className={clsx({
        'border-stroke-200 inline-flex items-center justify-center border bg-white hover:bg-gray-600': true,
        'text-bt2-sb h-32pxr w-48pxr rounded-6pxr px-11pxr py-8pxr text-black':
          buttonType == CancelButtonType.SIZE_32,
        'text-bt1-sb h-38pxr w-128pxr rounded-7pxr px-16pxr py-12pxr text-gray-100':
          buttonType == CancelButtonType.SIZE_38,
      })}
      onClick={onClick}
      {...props}
    >
      {buttonText}
    </button>
  );
};

export default CancelButton;
