'use client';

import Calendar from '@common/components/etc/calendar/Calendar/Calendar.client';
import CalendarBody from '@common/components/etc/calendar/calendar-full/CalendarBody/CalendarBody.server';
import CalendarTop from '@common/components/etc/calendar/calendar-full/CalendarTop/CalendarTop.client';

import { getCalendarDates } from '../../utils/calendar-date.utils';
import { CalendarFullProps } from './CalenderFull.types';

const CalendarFull = ({ currentDate, documents, onCalChange, onFileClick }: CalendarFullProps) => {
  const current = new Date(currentDate.setDate(1));
  const cal = getCalendarDates(current);
  const handlePrevClick = () => {
    const prev = new Date(current);
    prev.setMonth(prev.getMonth() - 1);
    const prevCal = getCalendarDates(prev);
    onCalChange?.(prevCal.startDate, prevCal.endDate, prev);
  };
  const handleTodayClick = () => {
    const today = new Date(new Date().setDate(1));
    const todayCal = getCalendarDates(today);
    onCalChange?.(todayCal.startDate, todayCal.endDate, today);
  };
  const handleNextClick = () => {
    const next = new Date(current);
    next.setMonth(next.getMonth() + 1);
    const nextCal = getCalendarDates(next);
    onCalChange?.(nextCal.startDate, nextCal.endDate, next);
  };
  return (
    <>
      <CalendarTop
        title={cal.title}
        onPrevClick={handlePrevClick}
        onTodayClick={handleTodayClick}
        onNextClick={handleNextClick}
      />
      <div className="flex flex-col items-center">
        <CalendarBody />
        <Calendar
          startDate={cal.startDate}
          endDate={cal.endDate}
          documents={documents}
          operatingMonth={cal.operatingMonth}
          onFileClick={onFileClick}
        />
      </div>
    </>
  );
};
export default CalendarFull;
