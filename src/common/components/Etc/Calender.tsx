import React from 'react';

import clsx from 'clsx';

import FeaturedFileIcons from '@icons/FeaturedFileIcons/FeaturedFileIcons';
import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

import { CalendarProps, CalendarSliceProps, DocumentType, type File } from './Calender.types';

/*
 * 캘린더 컴포넌트
 */

const File = ({ file }: { file: File }) => {
  {
    /* box-shadow 추가 예정 */
  }
  const documentIconMap = {
    [DocumentType.AI_MEETING_MANAGER]: FeaturedFileIconsState.SIZE_16_AI_MANAGER_FILE,
    [DocumentType.SNS_EVENT_ASSISTANT]: FeaturedFileIconsState.SIZE_16_SNS_ASSISTANT_FILE,
    [DocumentType.TEAM_MOOD_TRACKER]: FeaturedFileIconsState.SIZE_16_TEAM_MOOD_FILE,
  };
  const iconState = documentIconMap[file.type];

  return (
    <div className="border-stroke-200 h-30pxr w-136pxr rounded-6pxr mx-1.5 flex shrink-0 cursor-pointer items-center gap-0.5 border bg-white p-1.5 hover:bg-gray-600">
      {iconState && <FeaturedFileIcons state={iconState} />}
      <span className="text-bt3-sb w-105pxr overflow-hidden text-ellipsis whitespace-nowrap">
        {file.title}
      </span>
    </div>
  );
};

const CalenderSlice = ({ date, files, index, isVisible }: CalendarSliceProps) => {
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const isSecondRowOrBelow = index >= 7;
  return (
    <div
      className={clsx('border-stroke-200 min-h-152pxr w-147pxr shrink-0 gap-1 border pb-1', {
        'bg-gray-700': isWeekend,
        'bg-white': !isWeekend,
        'border-t-0': isSecondRowOrBelow,
        'text-gray-400': !isVisible,
        'text-gray-100': isVisible,
      })}
    >
      <div className="text-b3-md flex items-center justify-end pt-2.5 pr-4 pb-1">
        {date.getDate() === 1 ? `${date.getMonth() + 1}월 ` : ''}
        {date.getDate()}일
      </div>

      {files?.map((file, index) => (
        <File key={index} file={file} />
      ))}
    </div>
  );
};

const Calender = ({ startDate, endDate, documents, operatingMonth }: CalendarProps) => {
  const days = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const dateList = Array.from({ length: days + 1 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return date;
  });
  return (
    <div className="min-w-1022pxr grid grid-cols-7">
      {dateList.map((date, idx) => (
        <CalenderSlice
          key={idx}
          date={date}
          files={documents[idx] || []}
          index={idx}
          isVisible={date.getMonth() === operatingMonth - 1}
        />
      ))}
    </div>
  );
};

export default Calender;
