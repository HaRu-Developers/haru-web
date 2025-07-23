'use client';

import clsx from 'clsx';

import {
  CreateWorkspaceButtonProps,
  CreateWorkspaceButtonState,
} from './CreateWorkspaceButton.types';

/**
 * '워크스페이스 생성하기' 버튼
 */
const CreateWorkspaceButton = ({
  className,
  disabled,
  onClick,
  state,
  ...props
}: CreateWorkspaceButtonProps) => {
  switch (state) {
    case CreateWorkspaceButtonState.WIDTH_260PXR:
      return (
        <button
          className={clsx(
            'text-bt1-sb h-48pxr w-260pxr rounded-9pxr inline-flex items-center justify-center whitespace-nowrap text-white',
            !disabled ? 'bg-gray-100' : 'bg-gray-500',
            className,
          )}
          onClick={onClick}
          {...props}
        >
          워크스페이스 생성하기
        </button>
      );
    case CreateWorkspaceButtonState.WIDTH_214PXR:
      return (
        <button
          className={clsx(
            'text-bt1-sb h-48pxr w-214pxr rounded-9pxr inline-flex items-center justify-center whitespace-nowrap text-white',
            !disabled ? 'bg-gray-100' : 'bg-gray-500',
            className,
          )}
          onClick={onClick}
          {...props}
        >
          워크스페이스 생성하기
        </button>
      );
    default:
      return <div>INVALID STATE</div>;
  }
};

export default CreateWorkspaceButton;
