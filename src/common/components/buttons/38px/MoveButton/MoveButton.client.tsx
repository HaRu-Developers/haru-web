'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '이동하기' 버튼
 */
const MoveButton = ({ onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb h-38pxr w-128pxr rounded-7pxr px-16pxr py-12pxr inline-flex items-center justify-center bg-gray-100 text-white',
      )}
      {...props}
      onClick={onClick}
    >
      이동하기
    </button>
  );
};

export default MoveButton;
