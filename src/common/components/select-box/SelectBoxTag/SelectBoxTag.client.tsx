'use client';

import clsx from 'clsx';

import { SelectBoxTagProps } from './SelectBoxTag.types';

const SelectBoxTag = ({ onClick, isSelected = false, onToggle, label }: SelectBoxTagProps) => {
  const handleClick = () => {
    if (onToggle) {
      onToggle(!isSelected);
    }
    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      className={clsx(
        'text-cap1-md h-30pxr rounded-7pxr px-9pxr flex items-center justify-center gap-2.5 py-1.5',
        {
          'border-primary bg-primary-selected border text-black': isSelected === true,
          'bg-gray-600 text-gray-200': isSelected === false,
        },
      )}
      onClick={handleClick}
      aria-pressed={isSelected}
    >
      {label}
    </button>
  );
};

export default SelectBoxTag;
