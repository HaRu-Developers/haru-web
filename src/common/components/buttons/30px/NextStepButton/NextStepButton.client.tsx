'use client';

import clsx from 'clsx';

import { NextStepButtonProps } from './NextStepButton.types';

/**
 * '다음 단계로' 버튼
 */
const NextStepButton = ({
  className,
  onClick,
  disabled,
  loading = false,
  loadingText,
  ...props
}: NextStepButtonProps) => {
  return (
    <button
      className={clsx(
        'text-bt2-sb bg-primary inline-flex h-[30px] w-[87px] items-center justify-center rounded-[6px] px-[12px] py-[5px] text-white',
        (disabled || loading) && 'bg-primary-inactive',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {loading ? loadingText : '다음 단계로'}
    </button>
  );
};

export default NextStepButton;
