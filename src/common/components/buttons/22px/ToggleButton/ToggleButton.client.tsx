'use client';

import clsx from 'clsx';

import { ToggleButtonProps } from './ToggleButton.types';

/**
 * ToggleButton 컴포넌트는 on/off 상태를 전환할 수 있는 버튼입니다.
 * - `onLabel`: 버튼이 켜졌을 때 표시되는 스크린리더용 텍스트 (기본값: 'On')
 * - `offLabel`: 버튼이 꺼졌을 때 표시되는 스크린리더용 텍스트 (기본값: 'Off')
 * - `initialState`: 버튼 초기 상태 (기본값: false)
 * - `onToggle`: 상태가 변경될 때 호출되는 콜백 함수
 */
const ToggleButton = ({
  onLabel = 'On',
  offLabel = 'Off',
  state,
  onToggle,
  className,
}: ToggleButtonProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(
        'h-22pxr w-44pxr flex cursor-pointer items-center rounded-full transition-colors duration-200',
        state ? 'bg-primary' : 'bg-gray-600',
        className, // 추가적인 스타일링을 위한 className
      )}
      aria-pressed={state}
    >
      <span
        className={clsx(
          'shadow-toggle-switch border-stroke-200 h-18pxr w-18pxr rounded-100pxr inline-block transform border-[0.5px] bg-white transition-transform duration-200',
          state ? 'translate-x-24pxr' : 'translate-x-2pxr',
        )}
      />
      <span className="sr-only">{state ? onLabel : offLabel}</span>
    </button>
  );
};

export default ToggleButton;
