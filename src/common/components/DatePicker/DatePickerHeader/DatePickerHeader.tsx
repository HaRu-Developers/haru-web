'use client';

import ArrowButton from '@common/components/buttons/32px/ArrowButton';

import type { DatePickerHeaderProps } from './DatePickerHeader.types';

/**
 * DatePickerHeader.tsx
 *
 * 날짜 선택기 헤더 컴포넌트
 * 현재 달을 표시하고 이전/다음 달로 이동하는 버튼을 포함합니다.
 */

{
  /* svg 파일 업데이트 이후 lucide-react 대체 예정 */
}

const DatePickerHeader = ({ current, onPrev, onNext }: DatePickerHeaderProps) => (
  <div className="flex items-center justify-between rounded-t-2xl bg-white">
    <button
      onClick={onPrev}
      aria-label="이전 달"
      className="border-stroke-200 flex h-9 w-9 items-center justify-center rounded-[6px] border bg-white hover:bg-gray-600"
    >
      <ArrowButton direction="LEFT" />
    </button>

    {/* 디자인 시스템 업데이트 이후 변경 예정 */}
    <div className="text-body-1 font-bold text-black">
      {current.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
    </div>

    <button
      onClick={onNext}
      aria-label="다음 달"
      className="border-stroke-200 flex h-9 w-9 items-center justify-center rounded-[6px] border bg-white hover:bg-gray-600"
    >
      <ArrowButton direction="RIGHT" />
    </button>
  </div>
);

export default DatePickerHeader;
