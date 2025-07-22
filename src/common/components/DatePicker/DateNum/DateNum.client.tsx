'use client';

import clsx from 'clsx';

import type { DateNumProps } from './DateNum.types';
import { baseStyle, dateNumVariants } from './date-num-styles';

/**
 * DateNum.tsx
 *
 * 날짜 선택기에서 각 날짜를 표시하는 컴포넌트입니다.
 * 날짜가 현재 달에 속하는지, 오늘인지, 선택되었는지 등을 판단하여 스타일을 적용합니다.
 */

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const DateNum = ({ date, currentMonth, selectedList, onSelect }: DateNumProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  const isEmpty = date.getMonth() !== currentMonth;
  const isToday = isSameDay(d, today);
  const isSelected = selectedList.some((sel) => isSameDay(sel, d));
  const isPastDate = d.getTime() < today.getTime();
  const isAvailable = !isEmpty && !isPastDate;

  const cls = clsx(baseStyle, {
    [dateNumVariants.empty]: isEmpty,
    [dateNumVariants.selected]: isSelected && !isEmpty,
    [dateNumVariants.today]: isToday && !isSelected && !isEmpty,
    [dateNumVariants.past]: isPastDate && !isSelected && !isToday && !isEmpty,
    [dateNumVariants.available]: isAvailable && !isSelected && !isToday && !isPastDate,
  });

  return (
    <div
      className={cls}
      onClick={() => {
        if (isAvailable) onSelect(date);
      }}
      role="button"
      aria-disabled={isEmpty || isPastDate}
      aria-label={`${date.getDate()}일`}
    >
      {!isEmpty ? date.getDate() : ''}
    </div>
  );
};

export default DateNum;
