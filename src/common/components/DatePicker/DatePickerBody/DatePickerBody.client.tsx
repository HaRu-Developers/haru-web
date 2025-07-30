'use client';

import Calendar from 'react-calendar';

import '@styles/calendar-custom.css';

import DateNum from '../DateNum/DateNum.client';
import type { CalendarTileProps, DatePickerBodyProps } from './DatePickerBody.types';

/**
 * DatePickerBody.tsx
 *
 * 날짜 선택기 본문 컴포넌트
 * react-calendar를 사용하여 날짜를 선택할 수 있는 UI를 제공합니다.
 * 현재 달력의 시작 날짜, 선택된 날짜 목록, 날짜 변경 핸들러 등을 props로 받습니다.
 */

const DatePickerBody = ({
  activeStartDate = new Date(),
  selectedDates,
  onChange,
  onActiveStartDateChange,
}: DatePickerBodyProps) => (
  <Calendar
    className="minimal-calendar pt-2 pb-1"
    calendarType="gregory"
    tileDisabled={({ date }) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const target = new Date(date);
      target.setHours(0, 0, 0, 0);
      return target < today;
    }}
    showNavigation={false}
    activeStartDate={activeStartDate}
    onActiveStartDateChange={onActiveStartDateChange}
    onClickDay={onChange}
    formatShortWeekday={(locale, date) => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()]}
    formatDay={() => ''}
    tileContent={({ date, view }: CalendarTileProps) =>
      view === 'month' && (
        <DateNum
          date={date}
          currentMonth={activeStartDate.getMonth()}
          selectedList={selectedDates}
          onSelect={onChange}
        />
      )
    }
  />
);

export default DatePickerBody;
