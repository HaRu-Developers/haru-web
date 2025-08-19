'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '저장하기' 버튼
 */
const SaveButton = ({ className, onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb border-stroke-200 h-38pxr w-128pxr rounded-7pxr px-16pxr py-12pxr inline-flex items-center justify-center border bg-white text-gray-100 hover:bg-gray-600',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      저장하기
    </button>
  );
};

export default SaveButton;
