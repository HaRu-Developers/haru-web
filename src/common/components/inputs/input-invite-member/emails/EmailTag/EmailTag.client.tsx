'use client';

import clsx from 'clsx';

import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import { EmailTagProps } from './EmailTag.types';

/*
  인풋 초대 컴포넌트 하단 이메일 부분
*/
const EmailTag = ({ value, emails = [], state = 0, onClick }: EmailTagProps) => {
  const handleClick = (email?: string) => {
    const targetValue = email || value;
    if (targetValue) {
      onClick?.(targetValue);
    }
  };
  return (
    <div
      className={clsx(
        'border-stroke-200 shadow-dropdown-popup rounded-8pxr flex flex-col items-start gap-2.5 self-stretch border bg-white px-1 py-1.5',
      )}
    >
      <div
        className={clsx(
          'rounded-6pxr min-h-32pxr flex cursor-pointer items-center gap-1.5 self-stretch px-2.5 py-1.5 hover:bg-gray-600',
          {
            'bg-gray-600': state === 0,
          },
        )}
        onClick={() => handleClick()}
      >
        <IndividualIcons state={IndividualIconsState.EMAIL} />
        <span className={clsx('text-b3-md text-gray-100')}>{value}</span>
      </div>
      {emails.map((email, index) => (
        <div
          key={index}
          className={clsx(
            'rounded-6pxr min-h-32pxr flex cursor-pointer items-center gap-1.5 self-stretch px-2.5 py-1.5 hover:bg-gray-600',
            {
              'bg-gray-600': state === index + 1,
            },
          )}
          onClick={() => handleClick(email)}
        >
          <IndividualIcons state={IndividualIconsState.EMAIL} />
          <span className={clsx('text-b3-md text-gray-100')}>{email}</span>
        </div>
      ))}
    </div>
  );
};

export default EmailTag;
