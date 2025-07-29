'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '워크스페이스 생성하기 38px' 버튼
 */
const CreateWorkSpaceButton = ({ onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb h-38pxr w-171pxr rounded-7pxr inline-flex items-center justify-center bg-gray-100 text-white',
      )}
      {...props}
      onClick={onClick}
    >
      워크스페이스 생성하기
    </button>
  );
};

export default CreateWorkSpaceButton;
