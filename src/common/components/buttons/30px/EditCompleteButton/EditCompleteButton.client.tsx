'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '수정 완료' 버튼
 */
const EditCompleteButton = ({ onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt3-sb inline-flex h-[30px] w-[76px] items-center justify-center rounded-[100px] bg-gray-100 px-[12px] py-[6px] text-white',
      )}
      onClick={onClick}
      {...props}
    >
      수정 완료
    </button>
  );
};

export default EditCompleteButton;
