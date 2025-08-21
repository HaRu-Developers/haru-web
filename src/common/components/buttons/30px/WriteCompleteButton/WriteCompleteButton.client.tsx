'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '작성 완료' 버튼
 */
const WriteCompleteButton = ({ onClick, disabled, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt3-sb h-30pxr w-76pxr rounded-100pxr px-12pxr py-6pxr inline-flex items-center justify-center',
        disabled ? 'bg-gray-500 text-white' : 'bg-gray-100 text-white',
      )}
      onClick={onClick}
      {...props}
    >
      작성 완료
    </button>
  );
};

export default WriteCompleteButton;
