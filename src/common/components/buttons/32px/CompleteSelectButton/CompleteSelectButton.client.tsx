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
        'text-bt2-sb bg-primary inline-flex h-[32px] w-[75px] items-center justify-center rounded-[6px] px-[12px] py-[8px] text-white',
      )}
      onClick={onClick}
      {...props}
    >
      선택 완료
    </button>
  );
};

export default CompleteSelectButton;
