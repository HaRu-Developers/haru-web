'use client';

import clsx from 'clsx';

import { InviteButtonProps } from './InviteButton.types';

/**
 * '초대' 버튼.
 */
const InviteButton = ({ className, onClick, disabled, isPending, ...props }: InviteButtonProps) => {
  return (
    <button
      className={clsx(
        'text-bt2-sb bg-primary h-32pxr w-46pxr rounded-6pxr px-11pxr py-8pxr inline-flex items-center justify-center whitespace-nowrap text-white',
        {
          'bg-primary-inactive cursor-not-allowed': disabled || isPending,
        },
        className,
      )}
      onClick={onClick}
      disabled={disabled || isPending}
      {...props}
    >
      초대
    </button>
  );
};

export default InviteButton;
