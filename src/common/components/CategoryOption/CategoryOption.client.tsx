'use client';

import clsx from 'clsx';

import { CategoryOptionProps } from './CategoryOption.types';

const CategoryOption = ({
  label,
  count,
  active,
  onClick,
  className = '',
  ariaLabel,
}: CategoryOptionProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'text-bt3-sb h-30pxr rounded-7pxr px-9pxr flex items-center justify-center gap-2.5 py-1.5',
        active
          ? 'text-bt3-sb cursor-default bg-gray-600 text-black'
          : 'text-cap1-md cursor-pointer bg-white text-gray-200 hover:bg-gray-600',
        className,
      )}
      aria-label={ariaLabel ?? `${label} 카테고리`}
    >
      <span>{label}</span>
      {typeof count === 'number' && <span className="text-cap1-rg text-gray-400">{count}</span>}
    </button>
  );
};

export default CategoryOption;
