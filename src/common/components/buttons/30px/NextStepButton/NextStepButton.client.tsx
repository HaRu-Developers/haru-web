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
        'text-bt2-sb bg-primary h-30pxr w-87pxr rounded-6pxr px-12pxr py-5pxr inline-flex items-center justify-center text-white',
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
