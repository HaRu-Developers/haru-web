'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { timeSlots } from '@common/utils/time-picker-utils';

import { TimePickerProps } from './TimePicker.types';

export const TimePicker = ({ onTimeSelect }: TimePickerProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleClick = (time: string) => {
    setSelectedTime(time);
    const hhmm = time.split(' ')[0];
    onTimeSelect?.(hhmm);
  };

  return (
    <div className="h-81">
      <div className="shadow-dropdown-popup flex h-full justify-center rounded-2xl bg-white py-4 pr-1 pl-4">
        <div
          className="scrollbar-component gap-5pxr flex h-full flex-col overflow-y-auto pr-3"
          style={{ scrollbarGutter: 'stable', overflowX: 'hidden' }}
        >
          {timeSlots.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => handleClick(time)}
              className={clsx(
                'text-b2-rg py-5pxr flex w-55 items-center justify-center rounded-lg border transition-colors duration-150',
                {
                  'border-primary bg-primary-selected border text-black': selectedTime === time,
                  'hover:bg-primary-selected border-transparent bg-gray-700 text-black':
                    selectedTime !== time,
                },
              )}
              role="option"
              aria-selected={selectedTime === time}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
