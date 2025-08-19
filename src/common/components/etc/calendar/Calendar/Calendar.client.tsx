'use client';

import CalenderSlice from '../CalendarSlice/CalendarSlice.client';
import { CalendarProps } from './Calendar.types';

/*
 * 캘린더 컴포넌트
 */
const Calendar = ({
  startDate,
  endDate,
  documents,
  operatingMonth,
}: CalendarProps) => {
  const today = new Date();
  const startDateValue = typeof startDate === 'number' ? new Date(startDate) : startDate;
  const endDateValue = typeof endDate === 'number' ? new Date(endDate) : endDate;
  const days = Math.floor(
    (endDateValue.getTime() - startDateValue.getTime()) / (1000 * 60 * 60 * 24),
  );
  const dateList = Array.from({ length: days + 1 }, (_, i) => {
    const date = new Date(startDateValue);
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className="w-1030pxr grid grid-cols-7">
      {dateList.map((date, idx) => (
        <CalenderSlice
          key={idx}
          date={date}
          files={documents.filter((doc) => {
            const docDate = new Date(doc.createdAt);
            return (
              docDate.getFullYear() === date.getFullYear() &&
              docDate.getMonth() === date.getMonth() &&
              docDate.getDate() === date.getDate()
            );
          })}
          isVisible={date.getMonth() === operatingMonth - 1}
          isToday={date.toISOString().split('T')[0] === today.toISOString().split('T')[0]}
          isSecondRowOrBelow={Math.floor(idx / 7) > 0}
          isNotLastColumn={idx % 7 !== 6}
        />
      ))}
    </div>
  );
};

export default Calendar;
