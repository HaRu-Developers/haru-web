import { useState } from 'react';

import clsx from 'clsx';

import ArrowIcons from '@icons/ArrowIcons/ArrowIcons';
import { ArrowIconsState } from '@icons/ArrowIcons/ArrowIcons.types';
import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import DatePicker from '@common/components/DatePicker/DatePicker.client';
import { TimePicker } from '@common/components/TimePicker/TimePicker.client';

import { DateTimePickerProps } from './DateTimePicker.types';

const DateTimePicker = ({ selectedDateTime, setSelectedDateTime }: DateTimePickerProps) => {
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [timePickerVisible, setTimePickerVisible] = useState<boolean>(false);

  const extractDate = (date: Date | null): string | undefined => {
    if (!date) return undefined;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const extractTime = (date: Date | null): string | undefined => {
    if (!date) return undefined;
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleDateChange = (dates: Date[]) => {
    setSelectedDateTime((prev) => {
      const newDate = dates[0];
      if (prev) {
        newDate.setHours(prev.getHours());
        newDate.setMinutes(prev.getMinutes());
        newDate.setSeconds(prev.getSeconds());
        newDate.setMilliseconds(prev.getMilliseconds());
      }
      return newDate;
    });
  };

  const handleDateCancel = () => {
    setSelectedDateTime(null);
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (dates: Date[]) => {
    if (dates.length > 0) {
      setSelectedDateTime((prev) => {
        const newDate = dates[0];
        if (prev) {
          newDate.setHours(prev.getHours());
          newDate.setMinutes(prev.getMinutes());
          newDate.setSeconds(prev.getSeconds());
          newDate.setMilliseconds(prev.getMilliseconds());
        }
        return newDate;
      });
      setDatePickerVisible(false);
    } else {
      alert('날짜를 선택해 주세요.');
    }
  };

  const handleTimeChange = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    console.log('Selected time:', time, 'Hours:', hours, 'Minutes:', minutes);

    setSelectedDateTime((prev) => {
      if (prev) {
        const updated = new Date(prev);
        updated.setHours(hours);
        updated.setMinutes(minutes);
        return updated;
      } else {
        const temp = new Date();
        temp.setDate(temp.getDate() + 1);
        temp.setHours(hours);
        temp.setMinutes(minutes);
        return temp;
      }
    });
  };

  return (
    <div className="mt-8pxr gap-x-8pxr flex w-full flex-row">
      <div className="relative">
        <button
          onClick={() => setDatePickerVisible((prev) => !prev)}
          className="px-12pxr py-6pxr rounded-4pxr w-261pxr border-stroke-200 flex items-center justify-between border bg-white text-left"
        >
          <p className={clsx('text-b3-rg', selectedDateTime ? 'text-black' : 'text-gray-400')}>
            {extractDate(selectedDateTime) || '마감일을 선택해 주세요.'}
          </p>
          <IndividualIcons state={IndividualIconsState.CALENDAR} />
        </button>
        {datePickerVisible && (
          <div className="left-0pxr top-0pxr absolute z-10">
            <DatePicker
              onChange={handleDateChange}
              onCancel={handleDateCancel}
              onConfirm={handleDateConfirm}
            />
          </div>
        )}
      </div>
      <div className="relative">
        <button
          onClick={() => setTimePickerVisible((prev) => !prev)}
          className="px-12pxr py-6pxr rounded-4pxr w-261pxr border-stroke-200 flex items-center justify-between border bg-white text-left"
        >
          <p className={clsx('text-b3-rg', selectedDateTime ? 'text-black' : 'text-gray-400')}>
            {extractTime(selectedDateTime) || '마감 시간을 선택해 주세요.'}
          </p>
          <ArrowIcons state={ArrowIconsState.DOWN} />
        </button>
        {timePickerVisible && (
          <div className="left-0pxr top-0pxr absolute z-10">
            <TimePicker onTimeSelect={handleTimeChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateTimePicker;
