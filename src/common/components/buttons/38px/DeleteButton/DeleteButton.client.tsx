'use client';

import clsx from 'clsx';

import { DeleteButtonProps } from './DeleteButton.types';

/**
 * '삭제하기' 버튼
 */
const DeleteButton = ({ onClick, disabled, loading, loadingText, ...props }: DeleteButtonProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb border-stroke-200 text-system-red h-38pxr w-128pxr rounded-7pxr px-16pxr py-12pxr inline-flex items-center justify-center border bg-white hover:bg-gray-600',
        (disabled || loading) && 'text-black',
      )}
      onClick={onClick}
      {...props}
    >
      {loading ? loadingText : '삭제하기'}
    </button>
  );
};

export default DeleteButton;
