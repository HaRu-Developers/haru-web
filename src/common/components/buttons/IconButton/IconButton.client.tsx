'use client';

import clsx from 'clsx';

import { IconButtonProps } from './IconButton.types';

const IconButton = ({ onClick, children, className = '', ariaLabel }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'h-30pxr w-30pxr rounded-5pxr flex items-center justify-center gap-2.5 p-1.5 hover:bg-gray-600',
        className,
      )}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default IconButton;
