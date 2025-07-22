'use client';

import clsx from 'clsx';

import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import { EmailTagProps } from './EmailTag.types';

/*
  인풋 초대 컴포넌트 하단 이메일 부분
*/
const EmailTag = ({ value, onClick }: EmailTagProps) => {
  const handleClick = () => {
    if (value) {
      onClick?.(value);
    }
  };

  return (
    <div
      className={clsx(
        'border-stroke-200 shadow-dropdown-popup rounded-8pxr flex flex-col items-start gap-2.5 self-stretch border px-1 py-1.5',
      )}
    >
      <div
        className={clsx(
          'rounded-6pxr h-32pxr flex cursor-pointer items-center gap-1.5 self-stretch bg-gray-600 px-2.5 py-1.5',
        )}
        onClick={handleClick}
      >
        <IndividualIcons state={IndividualIconsState.EMAIL} />
        <span className={clsx('text-b3-md text-gray-100')}>{value}</span>
      </div>
    </div>
  );
};

export default EmailTag;
