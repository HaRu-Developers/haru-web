'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '워크스페이스 추가하기' 버튼
 */
const AddWorkspaceButton = ({ onClick, disabled, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt2-sb border-stroke-200 inline-flex h-[30px] w-[146px] items-center justify-center rounded-[6px] border px-[12px] py-[5px] whitespace-nowrap text-gray-100',
        disabled ? 'bg-gray-600' : 'bg-white',
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      워크스페이스 추가하기
    </button>
  );
};

export default AddWorkspaceButton;
