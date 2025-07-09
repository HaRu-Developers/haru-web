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
        'text-bt1-sb inline-flex h-[48px] items-center justify-center rounded-[9px] px-[152px] py-[17px] whitespace-nowrap text-white',
        !disabled ? 'bg-gray-100' : 'bg-gray-500',
        width === MoveToNextButtonWidth.WIDTH_414 ? 'w-[414px]' : 'w-[260px]',
      )}
      onClick={onClick}
      {...props}
    >
      다음 단계로 이동하기
    </button>
  );
};

export default MoveToNextButton;
