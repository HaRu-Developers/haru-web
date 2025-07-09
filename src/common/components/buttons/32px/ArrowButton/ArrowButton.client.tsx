'use client';

import clsx from 'clsx';

import ArrowIcons from '@icons/ArrowIcons/ArrowIcons';
import { ArrowIconsState } from '@icons/ArrowIcons/ArrowIcons.types';

import { ArrowButtonDirection, ArrowButtonProps } from './ArrowButton.types';

/**
 * '화살표' 버튼
 */
const ArrowButton = ({ direction, onClick, ...props }: ArrowButtonProps) => {
  return (
    <button
      className={clsx(
        'border-stroke-100 inline-flex h-[32px] w-[32px] items-center justify-center rounded-[6px] border bg-white px-[6px] py-[8px] hover:bg-gray-600',
      )}
      onClick={onClick}
      {...props}
    >
      {direction == ArrowButtonDirection.LEFT ? (
        <ArrowIcons state={ArrowIconsState.LEFT} />
      ) : (
        <ArrowIcons state={ArrowIconsState.RIGHT} />
      )}
    </button>
  );
};

export default ArrowButton;
