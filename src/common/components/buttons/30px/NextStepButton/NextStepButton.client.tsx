'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '다음 단계로' 버튼
 */
const NextStepButton = ({ onClick, disabled, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt2-sb bg-primary inline-flex h-[30px] w-[87px] items-center justify-center rounded-[6px] px-[12px] py-[5px] text-white',
        disabled && 'bg-primary-inactive',
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      다음 단계로
    </button>
  );
};

export default NextStepButton;
