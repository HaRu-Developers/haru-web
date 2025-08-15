'use client';

import { useState } from 'react';

import clsx from 'clsx';

import ArrowIcons from '@icons/ArrowIcons/ArrowIcons';
import { ArrowIconsState } from '@icons/ArrowIcons/ArrowIcons.types';
import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import DatePicker from '@common/components/DatePicker/DatePicker.client';
import { TimePicker } from '@common/components/TimePicker/TimePicker.client';

import CommonText from '../CommonText/CommonText.client';
import { CommonTextType } from '../CommonText/CommonText.types';
import { DateTimePickerProps } from './DateTimePicker.types';
import { extractDate, extractTime } from './datetime-picker-util';

/**
 * DatePicker와 TimePicker를 포함해둔 컴포넌트입니다.
 */
const DateTimePicker = ({
  selectedDateTime,
  setSelectedDateTime,
  datePickerTitle,
  timePickerTitle,
  className,
}: DateTimePickerProps) => {
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [timePickerVisible, setTimePickerVisible] = useState<boolean>(false);

  /**
   * 날짜 선택 핸들러
   * 선택된 날짜를 props로 주어진 상태에 저장해둔다.
   */
  const handleDateChange = (dates: Date[]) => {
    const newDate = dates[0];
    if (!newDate) return;

    setSelectedDateTime((prev) => {
      if (prev) {
        newDate.setHours(
          prev.getHours(),
          prev.getMinutes(),
          prev.getSeconds(),
          prev.getMilliseconds(),
        );
      }
      return newDate;
    });
  };

  /**
   * 날짜 선택 취소 핸들러
   * 선택된 날짜를 초기화하고, 날짜 선택기를 닫는다.
   */
  const handleDateCancel = () => {
    setSelectedDateTime(null);
    setDatePickerVisible(false);
  };

  /**
   * 날짜 선택 완료 핸들러
   * 선택된 날짜를 props로 주어진 상태에 저장하고, 날짜 선택기를 닫는다.
   */
  const handleDateConfirm = (dates: Date[]) => {
    // 날짜가 없으면 null 처리 + 닫기
    if (dates.length === 0) {
      setSelectedDateTime(null);
      setDatePickerVisible(false);
      return;
    }

    const newDate = dates[0];

    setSelectedDateTime((prev) => {
      if (prev) {
        newDate.setHours(prev.getHours());
        newDate.setMinutes(prev.getMinutes());
        newDate.setSeconds(prev.getSeconds());
        newDate.setMilliseconds(prev.getMilliseconds());
      }
      return newDate;
    });

    setDatePickerVisible(false);
  };

  /**
   * 시간 선택 핸들러
   * 선택된 시간을 props로 주어진 상태에 저장한다.
   */
  const handleTimeChange = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    // console.log('Selected time:', time, 'Hours:', hours, 'Minutes:', minutes);

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
    setTimePickerVisible(false);
  };

  return (
    <div className={clsx('mt-8pxr gap-x-8pxr flex w-full flex-row', className)}>
      {/* DatePicker 부분 */}
      <div className="flex flex-col items-start">
        {datePickerTitle && (
          <CommonText
            type={CommonTextType.CAP1_RG_GRAY_300}
            className="mb-8pxr text-gray-200"
            text={datePickerTitle}
          />
        )}
        <div className="relative">
          <button
            onClick={() => {
              setDatePickerVisible((prev) => !prev);
              setTimePickerVisible(false);
            }}
            className="px-12pxr py-6pxr rounded-4pxr w-261pxr border-stroke-200 flex items-center justify-between border bg-white text-left"
          >
            <p className={clsx('text-b3-rg', selectedDateTime ? 'text-black' : 'text-gray-400')}>
              {extractDate(selectedDateTime) || '마감일을 선택해 주세요.'}
            </p>
            <IndividualIcons state={IndividualIconsState.CALENDAR_SIZE_18} />
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
      </div>

      {/* TimePicker 부분 */}
      <div className="flex flex-col items-start">
        {timePickerTitle && (
          <CommonText
            type={CommonTextType.CAP1_RG_GRAY_300}
            className="mb-8pxr text-gray-200"
            text={timePickerTitle}
          />
        )}

        <div className="relative">
          <button
            onClick={() => {
              setTimePickerVisible((prev) => !prev);
              setDatePickerVisible(false);
            }}
            className="px-12pxr py-6pxr rounded-4pxr w-261pxr border-stroke-200 flex items-center justify-between border bg-white text-left"
          >
            <p className={clsx('text-b3-rg', selectedDateTime ? 'text-black' : 'text-gray-400')}>
              {extractTime(selectedDateTime) || '마감 시간을 선택해 주세요.'}
            </p>
            <ArrowIcons state={ArrowIconsState.DOWN} />
          </button>
          {timePickerVisible && (
            <div className="left-0pxr top-35pxr absolute z-10">
              <TimePicker onTimeSelect={handleTimeChange} selectedDateTime={selectedDateTime} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
