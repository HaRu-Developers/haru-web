import clsx from 'clsx';

import { ProfileSelectModalMenuState } from '../ProfileSelectModal.types';
import { ProfileSelectModalMenuButtonProps } from './ProfileSelectModalMenuButton.types';

export const ProfileSelectModalMenuButton = ({
  menuName,
  className,
  isSelected,
  onClick,
  ...props
}: ProfileSelectModalMenuButtonProps) => {
  return (
    <button
      className={clsx(
        'w-172pxr h-34pxr px-12pxr rounded-10pxr flex items-center justify-center hover:bg-gray-600',
        isSelected && 'bg-gray-600',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <p
        className={clsx('w-full text-start', {
          'text-t6-sb text-black': isSelected,
          'text-b3-rg text-gray-300': !isSelected,
          'text-system-red': menuName === ProfileSelectModalMenuState.LOGOUT,
        })}
      >
        {menuName}
      </p>
    </button>
  );
};
