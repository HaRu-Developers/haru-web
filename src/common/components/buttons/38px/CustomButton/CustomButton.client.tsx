'use client';

import clsx from 'clsx';

import { CustomButtonProps } from './CustomButton.types';

/**
 * 커스텀 할 수 있는 38px 버튼
 */
const CustomButton = ({ onClick, className, children, ...props }: CustomButtonProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb h-38pxr w-128pxr rounded-7pxr px-16pxr py-12pxr inline-flex items-center justify-center border bg-gray-100 text-white',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
