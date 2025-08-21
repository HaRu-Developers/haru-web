'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '선택 완료' 버튼.
 */
const CompleteSelectButton = ({ onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt2-sb bg-primary h-32pxr w-75pxr rounded-6pxr px-12pxr py-8pxr inline-flex items-center justify-center text-white',
      )}
      onClick={onClick}
      {...props}
    >
      선택 완료
    </button>
  );
};

export default CompleteSelectButton;
