'use client';

import clsx from 'clsx';

import { ConfirmRecordEndingProps } from './ConfirmRecordEnding.types';

/**
 * '네. AI 회의록 작성으로 넘어갈래요. / 아니요. 이어서 녹음할래요.' 버튼
 */
const ConfirmEndingRecordButton = ({
  isEndingRecord,
  onClick,
  ...props
}: ConfirmRecordEndingProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb border-stroke-200 h-38pxr w-300pxr rounded-7pxr px-16pxr py-12pxr inline-flex items-center justify-center border bg-white hover:bg-gray-600',
        isEndingRecord ? 'text-primary' : 'text-gray-100',
      )}
      onClick={onClick}
      {...props}
    >
      {isEndingRecord ? '네. AI 회의록 작성으로 넘어갈래요.' : '아니요. 이어서 녹음할래요.'}
    </button>
  );
};

export default ConfirmEndingRecordButton;
