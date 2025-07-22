'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { timeSlots } from '@common/utils/time-picker-utils';

import { TimePickerProps } from './TimePicker.types';

export const TimePicker = ({ onTimeSelect, selectedDateTime }: TimePickerProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleClick = (time: string) => {
    setSelectedTime(time);
    const hhmm = time.split(' ')[0];
    onTimeSelect?.(hhmm);
  };

  /**
   * 선택된 시간이 비활성화되어야 하는지 확인하는 함수
   * selectedDateTime가 오늘 날짜인 경우, 시스템 현재 시간 기준으로 이전 시간대를 비활성화합니다.
   */
  const isTimeDisabled = (time: string): boolean => {
    // selectedDateTime가 설정되어 있지 않으면 false 반환
    if (!selectedDateTime) return false;

    const [hh, mm] = time.split(':');

    const timeDate = new Date(selectedDateTime);
    timeDate.setHours(parseInt(hh, 10));
    timeDate.setMinutes(parseInt(mm, 10));
    timeDate.setSeconds(0);
    timeDate.setMilliseconds(0);
    const now = new Date();
    // 현재 시간보다 이전 시간대는 비활성화
    return timeDate < now;
  };

  return (
    <div className="h-81">
      <div className="shadow-dropdown-popup flex h-full justify-center rounded-2xl bg-white py-4 pr-1 pl-4">
        <div
          className="scrollbar-component gap-5pxr flex h-full flex-col overflow-y-auto pr-3"
          style={{ scrollbarGutter: 'stable', overflowX: 'hidden' }}
        >
          {timeSlots.map((time) => {
            const isDisabled = isTimeDisabled(time);
            const isSelected = selectedTime === time;
            return (
              <button
                key={time}
                type="button"
                onClick={() => handleClick(time)}
                className={clsx(
                  'text-b2-rg py-5pxr hover:bg-primary-selected hover:border-primary flex w-55 items-center justify-center rounded-lg border bg-gray-700 text-black transition-colors duration-150',
                  {
                    'border-primary bg-primary-selected': isSelected, // 선택되었을 때는 border 및 bg 색상 변경
                    'cursor-not-allowed text-gray-400': isDisabled, // 비활성화 시에 글자 색상 변경 및 커서 변경
                    'border-transparent': !isSelected && !isDisabled, // 선택되지 않았고 비활성화되지 않은 경우 기본 border
                  },
                )}
                role="option"
                aria-selected={isSelected}
                disabled={isDisabled}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
