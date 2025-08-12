'use client';

import Calendar from '@common/components/etc/calendar/Calendar/Calendar.client';
import CalendarBody from '@common/components/etc/calendar/calendar-full/CalendarBody/CalendarBody.server';
import CalendarTop from '@common/components/etc/calendar/calendar-full/CalendarTop/CalendarTop.client';

import { CalendarFullProps } from './CalendarFull.types';

const CalendarFull = ({
  title,
  startDate,
  endDate,
  operatingMonth,
  documents,
  onPrevClick,
  onTodayClick,
  onNextClick,
  onFileClick,
}: CalendarFullProps) => {
  return (
    <>
      <CalendarTop
        title={title}
        onPrevClick={onPrevClick}
        onTodayClick={onTodayClick}
        onNextClick={onNextClick}
      />
      <div className="flex flex-col items-center">
        <CalendarBody />
        <Calendar
          startDate={startDate}
          endDate={endDate}
          documents={documents}
          operatingMonth={operatingMonth}
          onFileClick={onFileClick}
        />
      </div>
    </>
  );
};
export default CalendarFull;
