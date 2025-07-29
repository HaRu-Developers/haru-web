'use client';

import clsx from 'clsx';

import { MoveToNextButtonProps, MoveToNextButtonWidth } from './MoveToNextButton.types';

/**
 * '다음 단계로 이동하기' 버튼
 */
const MoveToNextButton = ({ disabled, onClick, width, ...props }: MoveToNextButtonProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb h-48pxr rounded-9pxr py-17pxr inline-flex items-center justify-center whitespace-nowrap text-white',
        !disabled ? 'bg-gray-100' : 'bg-gray-500',
        width === MoveToNextButtonWidth.WIDTH_414 ? 'w-414pxr' : 'w-260pxr',
      )}
      onClick={onClick}
      {...props}
    >
      다음 단계로 이동하기
    </button>
  );
};

export default MoveToNextButton;
