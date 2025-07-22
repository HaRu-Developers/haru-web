'use client';

import ArrowButton from '@buttons/32px/ArrowButton/ArrowButton.client';
import { ArrowButtonDirection } from '@buttons/32px/ArrowButton/ArrowButton.types';

import type { DatePickerHeaderProps } from './DatePickerHeader.types';

/**
 * DatePickerHeader.tsx
 *
 * 날짜 선택기 헤더 컴포넌트
 * 현재 달을 표시하고 이전/다음 달로 이동하는 버튼을 포함합니다.
 */

const DatePickerHeader = ({ current, onPrev, onNext }: DatePickerHeaderProps) => (
  <div className="flex items-center justify-between rounded-t-2xl bg-white">
    <ArrowButton direction={ArrowButtonDirection.LEFT} onClick={onPrev} aria-label="이전 달" />

    <div className="text-bt1-sb text-black">
      {current.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
    </div>

    <ArrowButton direction={ArrowButtonDirection.RIGHT} onClick={onNext} aria-label="다음 달" />
  </div>
);

export default DatePickerHeader;
