'use client';

import { notFound } from 'next/navigation';

import useFetchCalendar from '@/api/workspace/get/queries/useFetchCalendar';

import CalendarFull from '../calendar-full/CalendarFull/CalendarFull.client';
import { useCalendarStore } from '../stores/calendar-store';
import { getCalendarDates } from '../utils/calendar-date.utils';
import { CalendarSectionProps } from './CalendarSection.types';

const CalendarSection = ({ workspaceId, onFileClick }: CalendarSectionProps) => {
  if (!workspaceId || Number.isNaN(workspaceId)) {
    notFound();
  }
  const { currentDate, setCurrentDate } = useCalendarStore();
  const current = new Date(currentDate.setDate(1));
  const cal = getCalendarDates(current);

  const handlePrevClick = () => {
    const prev = new Date(current);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentDate(prev);
  };

  const handleTodayClick = () => {
    const today = new Date(new Date().setDate(1));
    setCurrentDate(today);
  };

  const handleNextClick = () => {
    const next = new Date(current);
    next.setMonth(next.getMonth() + 1);
    setCurrentDate(next);
  };

  const { extra: documents } = useFetchCalendar(workspaceId, cal.startDate, cal.endDate);

  // useFetchCalendar에서 로딩 하면 이상해서 일단 제외함
  // if (isFetching) {
  //   return <div className="flex h-full items-center justify-center">Loading...</div>;
  // }

  return (
    <CalendarFull
      documents={documents ?? []}
      title={cal.title}
      startDate={cal.startDate}
      endDate={cal.endDate}
      operatingMonth={cal.operatingMonth}
      onPrevClick={handlePrevClick}
      onTodayClick={handleTodayClick}
      onNextClick={handleNextClick}
      onFileClick={onFileClick}
    />
  );
};

export default CalendarSection;
