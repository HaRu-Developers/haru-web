'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '워크스페이스 생성하기' 버튼
 */
const CreateWorkspaceButton = ({ disabled, onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb inline-flex h-[48px] w-[260px] items-center justify-center rounded-[9px] px-[152px] py-[17px] whitespace-nowrap text-white',
        !disabled ? 'bg-gray-100' : 'bg-gray-500',
      )}
      onClick={onClick}
      {...props}
    >
      워크스페이스 생성하기
    </button>
  );
};

export default CreateWorkspaceButton;
