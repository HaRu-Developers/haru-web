'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '저장하기' 버튼
 */
const SaveButton = ({ onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb border-stroke-200 inline-flex h-[38px] w-[128px] items-center justify-center rounded-[7px] border bg-white px-[16px] py-[12px] text-gray-100 hover:bg-gray-600',
      )}
      onClick={onClick}
      {...props}
    >
      저장하기
    </button>
  );
};

export default SaveButton;
