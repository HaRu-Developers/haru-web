'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { timeSlots } from '@/utils/timePickerUtils';

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
      <div
        className="flex h-full justify-center rounded-2xl bg-white py-4 pr-1 pl-4"
        style={{ boxShadow: '2px 6px 24px 0px rgba(0, 0, 0, 0.10)' }}
      >
        <div
          className="scrollbar-component flex h-full flex-col gap-[5px] overflow-y-auto pr-3"
          style={{ scrollbarGutter: 'stable', overflowX: 'hidden' }}
        >
          {timeSlots.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => handleClick(time)}
              className={clsx(
                'text-body-1 flex w-55 items-center justify-center rounded-lg py-[5px] transition-all',
                {
                  'border-primary bg-primary/3 border text-black': selectedTime === time,
                  'hover:bg-primary/3 bg-gray-700 text-black': selectedTime !== time,
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
