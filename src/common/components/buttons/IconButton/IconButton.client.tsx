'use client';

import clsx from 'clsx';

import { IconButtonProps } from './IconButton.types';

const IconButton = ({
  onClick,
  children,
  className = '',
  ariaLabel,
  isLoading = false,
  disabled = false,
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'h-30pxr w-30pxr rounded-5pxr',
        isLoading
          ? 'animate-bg-pulse'
          : 'justify-centergap-2.5 flex items-center p-1.5 hover:bg-gray-600',
        disabled ? 'disabled-style' : '',
        className,
      )}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default IconButton;
