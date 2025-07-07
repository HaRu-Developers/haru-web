import React from 'react';

import clsx from 'clsx';

import { CalendarProps } from './Calender.types';

const Calender = ({ date, files }: CalendarProps) => {
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  return (
    <div
      className={clsx(
        'border-stroke-200 h-[152px] w-[147px] shrink-0 gap-[4px] border text-gray-100',
        {
          'bg-gray-700': isWeekend,
          'bg-white': !isWeekend,
        },
      )}
    >
      <div
        className={clsx('text-b3-md flex items-center justify-end pt-[14px] pr-[16px] pb-[4px]')}
      >
        {date.getDate() === 1 ? `${date.getMonth() + 1}월 ` : ''}
        {date.getDate()}일
      </div>
      {/* icon, box-shadow 추가 예정 */}
      {files?.map(
        (file, index) =>
          index < 3 && (
            <div
              key={index}
              className={clsx(
                'border-stroke-200 mx-[6px] flex h-[30px] w-[136px] shrink-0 items-center gap-[2px] rounded-[6px] border bg-white p-[6px] hover:bg-gray-600',
              )}
            >
              <div className={clsx('bg-file-icon h-[16px] w-[16px] shrink-0')}></div>
              <span
                className={clsx(
                  'text-bt3-sb w-[105px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap',
                )}
              >
                {file.name}
              </span>
            </div>
          ),
      )}
    </div>
  );
};

export default Calender;
