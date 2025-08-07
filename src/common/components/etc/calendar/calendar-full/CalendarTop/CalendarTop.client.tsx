'use client';

import Arrow from '@common/components/icons/ArrowIcons/ArrowIcons';
import { ArrowIconsState } from '@common/components/icons/ArrowIcons/ArrowIcons.types';

import { CalendarTopProps } from './CalendarTop.types';

const CalendarTop = ({ title, onPrevClick, onTodayClick, onNextClick }: CalendarTopProps) => {
  return (
    <div className="mt-36pxr mb-16pxr flex w-full justify-center">
      <div className="w-1030pxr h-27pxr flex items-center justify-between">
        <span className="text-t4-bd">{title}</span>
        <div className="gap-2pxr flex items-center justify-between">
          <div onClick={onPrevClick} className="cursor-pointer">
            <Arrow state={ArrowIconsState.CHEVRON_LEFT} className="select-none" />
          </div>
          <span className="text-b3-rg cursor-pointer select-none" onClick={onTodayClick}>
            오늘
          </span>
          <div onClick={onNextClick} className="cursor-pointer">
            <Arrow state={ArrowIconsState.CHEVRON_RIGHT} className="select-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarTop;
