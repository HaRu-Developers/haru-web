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

const DatePicker = ({ selectedDates = [], onChange, onConfirm, onCancel }: DatePickerProps) => {
  const [selected, setSelected] = useState<Date[]>(selectedDates);
  const [activeStartDate, setActiveStartDate] = useState<Date>(
    new Date(
      selectedDates[0]?.getFullYear() ?? new Date().getFullYear(),
      selectedDates[0]?.getMonth() ?? new Date().getMonth(),
      1,
    ),
  );

  // 외부 selectedDates prop 동기화
  useEffect(() => {
    // 단일 선택 모드이므로, 외부에서 여러 날짜가 들어와도 첫 번째 날짜만 반영
    // 깊은 비교를 통해 실제로 값이 변경되었을 때만 상태 업데이트
    const newSelected = selectedDates.slice(0, 1);
    if (
      selected.length !== newSelected.length ||
      selected.some(
        (date, index) =>
          !newSelected[index] ||
          date.getFullYear() !== newSelected[index].getFullYear() ||
          date.getMonth() !== newSelected[index].getMonth() ||
          date.getDate() !== newSelected[index].getDate(),
      )
    ) {
      setSelected(newSelected);
    }
  }, [selected, selectedDates]);

  const toggleDate = (date: Date) => {
    const exists = selected.some(
      (d) =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate(),
    );

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
        selectedDates={selected}
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
