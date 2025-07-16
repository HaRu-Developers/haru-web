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

  // 외부에서 props로 selectedDates를 전달했을 때, 업데이트 하기 위한 로직입니다.
  useEffect(() => {
    // 단일 선택 모드이므로, 외부에서 여러 날짜가 들어와도 첫 번째 날짜만 반영
    const propGivenSelectedDate = selectedDates.slice(0, 1);

    // 조건문들
    const isUserSelectOrPropGivenSelectExists =
      (selected && selected.length > 0) ||
      (propGivenSelectedDate && propGivenSelectedDate.length > 0);
    const isNewSelectedModified =
      selected.length !== propGivenSelectedDate.length ||
      selected.some(
        (date, index) =>
          !propGivenSelectedDate[index] ||
          date.getTime() !== propGivenSelectedDate[index].getTime(),
      );

    console.log(
      'useEffect - 종속성 배열 변경 감지',
      '\nProp 전달 됬어요? :',
      isUserSelectOrPropGivenSelectExists,
      '\n사용자가 변경 했어요? :',
      isNewSelectedModified,
      '\n그래서 렌더링 되요? :',
      isUserSelectOrPropGivenSelectExists && isNewSelectedModified,
      '\nselected:',
      selected,
      '\npropGivenSelectedDate:',
      propGivenSelectedDate,
      '\nselectedDates:',
      selectedDates,
    );
    // 외부에서 props로 selectedDates를 전달했을 때, 업데이트 하기 위한 로직입니다.
    if (isUserSelectOrPropGivenSelectExists && isNewSelectedModified) {
      setSelected(propGivenSelectedDate);
    }
  }, []); // 기존에 있던 selected는 제거 - 필요없음.

  const toggleDate = (date: Date) => {
    const exists = selected.some((d) => d.getTime() === date.getTime());

    // 중복 선택 방지 로직:
    // 클릭된 날짜가 이미 선택된 날짜이면 선택 해제 (빈 배열)
    // 클릭된 날짜가 선택되지 않았으면 해당 날짜 하나만 선택 (해당 날짜를 가진 배열)
    const updated = exists ? [] : [date];

    console.log('toggleDate', date, 'exists:', exists, 'updated:', updated);

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
