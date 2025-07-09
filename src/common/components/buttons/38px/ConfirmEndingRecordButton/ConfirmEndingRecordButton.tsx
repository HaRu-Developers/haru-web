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
        'text-bt1-sb border-stroke-200 inline-flex h-[38px] w-[300px] items-center justify-center rounded-[7px] border bg-white px-[16px] py-[12px] hover:bg-gray-600',
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
