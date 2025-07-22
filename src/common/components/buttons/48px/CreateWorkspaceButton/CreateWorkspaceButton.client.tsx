'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '워크스페이스 생성하기' 버튼
 */
const CreateWorkspaceButton = ({ className, disabled, onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb h-48pxr w-260pxr rounded-9pxr px-152pxr py-17pxr inline-flex items-center justify-center whitespace-nowrap text-white',
        !disabled ? 'bg-gray-100' : 'bg-gray-500',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      워크스페이스 생성하기
    </button>
  );
};

export default CreateWorkspaceButton;
