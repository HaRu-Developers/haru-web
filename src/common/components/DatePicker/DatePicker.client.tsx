'use client';

import { useEffect, useState } from 'react';

import DatePickerBody from './Body/DatePickerBody.client';
import type { DatePickerProps } from './DatePicker.types';
import DatePickerFooter from './DatePickerFooter/DatePickerFooter.client';
import DatePickerHeader from './DatePickerHeader/DatePickerHeader.client';

/**
 * DatePicker.tsx
 *
 * 날짜 선택기 컴포넌트
 * 사용자가 날짜를 선택할 수 있는 UI를 제공합니다.
 * 선택된 날짜는 외부에서 관리할 수 있으며, 확인/취소 버튼을 통해 선택을 완료하거나 취소할 수 있습니다.
 */
const DatePicker = ({ onChange, onConfirm, onCancel }: DatePickerProps) => {
  const [selected, setSelected] = useState<Date[]>([]);
  const [activeStartDate, setActiveStartDate] = useState<Date>(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  // 외부에서 props로 selectedDates를 전달했을 때, 업데이트 하기 위한 로직입니다.
  // selectedDates를 삭제 처리하였습니다. (부모에서 전달할 수 없습니다.)

  const toggleDate = (date: Date) => {
    const exists = selected.some((d) => d.getTime() === date.getTime());

    // 중복 선택 방지 로직:
    // 클릭된 날짜가 이미 선택된 날짜이면 선택 해제 (빈 배열)
    // 클릭된 날짜가 선택되지 않았으면 해당 날짜 하나만 선택 (해당 날짜를 가진 배열)
    const updated = exists ? [] : [date];

    setSelected(updated);
    onChange?.(updated);
  };

  // 이전/다음 달 이동
  const prev = () => {
    setActiveStartDate(new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() - 1, 1));
  };
  const next = () => {
    setActiveStartDate(new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 1));
  };

  const handleConfirm = () => {
    onConfirm?.(selected);
  };
  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <div className="shadow-dropdown-popup inline-block w-71 overflow-hidden rounded-2xl bg-white px-4 pt-4">
      <DatePickerHeader current={activeStartDate} onPrev={prev} onNext={next} />
      <DatePickerBody
        activeStartDate={activeStartDate}
        selectedDates={selected ?? []}
        onChange={toggleDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          activeStartDate && setActiveStartDate(activeStartDate)
        }
      />
      <DatePickerFooter onConfirm={handleConfirm} onCancel={handleCancel} />
    </div>
  );
};

export default DatePicker;
