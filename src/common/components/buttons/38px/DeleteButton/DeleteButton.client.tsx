'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '삭제하기' 버튼
 */
const DeleteButton = ({ onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb border-stroke-200 text-system-red inline-flex h-[38px] w-[128px] items-center justify-center rounded-[7px] border bg-white px-[16px] py-[12px] hover:bg-gray-600',
      )}
      onClick={onClick}
      {...props}
    >
      삭제하기
    </button>
  );
};

export default DeleteButton;
