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
        'text-bt1-sb border-stroke-200 text-system-red inline-flex h-[38px] w-[128px] items-center justify-center rounded-[7px] border bg-white px-[16px] py-[12px] hover:bg-gray-600',
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
