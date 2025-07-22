'use client';

import clsx from 'clsx';

import DocumentFile from '../DocumentFile/DocumentFile.client';
import { CalendarSliceProps } from './Calender.types';

const CalenderSlice = ({
  date,
  files,
  isVisible,
  onFileClick,
  isToday,
  isSecondRowOrBelow,
  isNotLastColumn,
}: CalendarSliceProps) => {
  const dateValue = typeof date === 'number' ? new Date(date) : date; // story 북에서는 date가 number로 넘어옴
  const isWeekend = dateValue.getDay() === 0 || dateValue.getDay() === 6;
  return (
    <div
      className={clsx('border-stroke-200 min-h-152pxr w-147pxr shrink-0 gap-1 border pb-1', {
        'bg-gray-700': isWeekend,
        'bg-white': !isWeekend,
        'border-t-0': isSecondRowOrBelow,
        'border-r-0': isNotLastColumn,
        'text-gray-400': !isVisible,
        'text-gray-100': isVisible,
      })}
    >
      <div
        className={clsx(
          'text-b3-md pt-4pxr pr-16pxr h-40pxr relative flex items-center justify-end',
          {
            'text-white': isToday,
          },
        )}
      >
        <div
          className={clsx('rounded-100pxr h-24pxr absolute', {
            'right-12pxr bg-primary w-24pxr': isToday,
          })}
        >
          <div className="flex h-full items-center justify-center">
            <span className="z-1">
              {dateValue.getDate() !== 1 || isToday
                ? dateValue.getDate()
                : `${dateValue.getMonth() + 1}월 ${dateValue.getDate()}일`}
            </span>
          </div>
        </div>
      </div>

      {files?.map((file, index) => (
        <DocumentFile key={index} file={file} onClick={onFileClick} />
      ))}
    </div>
  );
};

export default CalenderSlice;
