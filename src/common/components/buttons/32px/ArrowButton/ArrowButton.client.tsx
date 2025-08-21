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
        'border-stroke-100 h-32pxr w-32pxr rounded-6pxr px-6pxr py-8pxr inline-flex items-center justify-center border bg-white hover:bg-gray-600',
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
