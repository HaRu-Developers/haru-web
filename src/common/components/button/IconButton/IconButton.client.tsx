'use client';

import { IconButtonProps } from './IconButton.types';

const IconButton = ({ onClick, children, className = '', ariaLabel }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex h-[30px] w-[30px] items-center justify-center gap-2.5 rounded-[5px] p-1.5 hover:bg-gray-600 ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default IconButton;
