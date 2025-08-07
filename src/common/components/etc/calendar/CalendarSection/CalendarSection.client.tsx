import useFetchCalendar from '@/api/workspace/get/queries/useFetchCalendar';

import CalendarFull from '../calendar-full/CalendarFull/CalendarFull.client';
import { getCalendarDates } from '../utils/calendar-date.utils';
import { CalendarSectionProps } from './CalendarSection.types';

const CalendarSection = ({
  workspaceId,
  currentDate,
  onCalChange,
  onFileClick,
}: CalendarSectionProps) => {
  const current = new Date(currentDate.setDate(1));
  const cal = getCalendarDates(current);
  const handlePrevClick = () => {
    const prev = new Date(current);
    prev.setMonth(prev.getMonth() - 1);
    onCalChange?.(prev);
  };
  const handleTodayClick = () => {
    const today = new Date(new Date().setDate(1));
    onCalChange?.(today);
  };
  const handleNextClick = () => {
    const next = new Date(current);
    next.setMonth(next.getMonth() + 1);
    onCalChange?.(next);
  };

  const { isFetching, extra: documents } = useFetchCalendar(
    workspaceId,
    cal.startDate,
    cal.endDate,
  );

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
